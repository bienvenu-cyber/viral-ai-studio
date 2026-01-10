/**
 * GrapesJS Block Templates
 * Extended collection of ready-to-use website sections
 */

export interface BlockDefinition {
  id: string;
  label: string;
  category: string;
  content: string;
  media?: string;
}

export const blocks: BlockDefinition[] = [
  // Layout Blocks
  {
    id: 'section',
    label: 'Section',
    category: 'Layout',
    content: `<section class="py-16 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-white mb-4">Section Title</h2>
        <p class="text-gray-400">Add your content here.</p>
      </div>
    </section>`,
  },
  {
    id: 'container',
    label: 'Container',
    category: 'Layout',
    content: `<div class="max-w-6xl mx-auto px-4">
      <p class="text-gray-400">Container content</p>
    </div>`,
  },
  {
    id: 'two-columns',
    label: '2 Columns',
    category: 'Layout',
    content: `<div class="grid md:grid-cols-2 gap-8 p-8">
      <div class="p-6 bg-gray-800 rounded-lg">
        <h3 class="text-xl font-semibold text-white mb-2">Column 1</h3>
        <p class="text-gray-400">Left column content</p>
      </div>
      <div class="p-6 bg-gray-800 rounded-lg">
        <h3 class="text-xl font-semibold text-white mb-2">Column 2</h3>
        <p class="text-gray-400">Right column content</p>
      </div>
    </div>`,
  },
  {
    id: 'three-columns',
    label: '3 Columns',
    category: 'Layout',
    content: `<div class="grid md:grid-cols-3 gap-6 p-8">
      <div class="p-6 bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Column 1</h3>
        <p class="text-gray-400 text-sm">Content here</p>
      </div>
      <div class="p-6 bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Column 2</h3>
        <p class="text-gray-400 text-sm">Content here</p>
      </div>
      <div class="p-6 bg-gray-800 rounded-lg">
        <h3 class="text-lg font-semibold text-white mb-2">Column 3</h3>
        <p class="text-gray-400 text-sm">Content here</p>
      </div>
    </div>`,
  },

  // Navigation Blocks
  {
    id: 'navbar-simple',
    label: 'Navbar Simple',
    category: 'Navigation',
    content: `<nav class="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <a href="#" class="text-xl font-bold text-white">Brand</a>
          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-gray-400 hover:text-white transition">Home</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Features</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Pricing</a>
            <a href="#" class="text-gray-400 hover:text-white transition">Contact</a>
          </div>
          <a href="#" class="px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 transition">Get Started</a>
        </div>
      </div>
    </nav>`,
  },
  {
    id: 'navbar-centered',
    label: 'Navbar Centered',
    category: 'Navigation',
    content: `<nav class="bg-gray-900 border-b border-gray-800 py-4">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex flex-col items-center gap-4">
          <a href="#" class="text-2xl font-bold text-white">Brand</a>
          <div class="flex items-center gap-6">
            <a href="#" class="text-gray-400 hover:text-cyan-400 transition">Home</a>
            <a href="#" class="text-gray-400 hover:text-cyan-400 transition">About</a>
            <a href="#" class="text-gray-400 hover:text-cyan-400 transition">Services</a>
            <a href="#" class="text-gray-400 hover:text-cyan-400 transition">Portfolio</a>
            <a href="#" class="text-gray-400 hover:text-cyan-400 transition">Contact</a>
          </div>
        </div>
      </div>
    </nav>`,
  },
  {
    id: 'navbar-transparent',
    label: 'Navbar Transparent',
    category: 'Navigation',
    content: `<nav class="absolute top-0 left-0 right-0 z-50 py-6">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between">
          <a href="#" class="text-xl font-bold text-white">Brand</a>
          <div class="hidden md:flex items-center gap-8">
            <a href="#" class="text-white/80 hover:text-white transition">Features</a>
            <a href="#" class="text-white/80 hover:text-white transition">Pricing</a>
            <a href="#" class="text-white/80 hover:text-white transition">About</a>
          </div>
          <div class="flex items-center gap-4">
            <a href="#" class="text-white/80 hover:text-white transition">Sign In</a>
            <a href="#" class="px-4 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition">Start Free</a>
          </div>
        </div>
      </div>
    </nav>`,
  },

  // Hero Blocks
  {
    id: 'hero-centered',
    label: 'Hero Centered',
    category: 'Sections',
    content: `<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_50%)]"></div>
      <div class="text-center max-w-4xl mx-auto relative z-10">
        <span class="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-medium mb-6">New Feature Available</span>
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">Build Something Amazing</h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">Create stunning websites with AI-powered design tools. No coding required.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Get Started Free</button>
          <button class="px-8 py-4 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition border border-gray-700">Watch Demo</button>
        </div>
      </div>
    </section>`,
  },
  {
    id: 'hero-split',
    label: 'Hero Split',
    category: 'Sections',
    content: `<section class="min-h-screen flex items-center bg-gray-900 px-4">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Welcome</span>
          <h1 class="text-4xl md:text-6xl font-bold text-white mt-2 mb-6">Transform Your Ideas Into Reality</h1>
          <p class="text-lg text-gray-400 mb-8">Build beautiful, responsive websites in minutes with our AI-powered platform.</p>
          <div class="flex gap-4">
            <button class="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">Start Building</button>
            <button class="px-6 py-3 text-white font-semibold rounded-lg border border-gray-700 hover:bg-gray-800 transition">Learn More</button>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl border border-gray-700"></div>
          <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-500/30 rounded-2xl blur-2xl"></div>
        </div>
      </div>
    </section>`,
  },

  // Features Blocks
  {
    id: 'features-grid',
    label: 'Features Grid',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Features</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">Everything You Need</h2>
          <p class="text-gray-400 max-w-2xl mx-auto">Powerful features to help you build faster</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🎨</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">AI Design</h3>
            <p class="text-gray-400">Let AI create beautiful designs tailored to your brand.</p>
          </div>
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">⚡</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">Lightning Fast</h3>
            <p class="text-gray-400">Optimized for speed with best-in-class performance.</p>
          </div>
          <div class="group p-8 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-cyan-500/50 transition-all">
            <div class="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span class="text-2xl">🚀</span>
            </div>
            <h3 class="text-xl font-semibold text-white mb-3">One-Click Deploy</h3>
            <p class="text-gray-400">Deploy to your favorite platform with a single click.</p>
          </div>
        </div>
      </div>
    </section>`,
  },
  {
    id: 'features-list',
    label: 'Features List',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 class="text-4xl font-bold text-white mt-2 mb-6">Built for Modern Teams</h2>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-cyan-500">✓</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1">Real-time Collaboration</h3>
                  <p class="text-gray-400">Work together with your team in real-time.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-cyan-500">✓</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1">Version Control</h3>
                  <p class="text-gray-400">Track changes and revert when needed.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span class="text-cyan-500">✓</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-white mb-1">Secure & Reliable</h3>
                  <p class="text-gray-400">Enterprise-grade security for your projects.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-square bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl border border-gray-600"></div>
          </div>
        </div>
      </div>
    </section>`,
  },

  // Testimonials Blocks
  {
    id: 'testimonials-grid',
    label: 'Testimonials Grid',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">Loved by Creators</h2>
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
            <p class="text-gray-300 mb-6">"This tool has completely transformed how I build websites. The AI features are incredible!"</p>
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
            <p class="text-gray-300 mb-6">"Built my startup's website in under an hour. Absolutely game-changing for entrepreneurs."</p>
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
            <p class="text-gray-300 mb-6">"The best website builder I've ever used. Clean code output every time."</p>
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
  },
  {
    id: 'testimonials-carousel',
    label: 'Testimonial Large',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <div class="flex justify-center gap-1 mb-6">
            <span class="text-yellow-400 text-2xl">★</span>
            <span class="text-yellow-400 text-2xl">★</span>
            <span class="text-yellow-400 text-2xl">★</span>
            <span class="text-yellow-400 text-2xl">★</span>
            <span class="text-yellow-400 text-2xl">★</span>
          </div>
          <blockquote class="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">"This is hands down the best website builder I've ever used. The AI understands exactly what I need and delivers stunning results every single time."</blockquote>
          <div class="flex items-center justify-center gap-4">
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full"></div>
            <div class="text-left">
              <div class="font-semibold text-white text-lg">Jennifer Morrison</div>
              <div class="text-gray-400">CEO at TechFlow</div>
            </div>
          </div>
        </div>
      </div>
    </section>`,
  },

  // Contact Blocks
  {
    id: 'contact-form',
    label: 'Contact Form',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Contact</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">Get in Touch</h2>
          <p class="text-gray-400">We'd love to hear from you</p>
        </div>
        <div class="bg-gray-900 rounded-2xl border border-gray-700 p-8">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input type="text" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" placeholder="John">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input type="text" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" placeholder="Doe">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input type="email" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" placeholder="john@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea rows="4" class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" class="w-full py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/25">Send Message</button>
          </form>
        </div>
      </div>
    </section>`,
  },
  {
    id: 'contact-split',
    label: 'Contact Split',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Contact Us</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-6">Let's Work Together</h2>
          <p class="text-gray-400 mb-8">Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you as soon as possible.</p>
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span class="text-cyan-500">📧</span>
              </div>
              <div>
                <div class="text-gray-400 text-sm">Email</div>
                <div class="text-white">hello@example.com</div>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <span class="text-cyan-500">📍</span>
              </div>
              <div>
                <div class="text-gray-400 text-sm">Location</div>
                <div class="text-white">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          <form class="space-y-4">
            <input type="text" class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" placeholder="Your name">
            <input type="email" class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none" placeholder="Your email">
            <textarea rows="4" class="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none" placeholder="Your message"></textarea>
            <button type="submit" class="w-full py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition">Send Message</button>
          </form>
        </div>
      </div>
    </section>`,
  },

  // FAQ Blocks
  {
    id: 'faq-accordion',
    label: 'FAQ Accordion',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-900">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">FAQ</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">Frequently Asked Questions</h2>
          <p class="text-gray-400">Everything you need to know</p>
        </div>
        <div class="space-y-4">
          <details class="group bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden" open>
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
              <span>Do you offer refunds?</span>
              <span class="text-cyan-500 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div class="px-6 pb-6 text-gray-400">
              Yes, we offer a 14-day money-back guarantee. If you're not satisfied with our product, contact support for a full refund.
            </div>
          </details>
        </div>
      </div>
    </section>`,
  },
  {
    id: 'faq-two-columns',
    label: 'FAQ Two Columns',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">Common Questions</h2>
          <p class="text-gray-400">Quick answers to questions you may have</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">What payment methods do you accept?</h3>
              <p class="text-gray-400">We accept all major credit cards, PayPal, and bank transfers for enterprise customers.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Can I cancel my subscription?</h3>
              <p class="text-gray-400">Yes, you can cancel anytime from your account settings. No questions asked.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Is my data secure?</h3>
              <p class="text-gray-400">Absolutely. We use enterprise-grade encryption and follow industry best practices.</p>
            </div>
          </div>
          <div class="space-y-8">
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Do you offer team plans?</h3>
              <p class="text-gray-400">Yes! Our Pro and Enterprise plans support unlimited team members with role-based access.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">Can I use my own domain?</h3>
              <p class="text-gray-400">Custom domains are included in all paid plans. We handle SSL certificates automatically.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-white mb-2">How do I get support?</h3>
              <p class="text-gray-400">Email us anytime or use live chat for Pro users. We typically respond within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
  },

  // Pricing Block
  {
    id: 'pricing-cards',
    label: 'Pricing Cards',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-cyan-500 font-medium text-sm uppercase tracking-wider">Pricing</span>
          <h2 class="text-4xl font-bold text-white mt-2 mb-4">Simple, Transparent Pricing</h2>
          <p class="text-gray-400">Choose the plan that's right for you</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 items-start">
          <div class="p-8 bg-gray-900 rounded-2xl border border-gray-700 hover:border-gray-600 transition">
            <h3 class="text-xl font-semibold text-white mb-2">Starter</h3>
            <div class="text-4xl font-bold text-white mb-1">$0</div>
            <div class="text-gray-400 mb-6">Free forever</div>
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
            <div class="text-4xl font-bold text-white mb-1">$29</div>
            <div class="text-gray-400 mb-6">per month</div>
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
            <div class="text-4xl font-bold text-white mb-1">Custom</div>
            <div class="text-gray-400 mb-6">Contact for pricing</div>
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
  },

  // CTA Blocks
  {
    id: 'cta-centered',
    label: 'CTA Centered',
    category: 'Sections',
    content: `<section class="py-24 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
        <p class="text-xl text-white/80 mb-8">Join thousands of creators building amazing websites with AI.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition">Start Building Free</button>
          <button class="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition">Schedule Demo</button>
        </div>
      </div>
    </section>`,
  },
  {
    id: 'cta-simple',
    label: 'CTA Simple',
    category: 'Sections',
    content: `<section class="py-16 px-4 bg-gray-900 border-y border-gray-800">
      <div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 class="text-2xl font-bold text-white">Ready to start building?</h3>
          <p class="text-gray-400">Get started with a free account today.</p>
        </div>
        <button class="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 transition whitespace-nowrap">Get Started Free →</button>
      </div>
    </section>`,
  },

  // Footer Blocks
  {
    id: 'footer-full',
    label: 'Footer Full',
    category: 'Sections',
    content: `<footer class="py-16 px-4 bg-gray-900 border-t border-gray-800">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-5 gap-8 mb-12">
          <div class="md:col-span-2">
            <div class="text-2xl font-bold text-white mb-4">Brand</div>
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
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-white mb-4">Company</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-white mb-4">Legal</h4>
            <ul class="space-y-3">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © 2024 Brand. All rights reserved.
        </div>
      </div>
    </footer>`,
  },
  {
    id: 'footer-simple',
    label: 'Footer Simple',
    category: 'Sections',
    content: `<footer class="py-8 px-4 bg-gray-900 border-t border-gray-800">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-xl font-bold text-white">Brand</div>
        <div class="flex items-center gap-6">
          <a href="#" class="text-gray-400 hover:text-white transition text-sm">Privacy</a>
          <a href="#" class="text-gray-400 hover:text-white transition text-sm">Terms</a>
          <a href="#" class="text-gray-400 hover:text-white transition text-sm">Contact</a>
        </div>
        <div class="text-gray-400 text-sm">© 2024 Brand</div>
      </div>
    </footer>`,
  },

  // Stats Block
  {
    id: 'stats-row',
    label: 'Stats Row',
    category: 'Sections',
    content: `<section class="py-16 px-4 bg-gray-900">
      <div class="max-w-6xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-5xl font-bold text-cyan-500 mb-2">50K+</div>
            <div class="text-gray-400">Websites Created</div>
          </div>
          <div>
            <div class="text-5xl font-bold text-cyan-500 mb-2">99%</div>
            <div class="text-gray-400">Satisfaction Rate</div>
          </div>
          <div>
            <div class="text-5xl font-bold text-cyan-500 mb-2">150+</div>
            <div class="text-gray-400">Countries</div>
          </div>
          <div>
            <div class="text-5xl font-bold text-cyan-500 mb-2">24/7</div>
            <div class="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>`,
  },
];

/**
 * Get blocks grouped by category
 */
export function getBlocksByCategory(): Record<string, BlockDefinition[]> {
  return blocks.reduce((acc, block) => {
    if (!acc[block.category]) {
      acc[block.category] = [];
    }
    acc[block.category].push(block);
    return acc;
  }, {} as Record<string, BlockDefinition[]>);
}

/**
 * Get all category names in order
 */
export function getCategories(): string[] {
  return ['Layout', 'Navigation', 'Sections'];
}
