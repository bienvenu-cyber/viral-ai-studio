/**
 * AI Generation Service
 * Mock implementation ready for Mistral AI or custom backend integration
 * 
 * To integrate with your backend:
 * 1. Set VITE_AI_API_URL in your environment
 * 2. Set VITE_AI_API_KEY for authentication
 * 3. The backend should accept { prompt, type } and return { html }
 */

export interface AIGenerationRequest {
  prompt: string;
  type: string;
}

export interface AIGenerationResponse {
  html: string;
  success: boolean;
  error?: string;
}

// Configuration - set these in your environment when connecting to real backend
const AI_API_URL = import.meta.env.VITE_AI_API_URL || '';
const AI_API_KEY = import.meta.env.VITE_AI_API_KEY || '';

/**
 * Generates Tailwind HTML code using AI
 * Currently uses mock templates - ready for Mistral AI integration
 */
export async function generateWithAI(request: AIGenerationRequest): Promise<AIGenerationResponse> {
  const { prompt, type } = request;

  // If backend is configured, use it
  if (AI_API_URL && AI_API_KEY) {
    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'mistral-large-latest', // Mistral AI model
          messages: [
            {
              role: 'system',
              content: `You are an expert web developer. Generate clean, modern Tailwind CSS HTML code based on the user's request. 
              Only output the HTML code, no explanations. Use a dark theme with gray-800/900 backgrounds and cyan-500 accents.
              Make the code responsive and visually stunning.`
            },
            {
              role: 'user',
              content: `Generate a ${type} section for: ${prompt}`
            }
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const html = data.choices?.[0]?.message?.content || '';
      
      // Extract HTML from markdown code blocks if present
      const htmlMatch = html.match(/```html?\n?([\s\S]*?)```/);
      const cleanHtml = htmlMatch ? htmlMatch[1].trim() : html.trim();

      return {
        html: cleanHtml,
        success: true,
      };
    } catch (error) {
      console.error('AI generation error:', error);
      return {
        html: '',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Mock generation for demo - simulates AI response delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const html = generateMockHTML(prompt, type);
  
  return {
    html,
    success: true,
  };
}

/**
 * Mock HTML templates - used when no backend is configured
 * These serve as examples of what the AI should generate
 */
function generateMockHTML(prompt: string, type: string): string {
  const templates: Record<string, string> = {
    hero: `<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_50%)]"></div>
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div class="text-center max-w-4xl mx-auto relative z-10">
        <span class="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">AI-Powered Design</span>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">${prompt || 'Build Something Amazing'}</h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Create stunning websites with AI-powered design tools. No coding required.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Get Started Free</button>
          <button class="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition border border-gray-700">Watch Demo</button>
        </div>
      </div>
    </section>`,

    features: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Powerful Features'}</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Everything you need to build stunning websites</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
            <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">AI Design</h3>
            <p class="text-gray-400">Let AI create beautiful designs tailored to your brand.</p>
          </div>
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p class="text-gray-400">Optimized for speed with best-in-class performance.</p>
          </div>
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">One-Click Deploy</h3>
            <p class="text-gray-400">Deploy to your favorite platform with a single click.</p>
          </div>
        </div>
      </div>
    </section>`,

    pricing: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Simple Pricing'}</h2>
          <p class="text-gray-400">Choose the plan that works for you</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 items-start">
          <div class="p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
            <h3 class="text-xl font-semibold text-white mb-2">Starter</h3>
            <div class="text-4xl font-bold text-white mb-6">$0<span class="text-lg font-normal text-gray-400">/mo</span></div>
            <ul class="space-y-3 mb-8">
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> 3 projects</li>
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Basic AI features</li>
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Community support</li>
            </ul>
            <button class="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition">Get Started</button>
          </div>
          <div class="p-8 bg-gradient-to-b from-cyan-500/10 to-transparent rounded-2xl border-2 border-cyan-500/50 relative scale-105">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-cyan-500 text-white text-sm font-medium rounded-full">Popular</span>
            <h3 class="text-xl font-semibold text-white mb-2">Pro</h3>
            <div class="text-4xl font-bold text-white mb-6">$29<span class="text-lg font-normal text-gray-400">/mo</span></div>
            <ul class="space-y-3 mb-8">
              <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Unlimited projects</li>
              <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Advanced AI features</li>
              <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Priority support</li>
              <li class="text-gray-300 flex items-center gap-2"><span class="text-cyan-500">✓</span> Custom domains</li>
            </ul>
            <button class="w-full py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Get Started</button>
          </div>
          <div class="p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
            <h3 class="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <div class="text-4xl font-bold text-white mb-6">Custom</div>
            <ul class="space-y-3 mb-8">
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Everything in Pro</li>
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Custom integrations</li>
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> Dedicated support</li>
              <li class="text-gray-400 flex items-center gap-2"><span class="text-cyan-500">✓</span> SLA guarantee</li>
            </ul>
            <button class="w-full py-3 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>`,

    testimonials: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Loved by Creators'}</h2>
          <p class="text-gray-400">See what our users have to say</p>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
            </div>
            <p class="text-gray-300 mb-6">"This tool has completely transformed how I build websites. The AI features are incredible and save me hours of work!"</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full"></div>
              <div>
                <div class="font-semibold text-white">Sarah Chen</div>
                <div class="text-gray-400 text-sm">Freelance Designer</div>
              </div>
            </div>
          </div>
          <div class="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
            </div>
            <p class="text-gray-300 mb-6">"I built my entire startup's website in under an hour. Absolutely game-changing for entrepreneurs."</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full"></div>
              <div>
                <div class="font-semibold text-white">Alex Rivera</div>
                <div class="text-gray-400 text-sm">Startup Founder</div>
              </div>
            </div>
          </div>
          <div class="p-6 bg-gray-800/50 rounded-2xl border border-gray-700">
            <div class="flex gap-1 mb-4">
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
              <span class="text-yellow-400">★</span>
            </div>
            <p class="text-gray-300 mb-6">"The best website builder I've ever used. Clean code output and beautiful designs every time."</p>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full"></div>
              <div>
                <div class="font-semibold text-white">Marcus Johnson</div>
                <div class="text-gray-400 text-sm">Agency Owner</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`,

    contact: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Contact</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Get in Touch'}</h2>
          <p class="text-gray-400">We'd love to hear from you</p>
        </div>
        <div class="bg-gray-900 rounded-2xl border border-gray-700 p-8">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input type="text" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition" placeholder="John">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input type="text" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition" placeholder="Doe">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition" placeholder="john@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows="4" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition resize-none" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="w-full py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Send Message</button>
          </form>
        </div>
      </div>
    </section>`,

    faq: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">FAQ</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Frequently Asked Questions'}</h2>
          <p class="text-gray-400">Everything you need to know</p>
        </div>
        <div class="space-y-4">
          <details class="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <summary class="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:bg-gray-800 transition">
              <span>How does the AI generation work?</span>
              <span class="text-cyan-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-6 pb-6 text-gray-400">
              Our AI analyzes your prompt and generates clean, production-ready Tailwind CSS code. It uses advanced language models trained on millions of websites to create beautiful, responsive designs.
            </div>
          </details>
          <details class="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <summary class="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:bg-gray-800 transition">
              <span>Can I export the generated code?</span>
              <span class="text-cyan-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-6 pb-6 text-gray-400">
              Yes! You can export your project as clean HTML/CSS files or push directly to GitHub. The code is fully editable and uses standard Tailwind CSS classes.
            </div>
          </details>
          <details class="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <summary class="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:bg-gray-800 transition">
              <span>Is there a free plan available?</span>
              <span class="text-cyan-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-6 pb-6 text-gray-400">
              Absolutely! Our free plan includes 3 projects and basic AI features. Upgrade to Pro for unlimited projects and advanced capabilities.
            </div>
          </details>
          <details class="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
            <summary class="flex items-center justify-between p-6 cursor-pointer text-white font-medium hover:bg-gray-800 transition">
              <span>Do you offer custom enterprise solutions?</span>
              <span class="text-cyan-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-6 pb-6 text-gray-400">
              Yes, we offer custom enterprise plans with dedicated support, custom integrations, and SLA guarantees. Contact our sales team for more information.
            </div>
          </details>
        </div>
      </div>
    </section>`,

    navigation: `<nav class="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="#" class="text-xl font-bold text-white">Viral</a>
          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-gray-400 hover:text-white transition">Features</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#" class="text-gray-400 hover:text-white transition">About</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Contact</a>
          </div>
          <div class="flex items-center gap-4">
            <a href="#" class="text-gray-400 hover:text-white transition hidden sm:block">Sign In</a>
            <a href="#" class="px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition">Get Started</a>
          </div>
        </div>
      </div>
    </nav>`,

    footer: `<footer class="py-16 px-4 bg-gray-900 border-t border-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-5 gap-8 mb-12">
          <div class="md:col-span-2">
            <div class="text-2xl font-bold text-white mb-4">Viral</div>
            <p class="text-gray-400 mb-6 max-w-sm">Build stunning websites with AI-powered design tools. No coding required.</p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition">𝕏</a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition">in</a>
              <a href="#" class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition">◉</a>
            </div>
          </div>
          <div>
            <h4 class="font-semibold text-white mb-4">Product</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Features</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Pricing</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Templates</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-white mb-4">Company</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-white mb-4">Legal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Terms</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Security</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="text-gray-400 text-sm">© 2024 Viral. All rights reserved.</div>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>`,

    section: `<section class="py-20 px-4 bg-gray-800">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">${prompt}</h2>
        <p class="text-gray-400 text-lg mb-8">This section was generated based on your prompt. Edit it to match your needs.</p>
        <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">Learn More</button>
      </div>
    </section>`,

    cta: `<section class="py-24 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">${prompt || 'Ready to Get Started?'}</h2>
        <p class="text-xl text-white/80 mb-8">Join thousands of creators building amazing websites with AI.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">Start Building Free</button>
          <button class="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition">Schedule Demo</button>
        </div>
      </div>
    </section>`,

    stats: `<section class="py-20 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="p-6">
            <div class="text-5xl font-bold text-cyan-500 mb-2">50K+</div>
            <div class="text-gray-400">Websites Created</div>
          </div>
          <div class="p-6">
            <div class="text-5xl font-bold text-cyan-500 mb-2">99%</div>
            <div class="text-gray-400">Customer Satisfaction</div>
          </div>
          <div class="p-6">
            <div class="text-5xl font-bold text-cyan-500 mb-2">150+</div>
            <div class="text-gray-400">Countries Served</div>
          </div>
          <div class="p-6">
            <div class="text-5xl font-bold text-cyan-500 mb-2">24/7</div>
            <div class="text-gray-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>`,

    team: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Our Team</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">${prompt || 'Meet the Team'}</h2>
          <p class="text-gray-400">The people behind the magic</p>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center group">
            <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full group-hover:scale-105 transition-transform"></div>
            <h3 class="text-lg font-semibold text-white">Emily Zhang</h3>
            <p class="text-gray-400 text-sm">CEO & Founder</p>
          </div>
          <div class="text-center group">
            <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full group-hover:scale-105 transition-transform"></div>
            <h3 class="text-lg font-semibold text-white">David Kim</h3>
            <p class="text-gray-400 text-sm">CTO</p>
          </div>
          <div class="text-center group">
            <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full group-hover:scale-105 transition-transform"></div>
            <h3 class="text-lg font-semibold text-white">Maria Garcia</h3>
            <p class="text-gray-400 text-sm">Head of Design</p>
          </div>
          <div class="text-center group">
            <div class="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-full group-hover:scale-105 transition-transform"></div>
            <h3 class="text-lg font-semibold text-white">James Wilson</h3>
            <p class="text-gray-400 text-sm">Head of Engineering</p>
          </div>
        </div>
      </div>
    </section>`,
  };

  return templates[type] || templates.section;
}
