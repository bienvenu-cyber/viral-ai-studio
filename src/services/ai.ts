/**
 * AI Generation Service for Viral
 * Uses Mistral AI or compatible API for code generation
 */

export interface AIGenerationRequest {
  prompt: string;
  type?: string;
  context?: string;
}

export interface AIGenerationResponse {
  html: string;
  success: boolean;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Configuration
const AI_API_URL = import.meta.env.VITE_AI_API_URL || 'https://api.mistral.ai/v1/chat/completions';
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || '';

// System prompt for HTML/Tailwind generation
const SYSTEM_PROMPT = `Tu es un expert en développement web. Tu génères du code HTML propre et moderne avec Tailwind CSS basé sur les demandes des utilisateurs.

RÈGLES IMPORTANTES:
1. Génère UNIQUEMENT du code HTML avec des classes Tailwind CSS
2. N'inclus PAS de balises <html>, <head>, <body> - génère seulement le contenu
3. Utilise un thème sombre avec des fonds gray-800/900 et des accents cyan-500
4. Rends le code responsive (mobile-first)
5. Ajoute des animations et effets hover appropriés
6. Utilise des gradients et des effets modernes
7. NE DONNE AUCUNE EXPLICATION - seulement le code HTML
8. N'utilise pas de blocs markdown, retourne directement le HTML

STYLE VISUEL:
- Backgrounds: bg-gray-900, bg-gray-800, bg-gradient-to-br
- Accents: text-cyan-500, border-cyan-500, bg-cyan-500
- Arrondis: rounded-xl, rounded-2xl
- Ombres: shadow-lg, shadow-cyan-500/25
- Transitions: transition, hover:scale-105`;

/**
 * Check if AI API is configured
 */
export function isAIConfigured(): boolean {
  return !!AI_API_KEY;
}

/**
 * Generates HTML code using AI
 */
export async function generateWithAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  const { prompt, type = 'section', context } = request;

  // If no API key configured, show error
  if (!AI_API_KEY) {
    return {
      html: '',
      success: false,
      error: 'Clé API AI non configurée. Veuillez ajouter VITE_AI_API_KEY dans les secrets.',
    };
  }

  try {
    const userPrompt = context 
      ? `Contexte actuel du projet:\n${context}\n\nDemande: ${prompt}`
      : `Génère un composant ${type} pour: ${prompt}`;

    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    const rawContent = data.choices?.[0]?.message?.content || '';
    
    // Clean up the response - remove markdown code blocks if present
    let html = rawContent.trim();
    
    // Remove markdown code block wrappers
    const htmlMatch = html.match(/```(?:html)?\n?([\s\S]*?)```/);
    if (htmlMatch) {
      html = htmlMatch[1].trim();
    }

    // Remove any leading/trailing backticks
    html = html.replace(/^`+|`+$/g, '').trim();

    if (!html) {
      throw new Error('Aucun contenu généré');
    }

    return {
      html,
      success: true,
    };
  } catch (error) {
    console.error('AI generation error:', error);
    return {
      html: '',
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Generate with streaming (for real-time updates)
 */
export async function generateWithAIStream(
  request: AIGenerationRequest,
  onChunk: (chunk: string) => void
): Promise<AIGenerationResponse> {
  const { prompt, type = 'section' } = request;

  if (!AI_API_KEY) {
    return {
      html: '',
      success: false,
      error: 'Clé API AI non configurée',
    };
  }

  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Génère un composant ${type} pour: ${prompt}` }
        ],
        temperature: 0.7,
        max_tokens: 4096,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('No response body');

    const decoder = new TextDecoder();
    let fullContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.startsWith('data: '));

      for (const line of lines) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            fullContent += content;
            onChunk(content);
          }
        } catch {
          // Ignore parsing errors for incomplete chunks
        }
      }
    }

    // Clean up the content
    let html = fullContent.trim();
    const htmlMatch = html.match(/```(?:html)?\n?([\s\S]*?)```/);
    if (htmlMatch) {
      html = htmlMatch[1].trim();
    }

    return {
      html,
      success: true,
    };
  } catch (error) {
    console.error('AI stream error:', error);
    return {
      html: '',
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Improve existing HTML code
 */
export async function improveWithAI(
  currentHtml: string,
  instruction: string
): Promise<AIGenerationResponse> {
  if (!AI_API_KEY) {
    return {
      html: '',
      success: false,
      error: 'Clé API AI non configurée',
    };
  }

  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { 
            role: 'user', 
            content: `Voici le code HTML actuel:\n\n${currentHtml}\n\nModifie ce code selon cette instruction: ${instruction}\n\nRetourne UNIQUEMENT le code HTML modifié, sans explications.`
          }
        ],
        temperature: 0.7,
        max_tokens: 8192,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    let html = data.choices?.[0]?.message?.content || '';
    
    // Clean up
    const htmlMatch = html.match(/```(?:html)?\n?([\s\S]*?)```/);
    if (htmlMatch) {
      html = htmlMatch[1].trim();
    }
    html = html.replace(/^`+|`+$/g, '').trim();

    return {
      html,
      success: true,
    };
  } catch (error) {
    console.error('AI improve error:', error);
    return {
      html: '',
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}
