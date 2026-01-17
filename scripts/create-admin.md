# Créer un Admin PocketBase

## Méthode 1: Via l'interface d'administration

1. Accédez à l'URL de votre PocketBase: https://pocketbase-production-3636.up.railway.app/_/
2. Lors de la première visite, vous serez invité à créer un compte administrateur
3. Remplissez les champs:
   - Email: votre-email@example.com
   - Mot de passe: un mot de passe sécurisé (min 10 caractères)

## Méthode 2: Créer les collections

Une fois connecté à l'interface d'administration, créez les collections suivantes:

### Collection: users (déjà existante par défaut)
Ajoutez ces champs si nécessaires:
- `name` (text) - Nom de l'utilisateur
- `avatar` (file) - Photo de profil

### Collection: projects
```json
{
  "name": "projects",
  "type": "base",
  "fields": [
    { "name": "name", "type": "text", "required": true },
    { "name": "description", "type": "text" },
    { "name": "html", "type": "text" },
    { "name": "css", "type": "text" },
    { "name": "user", "type": "relation", "options": { "collectionId": "users", "maxSelect": 1 } },
    { "name": "published", "type": "bool", "default": false },
    { "name": "github_repo", "type": "text" }
  ]
}
```

### Collection: project_history
```json
{
  "name": "project_history",
  "type": "base",
  "fields": [
    { "name": "project", "type": "relation", "options": { "collectionId": "projects", "maxSelect": 1 } },
    { "name": "html", "type": "text" },
    { "name": "css", "type": "text" },
    { "name": "action", "type": "text" },
    { "name": "user", "type": "relation", "options": { "collectionId": "users", "maxSelect": 1 } }
  ]
}
```

### Collection: subscriptions
```json
{
  "name": "subscriptions",
  "type": "base",
  "fields": [
    { "name": "user", "type": "relation", "options": { "collectionId": "users", "maxSelect": 1 } },
    { "name": "plan", "type": "select", "options": { "values": ["free", "pro", "business"] } },
    { "name": "status", "type": "select", "options": { "values": ["active", "cancelled", "expired"] } },
    { "name": "lygos_subscription_id", "type": "text" },
    { "name": "current_period_end", "type": "date" },
    { "name": "credits_used", "type": "number", "default": 0 },
    { "name": "credits_limit", "type": "number", "default": 100 }
  ]
}
```

### Collection: ai_generations
```json
{
  "name": "ai_generations",
  "type": "base",
  "fields": [
    { "name": "user", "type": "relation", "options": { "collectionId": "users", "maxSelect": 1 } },
    { "name": "project", "type": "relation", "options": { "collectionId": "projects", "maxSelect": 1 } },
    { "name": "prompt", "type": "text" },
    { "name": "type", "type": "text" },
    { "name": "result_html", "type": "text" },
    { "name": "tokens_used", "type": "number" },
    { "name": "model", "type": "text" }
  ]
}
```

### Collection: templates
```json
{
  "name": "templates",
  "type": "base",
  "fields": [
    { "name": "name", "type": "text", "required": true },
    { "name": "description", "type": "text" },
    { "name": "category", "type": "select", "options": { "values": ["landing", "portfolio", "blog", "ecommerce", "startup"] } },
    { "name": "html", "type": "text" },
    { "name": "css", "type": "text" },
    { "name": "thumbnail", "type": "file" },
    { "name": "is_premium", "type": "bool", "default": false }
  ]
}
```

### Collection: contact_messages
```json
{
  "name": "contact_messages",
  "type": "base",
  "fields": [
    { "name": "name", "type": "text", "required": true },
    { "name": "email", "type": "email", "required": true },
    { "name": "message", "type": "text", "required": true },
    { "name": "status", "type": "select", "options": { "values": ["new", "read", "replied"] }, "default": "new" }
  ]
}
```

## Règles d'accès API

### Collection users
- List/Search: @request.auth.id != ""
- View: @request.auth.id = id
- Create: (ouvert pour l'inscription)
- Update: @request.auth.id = id
- Delete: @request.auth.id = id

### Collection projects
- List/Search: @request.auth.id != "" && user = @request.auth.id
- View: user = @request.auth.id || published = true
- Create: @request.auth.id != ""
- Update: user = @request.auth.id
- Delete: user = @request.auth.id

### Collection project_history
- List/Search: @request.auth.id != "" && user = @request.auth.id
- View: user = @request.auth.id
- Create: @request.auth.id != ""
- Update: (désactivé)
- Delete: user = @request.auth.id

## Configuration OAuth GitHub

1. Dans l'interface admin PocketBase, allez dans Settings > Auth providers
2. Activez GitHub
3. Configurez:
   - Client ID: (depuis GitHub Developer Settings)
   - Client Secret: (depuis GitHub Developer Settings)
   - Redirect URL: https://pocketbase-production-3636.up.railway.app/api/oauth2-redirect

## Variables d'environnement requises

Dans votre projet Lovable (secrets):
- `VITE_POCKETBASE_URL`: https://pocketbase-production-3636.up.railway.app
- `VITE_AI_API_KEY`: Votre clé API Mistral AI

## Test de connexion

```javascript
// Dans la console du navigateur
import PocketBase from 'pocketbase';
const pb = new PocketBase('https://pocketbase-production-3636.up.railway.app');

// Test de connexion
const health = await pb.health.check();
console.log('PocketBase status:', health);
```
