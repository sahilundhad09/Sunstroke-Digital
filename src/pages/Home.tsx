import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { ArrowRight, Terminal, Shield, Zap, Sparkles, Star, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, ShoppingBag, BookOpen, Wrench, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAffiliates } from '../hooks/useAffiliate';
import { useAnalytics } from '../hooks/useAnalytics';
import SEO from '../components/common/SEO';
import { ProductGridSkeleton, BlogGridSkeleton } from '../components/common/LoadingSkeleton';

export default function Home() {
  const { products, loading: productsLoading } = useProducts();
  const { posts, loading: postsLoading } = useBlogPosts();
  const { affiliates, loading: affiliatesLoading } = useAffiliates();
  const { logClick, trackAffiliateClick } = useAnalytics();

  const [activeTab, setActiveTab] = React.useState<'products' | 'blog' | 'affiliates'>('products');
  const [isHovered, setIsHovered] = React.useState(false);

  const tickerItems = [
    'Instant Lifetime Download',
    'Works with Google Docs & Canva',
    '500+ Happy Customers',
    '4.9 Star Average',
    'New Products Every Month',
    'Secure Payment via Gumroad & Payhip',
    'Featured on Pinterest & Reddit',
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

  // Cycle tabs automatically every 6.5s if not hovered
  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab(prev => {
        if (prev === 'products') return 'blog';
        if (prev === 'blog') return 'affiliates';
        return 'products';
      });
    }, 6500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Filter featured products
  const featuredProducts = products.filter(p => p.is_featured && p.is_published).slice(0, 3);
  
  // Filter latest blog posts
  const latestPosts = posts.slice(0, 3);

  // Filter top affiliates
  const topAffiliates = affiliates.slice(0, 3);

  // Fallbacks if data loading or empty
  const fallbackProduct = {
    title: 'SaaS Launchpad Template',
    description: 'NextJS, TailwindCSS, Supabase & Stripe. Build, launch & scale your SaaS in a weekend.',
    cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    price: 39,
    tags: ['NextJS', 'Supabase', 'Stripe'],
    slug: 'saas-launchpad-template'
  };

  const fallbackPost = {
    title: 'Unlocking Lighthouse 100/100 Scores on React Apps',
    excerpt: 'Detailed analysis of bundling, lazy loading, font optimization, and layout shifts strategies that matter.',
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    created_at: new Date().toISOString(),
    tags: ['NextJS', 'Performance'],
    slug: 'unlocking-lighthouse-scores'
  };

  const fallbackAffiliate = {
    name: 'Vercel Edge Hosting',
    description: 'Deploy web projects with zero configuration. Global edge network, automatic CI/CD integrations & previews.',
    logo_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
    category: 'hosting',
    affiliate_url: 'https://vercel.com'
  };

  const activeProduct = featuredProducts[0] || fallbackProduct;
  const activePost = latestPosts[0] || fallbackPost;
  const activeAffiliate = topAffiliates[0] || fallbackAffiliate;

  return (
    <div className="flex flex-col space-y-24 pb-20 overflow-hidden text-left">
      <SEO />
      
      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-20 border-b border-border/10">
        {/* Floating animated gradient backdrops */}
        <div className="absolute top-1/4 left-1/4 -z-10 h-[380px] w-[500px] rounded-full bg-violet-600/10 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/3 right-1/4 -z-10 h-[340px] w-[450px] rounded-full bg-cyan-500/10 blur-[110px] animate-pulse duration-[6000ms]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headlines & Action */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 space-y-6 flex flex-col items-start text-left"
            >
              <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 hover:bg-violet-500/20 select-none">
                <Sparkles className="mr-1.5 h-3.5 w-3.5 inline text-cyan-400 animate-spin-slow" />
                Skip Configuration Hell & Launch Instantly
              </Badge>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight">
                Premium Digital Assets for{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  Modern Creators
                </span>
              </h1>
              
              <p className="text-base text-muted-foreground sm:text-lg leading-relaxed max-w-xl">
                Ready-to-use developer templates, conversion-optimized prompt kits, insightful tech articles, and vetted affiliate recommendations to build faster.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                <Link to="/products" onClick={() => logClick('hero-cta-browse')}>
                  <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-500/25 px-8 py-6 rounded-xl text-sm">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/affiliates" onClick={() => logClick('hero-cta-resources')}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border border-[#2a2a2a] hover:bg-muted text-foreground font-semibold px-8 py-6 rounded-xl text-sm">
                    Vetted Resources
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Magical Interactive Showcase Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="lg:col-span-6 w-full"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative mx-auto w-full max-w-[580px]">
                {/* Glow backdrop behind the widget */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-violet-600/20 via-cyan-500/10 to-purple-600/20 blur-3xl scale-105" />

                {/* Dashboard-like Widget Container */}
                <div className="border border-white/10 rounded-2xl bg-[#111111]/85 backdrop-blur-xl shadow-2xl p-5 overflow-hidden">
                  
                  {/* Top Bar Tabs */}
                  <div className="flex bg-[#1a1a1a]/80 p-1.5 rounded-xl border border-white/5 gap-1 mb-5">
                    <button
                      onClick={() => setActiveTab('products')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all relative ${
                        activeTab === 'products' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {activeTab === 'products' && (
                        <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-violet-600/20 border border-violet-500/30 rounded-lg" />
                      )}
                      <ShoppingBag className="h-3.5 w-3.5 text-violet-400" />
                      <span>Products</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('blog')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all relative ${
                        activeTab === 'blog' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {activeTab === 'blog' && (
                        <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-fuchsia-600/20 border border-fuchsia-500/30 rounded-lg" />
                      )}
                      <BookOpen className="h-3.5 w-3.5 text-fuchsia-400" />
                      <span>Blog Articles</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('affiliates')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all relative ${
                        activeTab === 'affiliates' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {activeTab === 'affiliates' && (
                        <motion.div layoutId="activeTabGlow" className="absolute inset-0 bg-cyan-600/20 border border-cyan-500/30 rounded-lg" />
                      )}
                      <Wrench className="h-3.5 w-3.5 text-cyan-400" />
                      <span>Vetted Resources</span>
                    </button>
                  </div>

                  {/* Active Card Body Wrapper */}
                  <div className="relative overflow-hidden h-[300px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {activeTab === 'products' && (
                        <motion.div
                          key="products-preview"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/5 bg-[#161616]">
                              <img
                                src={activeProduct.cover_image_url}
                                alt={activeProduct.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 border border-white/10 text-[9px] font-bold text-violet-300">
                                featured product
                              </div>
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground line-clamp-1">{activeProduct.title}</h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                {activeProduct.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {activeProduct.tags.slice(0, 3).map((t, i) => (
                                <Badge key={i} variant="outline" className="text-[10px] py-0 border-white/5 text-muted-foreground bg-white/5 capitalize">
                                  {t}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-base font-black text-white">
                              {activeProduct.price === 0 ? <span className="text-green-400">FREE</span> : `$${activeProduct.price}`}
                            </span>
                            <Link to={`/products/${(activeProduct as any).slug || ''}`}>
                              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-semibold px-4">
                                View Product
                                <ArrowRight className="ml-1.5 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'blog' && (
                        <motion.div
                          key="blog-preview"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-xl border border-white/5 bg-[#161616]">
                              <img
                                src={activePost.cover_image_url}
                                alt={activePost.title}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                              />
                              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 border border-white/10 text-[9px] font-bold text-fuchsia-300">
                                latest article
                              </div>
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground line-clamp-1 hover:text-fuchsia-400 transition-colors">
                                <Link to={`/blog/${activePost.slug}`}>{activePost.title}</Link>
                              </h3>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                {activePost.excerpt}
                              </p>
                            </div>
                            <div className="flex items-center text-[10px] text-muted-foreground gap-1.5">
                              <Calendar className="h-3 w-3 text-fuchsia-400" />
                              <span>{new Date(activePost.created_at || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">
                              {activePost.tags?.slice(0, 1).join('') || 'Development'}
                            </span>
                            <Link to={`/blog/${activePost.slug}`}>
                              <Button size="sm" variant="outline" className="border-fuchsia-500/20 hover:bg-fuchsia-500/10 text-fuchsia-400 rounded-lg text-xs font-semibold px-4">
                                Read Post
                                <ArrowUpRight className="ml-1.5 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      )}

                      {activeTab === 'affiliates' && (
                        <motion.div
                          key="affiliates-preview"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ duration: 0.25 }}
                          className="w-full h-full flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4 bg-white/5 border border-white/5 p-4 rounded-xl">
                              {activeAffiliate.logo_url ? (
                                <img
                                  src={activeAffiliate.logo_url}
                                  alt={activeAffiliate.name}
                                  className="h-12 w-12 rounded-lg object-contain bg-white/5 border border-[#2a2a2a] p-1"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-lg bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400">
                                  <Wrench className="h-6 w-6" />
                                </div>
                              )}
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-base font-bold text-foreground">{activeAffiliate.name}</h3>
                                  <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[9px] font-semibold uppercase tracking-wider scale-90 origin-left">
                                    {activeAffiliate.category}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-0.5">Vetted affiliates & platforms recommendation</p>
                              </div>
                            </div>

                            <div className="pt-2">
                              <h4 className="text-xs font-bold text-white mb-1">Why I recommend this:</h4>
                              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                                {activeAffiliate.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-white/5">
                            <span className="text-[10px] text-muted-foreground italic">
                              *Partner recommendations
                            </span>
                            <a
                              href={activeAffiliate.affiliate_url}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => trackAffiliateClick((activeAffiliate as any).id || 'fa1', activeAffiliate.affiliate_url)}
                            >
                              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold px-4 flex items-center gap-1.5">
                                <span>Check it out</span>
                                <ExternalLink className="h-3 w-3" />
                              </Button>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
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
          <ProductGridSkeleton count={3} />
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#2a2a2a] rounded-2xl bg-[#111111]/30">
            <p className="text-sm text-muted-foreground">No featured products available at the moment.</p>
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
                          loading="lazy"
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
          <BlogGridSkeleton count={3} />
        ) : latestPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#2a2a2a] rounded-2xl bg-[#111111]/30">
            <p className="text-sm text-muted-foreground">No articles published yet. Check back soon!</p>
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
                        loading="lazy"
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



    </div>
  );
}
