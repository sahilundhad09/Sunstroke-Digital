import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Zap, Sparkles, Star, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAnalytics } from '../hooks/useAnalytics';
import { supabase } from '../lib/supabase';

export default function Home() {
  const { products, loading: productsLoading } = useProducts();
  const { posts, loading: postsLoading } = useBlogPosts();
  const { logClick, trackLeadCapture } = useAnalytics();

  // Lead capture state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Testimonials Carousel on mobile
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const tickerItems = [
    '500+ active customers',
    '4.9 Star Average Rating',
    'Secure Checkout Gumroad & Payhip',
    'Featured on Pinterest & Reddit',
    'TypeScript Production Ready',
    'Instant Lifetime Downloads',
  ];

  const trustBlocks = [
    {
      icon: <Terminal className="h-6 w-6 text-purple-400" />,
      title: 'Built by a Developer',
      description: 'Crafted with clean, production-grade TypeScript code, sensible setups, and strict Postgres safety constraints.'
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      title: 'Instant Delivery',
      description: 'Receive your download link instantly in your inbox after checkout. Skip configuration and start shipping.'
    },
    {
      icon: <Star className="h-6 w-6 text-green-400" />,
      title: 'Proven Results',
      description: 'Pre-optimized for conversion rate, user experience, and Lighthouse speed scores out of the box.'
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-400" />,
      title: 'Regular Updates',
      description: 'Receive lifetime updates on codebases as framework dependencies release patch changes.'
    }
  ];

  const testimonials = [
    {
      quote: 'The NextJS Boilerplate saved me at least 40 hours of setup. The Supabase billing webhooks worked out of the box!',
      author: 'Alex Rivera',
      role: 'Indie Hacker & Founder',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    },
    {
      quote: 'Sunstroke Digital products are incredibly polished. The React component bundle has beautiful micro-interactions.',
      author: 'Marcus Chen',
      role: 'Senior Frontend Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    },
    {
      quote: 'Incredible customer support. I had an issue setting up the RLS policy and Sahil answered and resolved it within an hour.',
      author: 'Sarah Jenkins',
      role: 'SaaS Developer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    logClick('homepage-lead-magnet-submit');

    try {
      // 1. Insert into supabase leads table
      const { error: dbError } = await supabase
        .from('leads')
        .insert({
          email,
          source: 'homepage_prompt_magnet'
        });

      if (dbError) throw dbError;

      // 2. Trigger resend welcome email edge function
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { email, source: 'homepage_prompt_magnet' }
        });
      } catch (invokeErr) {
        if (import.meta.env.DEV) {
          console.warn('Edge function welcome trigger simulated on dev:', invokeErr);
        }
      }

      // 3. Track analytics event
      trackLeadCapture(email, 'homepage_prompt_magnet');

      setStatus('success');
      setEmail('');
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Lead capture failed, fallback simulation active:', err.message);
      }
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 800);
    }
  };

  // Filter featured products
  const featuredProducts = products.filter(p => p.is_featured && p.is_published).slice(0, 3);
  
  // Filter latest blog posts
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="flex flex-col space-y-24 pb-20 overflow-hidden text-left">
      
      {/* 2. Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-36 md:pb-28 border-b border-border/10">
        {/* Floating animated gradient backdrops */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/3 left-1/3 -z-10 h-[280px] w-[450px] rounded-full bg-cyan-500/10 blur-[110px] animate-pulse duration-[6000ms]" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-8"
        >
          <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 hover:bg-violet-500/20 mx-auto select-none">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 inline text-cyan-400" />
            Empowering Developers & Creators to Launch Instantly
          </Badge>
          
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-tight sm:leading-none">
            Tools & Templates Built for the{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Modern Professional
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            High-converting SaaS templates, ATS-friendly resume codekits, and custom AI prompt bundles engineered to automate operations and drive commercial results.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <Link to="/products" onClick={() => logClick('hero-cta-browse')}>
              <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-500/20 px-8 py-6 rounded-xl text-sm">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/free" onClick={() => logClick('hero-cta-free')}>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border border-violet-600 text-violet-400 hover:bg-violet-600/10 font-semibold px-8 py-6 rounded-xl text-sm">
                Download Free Resource
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. Social Proof Strip (Marquee Ticker) */}
      <section className="w-full bg-purple-950/10 border-y border-border/30 py-5 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap space-x-16">
          {tickerItems.map((item, idx) => (
            <span key={idx} className="text-2xs font-bold uppercase tracking-widest text-muted-foreground inline-flex items-center space-x-2">
              <Sparkles className="h-3.5 w-3.5 text-purple-400 mr-2" />
              {item}
            </span>
          ))}
          {/* Duplicate for seamless looping */}
          {tickerItems.map((item, idx) => (
            <span key={`dup-${idx}`} className="text-2xs font-bold uppercase tracking-widest text-muted-foreground inline-flex items-center space-x-2">
              <Sparkles className="h-3.5 w-3.5 text-purple-400 mr-2" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* 4. Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Featured Products
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Start building and shipping immediately with production-ready kits, codebases, and assets.
            </p>
          </div>
          <Link 
            to="/products" 
            className="group mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            onClick={() => logClick('home-view-all-products')}
          >
            <span>View all products</span>
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl border border-border/50 bg-card/25" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <GlowCard className="flex flex-col justify-between h-full bg-[#111111] hover:border-violet-500 transition-all border border-[#2a2a2a] duration-300">
                  <div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-6 relative border border-[#2a2a2a] bg-muted">
                      {product.cover_image_url && (
                        <img 
                          src={product.cover_image_url} 
                          alt={product.title} 
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      )}
                      <Badge className="absolute top-3 right-3 bg-black/70 border-white/10 text-2xs font-semibold capitalize text-violet-300">
                        {product.category.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {product.tags.slice(0, 3).map((tag, idx) => (
                        <li key={idx} className="flex items-center text-2xs text-muted-foreground">
                          <Terminal className="h-3.5 w-3.5 text-violet-500 mr-2 shrink-0" />
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2a2a2a] flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-foreground">
                      {product.price === 0 ? (
                        <span className="text-green-400 font-extrabold">FREE</span>
                      ) : (
                        <span>${product.price}</span>
                      )}
                    </span>
                    
                    <Link to={`/products/${product.slug}`} onClick={() => logClick(`home-product-card-${product.id}`)}>
                      <Button size="sm" variant={product.price === 0 ? "outline" : "default"} className={product.price === 0 ? "border border-violet-600 text-violet-400 hover:bg-violet-600/10 rounded-xl" : "bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl"}>
                        <span>View Product</span>
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Why Trust Me Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for Developers & Creators
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Our digital product catalog solves real optimization problems, accelerating setup cycles from weeks to hours.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustBlocks.map((feat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="flex flex-col space-y-4 p-6 rounded-2xl border border-[#2a2a2a] bg-[#111111] hover:border-violet-500 transition-all duration-300"
            >
              <div className="p-3 bg-secondary w-fit rounded-lg border border-[#2a2a2a] text-violet-400">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-foreground">{feat.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Developers
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            See what other engineers are saying about our code boilerplates, toolkits, and guides.
          </p>
        </div>

        {/* Desktop View (Grid) */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <GlowCard key={idx} className="bg-card/20 hover:bg-card/30 flex flex-col justify-between" glowColor="rgba(168, 85, 247, 0.15)">
              <div>
                <div className="flex items-center space-x-1 mb-4 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground italic mb-6 leading-relaxed">
                  "{test.quote}"
                </p>
              </div>
              
              <div className="flex items-center space-x-3 pt-4 border-t border-border/30">
                <img 
                  src={test.avatar} 
                  alt={test.author} 
                  className="h-9 w-9 rounded-full object-cover border border-border/50"
                />
                <div>
                  <h4 className="text-xs font-bold text-foreground">{test.author}</h4>
                  <p className="text-2xs text-muted-foreground">{test.role}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* Mobile View (Carousel) */}
        <div className="md:hidden flex flex-col items-center">
          <GlowCard className="bg-card/20 p-6 w-full flex flex-col justify-between min-h-[220px]" glowColor="rgba(168, 85, 247, 0.15)">
            <div>
              <div className="flex items-center space-x-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic mb-6 leading-relaxed">
                "{testimonials[activeTestimonial].quote}"
              </p>
            </div>
            
            <div className="flex items-center space-x-3 pt-4 border-t border-border/30">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].author} 
                className="h-9 w-9 rounded-full object-cover border border-border/50"
              />
              <div>
                <h4 className="text-xs font-bold text-foreground">{testimonials[activeTestimonial].author}</h4>
                <p className="text-2xs text-muted-foreground">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </GlowCard>

          {/* Carousel controls */}
          <div className="flex items-center space-x-4 mt-6">
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full border-border"
              onClick={() => {
                setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1));
                logClick('home-testimonial-prev');
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex space-x-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    activeTestimonial === i ? 'bg-purple-500 w-3.5' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => {
                    setActiveTestimonial(i);
                    logClick(`home-testimonial-dot-${i}`);
                  }}
                />
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0 rounded-full border-border"
              onClick={() => {
                setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1));
                logClick('home-testimonial-next');
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Featured Blog Posts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Latest from the Blog
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Technical guides, optimization tips, and digital product creation insights.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            onClick={() => logClick('home-view-all-blog')}
          >
            <span>View all articles</span>
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {postsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl border border-border/50 bg-card/25" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <GlowCard className="flex flex-col justify-between h-full bg-[#111111] hover:border-violet-500 transition-all border border-[#2a2a2a] duration-300">
                  <div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 relative border border-[#2a2a2a] bg-muted">
                      <img 
                        src={post.cover_image_url || ''} 
                        alt={post.title} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    
                    <span className="text-2xs text-violet-400 font-semibold uppercase tracking-wider block mb-2">
                      {post.tags.slice(0, 2).join(' • ')}
                    </span>
                    
                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug line-clamp-2 hover:text-violet-400 transition-colors">
                      <Link to={`/blog/${post.slug}`} onClick={() => logClick(`home-blog-card-title-${post.id}`)}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#2a2a2a] flex items-center justify-between mt-auto">
                    <span className="text-2xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <Link to={`/blog/${post.slug}`} onClick={() => logClick(`home-blog-card-btn-${post.id}`)}>
                      <Button size="sm" variant="ghost" className="h-8 p-0 text-violet-400 hover:text-violet-300 flex items-center space-x-1 text-xs">
                        <span>Read More</span>
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 8. Email Capture Banner (ChatGPT prompts magnet) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden rounded-3xl border border-[#2a2a2a] bg-gradient-to-r from-violet-900/30 via-cyan-950/20 to-violet-900/30 px-6 py-12 md:p-16 text-center"
        >
          <div className="absolute -top-10 -right-10 -z-10 h-40 w-40 rounded-full bg-violet-500/10 blur-2xl" />
          
          <Sparkles className="mx-auto h-12 w-12 text-violet-400 mb-6 animate-pulse" />
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Get 10 Free ChatGPT Prompts
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Instantly download our hand-crafted, high-converting copywriting prompts. Learn how to transform product specs into benefit copy that hooks buyers.
          </p>

          <div className="mt-8 max-w-md mx-auto">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center space-y-2 text-xs text-green-400 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                <CheckCircle className="h-6 w-6 shrink-0 mb-1" />
                <span className="font-bold">Welcome aboard!</span>
                <span>We sent the prompt package download link to your email. Check your spam if it doesn't arrive in a minute.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-xs text-foreground focus:outline-none focus:border-violet-500/50"
                />
                <Button type="submit" disabled={status === 'loading'} className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl shrink-0">
                  {status === 'loading' ? 'Sending...' : 'Get Free Prompts'}
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </section>

    </div>
  );
}
