# Documentation Backend - Viral

## 🗄️ Base de données PocketBase

### Collections à créer

#### 1. `users` (extension de la collection auth)
```json
{
  "name": "string",
  "avatar": "file",
  "plan": "string (free|pro|business)",
  "credits_used": "number",
  "credits_total": "number",
  "credits_reset_date": "date",
  "language": "string (fr|en|es)",
  "two_factor_enabled": "boolean",
  "github_connected": "boolean",
  "google_connected": "boolean"
}
```

#### 2. `projects`
```json
{
  "name": "string",
  "description": "text",
  "owner": "relation (users)",
  "html_content": "text",
  "css_content": "text",
  "thumbnail": "file",
  "is_public": "boolean",
  "published_url": "string",
  "github_repo": "string",
  "template_id": "string",
  "created": "autodate",
  "updated": "autodate"
}
```

#### 3. `project_history`
```json
{
  "project": "relation (projects)",
  "html_content": "text",
  "css_content": "text",
  "type": "string (auto|manual|ai)",
  "description": "string",
  "created": "autodate"
}
```

#### 4. `subscriptions`
```json
{
  "user": "relation (users)",
  "plan": "string (free|pro|business)",
  "status": "string (active|cancelled|past_due)",
  "lygos_subscription_id": "string",
  "current_period_start": "date",
  "current_period_end": "date",
  "amount": "number",
  "currency": "string (XAF)"
}
```

#### 5. `invoices`
```json
{
  "user": "relation (users)",
  "subscription": "relation (subscriptions)",
  "lygos_payment_id": "string",
  "amount": "number",
  "currency": "string (XAF)",
  "status": "string (paid|pending|failed)",
  "pdf_url": "string",
  "created": "autodate"
}
```

#### 6. `ai_generations`
```json
{
  "user": "relation (users)",
  "project": "relation (projects)",
  "prompt": "text",
  "type": "string (section|page|component)",
  "result_html": "text",
  "credits_used": "number",
  "created": "autodate"
}
```

#### 7. `templates`
```json
{
  "name": "string",
  "description": "text",
  "category": "string",
  "thumbnail": "file",
  "html_content": "text",
  "css_content": "text",
  "is_premium": "boolean",
  "order": "number"
}
```

#### 8. `contact_messages`
```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "text",
  "status": "string (new|replied|closed)",
  "created": "autodate"
}
```

#### 9. `newsletter_subscribers`
```json
{
  "email": "string (unique)",
  "language": "string",
  "created": "autodate"
}
```

---

## 🔐 Règles d'accès (API Rules)

### users
- `listRule`: `@request.auth.id != ""`
- `viewRule`: `@request.auth.id = id`
- `createRule`: `null` (géré par auth)
- `updateRule`: `@request.auth.id = id`
- `deleteRule`: `@request.auth.id = id`

### projects
- `listRule`: `owner = @request.auth.id || is_public = true`
- `viewRule`: `owner = @request.auth.id || is_public = true`
- `createRule`: `@request.auth.id != ""`
- `updateRule`: `owner = @request.auth.id`
- `deleteRule`: `owner = @request.auth.id`

### subscriptions
- `listRule`: `user = @request.auth.id`
- `viewRule`: `user = @request.auth.id`
- `createRule`: `null` (backend only)
- `updateRule`: `null` (backend only)
- `deleteRule`: `null` (backend only)

---

## 💳 Intégration Lygos Pay

### Configuration requise
```env
LYGOS_API_KEY=your_api_key_here
LYGOS_WEBHOOK_SECRET=your_webhook_secret
APP_URL=https://viral.africa
```

### Endpoints à implémenter

#### POST `/api/payments/create-gateway`
Crée un lien de paiement Lygos pour upgrade de plan.

```javascript
// Request
{
  "plan": "pro",
  "billing": "monthly" // ou "yearly"
}

// Response
{
  "payment_url": "https://pay.lygosapp.com/gateway/xxx",
  "order_id": "ORD-xxx"
}
```

#### POST `/api/payments/mobile`
Initie un paiement Mobile Money.

```javascript
// Request
{
  "plan": "pro",
  "billing": "monthly",
  "phone_number": "+237657843901",
  "operator": "MTN_MOMO_CMR"
}

// Response
{
  "payment_id": "lmo_xxx",
  "status": "pending",
  "message": "Un SMS vous sera envoyé..."
}
```

#### POST `/api/webhooks/lygos`
Webhook pour recevoir les notifications de paiement.

```javascript
// Lygos envoie:
{
  "event": "payment.success",
  "data": {
    "id": "xxx",
    "amount": 9900,
    "currency": "XAF",
    "order_id": "ORD-xxx"
  }
}
```

---

## 🤖 Intégration IA

### Configuration
```env
OPENAI_API_KEY=your_openai_key
```

### Endpoint `/api/ai/generate`
```javascript
// Request
{
  "prompt": "Create a hero section with...",
  "type": "section",
  "project_id": "xxx"
}

// Response
{
  "html": "<section>...</section>",
  "credits_used": 1
}
```

---

## 📧 Emails transactionnels

### Templates à créer
1. `welcome` - Bienvenue après inscription
2. `password_reset` - Réinitialisation mot de passe
3. `subscription_confirmed` - Confirmation d'abonnement
4. `subscription_cancelled` - Annulation d'abonnement
5. `invoice` - Nouvelle facture
6. `credits_low` - Crédits bas (< 10%)

---

## 🔄 Tâches CRON

### Quotidien
- Réinitialiser les crédits des utilisateurs dont la date de reset est passée
- Envoyer rappels de renouvellement (3 jours avant)

### Hebdomadaire
- Nettoyer les projets supprimés depuis plus de 30 jours
- Générer rapports d'utilisation

---

## 📊 Analytics à tracker

1. **Utilisateurs**
   - Inscriptions par jour/semaine/mois
   - Rétention
   - Conversions free → paid

2. **Projets**
   - Créations par jour
   - Publications
   - Exports

3. **IA**
   - Générations par type
   - Consommation de crédits
   - Taux de succès

4. **Paiements**
   - Revenu par plan
   - Taux de churn
   - LTV

---

## 🚀 Déploiement

### Variables d'environnement production
```env
POCKETBASE_URL=https://api.viral.africa
LYGOS_API_KEY=pk_live_xxx
LYGOS_WEBHOOK_SECRET=whsec_xxx
OPENAI_API_KEY=sk-xxx
APP_URL=https://viral.africa
```

### Commandes
```bash
# Démarrer PocketBase
./pocketbase serve --http=0.0.0.0:8090

# Avec HTTPS
./pocketbase serve --https=0.0.0.0:443
```
