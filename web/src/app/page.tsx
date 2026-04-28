import Link from 'next/link'
import { ArrowRight, Bot, Sparkles, Zap, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[var(--primary)] blur-[150px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600 blur-[150px] opacity-10 pointer-events-none" />

      {/* Navigation */}
      <header className="px-6 lg:px-12 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-2 text-[var(--primary)] font-bold text-2xl">
          <Bot size={32} />
          <span>SocialSaaS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors">
            Sign In
          </Link>
          <Link href="/login" className="bg-[var(--primary)] text-white text-sm font-medium px-5 py-2.5 rounded-full hover:bg-[var(--primary)]/90 transition-all flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-8 border border-[var(--primary)]/20">
          <Sparkles size={16} />
          <span>The Next Generation of Social Automation</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6">
          Put Your Social Media on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-purple-500">Autopilot.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-2xl mb-10">
          We use advanced AI to learn your brand voice, generate daily posts, and automatically publish them. You maintain full control with our WhatsApp approval loop.
        </p>
        

      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto w-full z-10 relative">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] shadow-sm p-8 rounded-3xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">AI Generation</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Posts are uniquely generated daily using Gemini AI, precisely matching your company's unique brand voice and tone.
            </p>
          </div>
          
          <div className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] shadow-sm p-8 rounded-3xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">WhatsApp Approval</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Nothing goes live without your permission. Receive the draft directly to your phone and reply "Approve" to publish.
            </p>
          </div>
          
          <div className="bg-[var(--card)]/80 backdrop-blur-sm border border-[var(--border)] shadow-sm p-8 rounded-3xl relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3">Multi-Platform</h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              One approval instantly publishes your post simultaneously to Facebook, Instagram, LinkedIn, and Twitter.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
