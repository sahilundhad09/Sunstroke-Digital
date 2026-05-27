import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Shield, Zap, Sparkles, Star, ArrowUpRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useAnalytics } from '../hooks/useAnalytics';
import SEO from '../components/common/SEO';
import { ProductGridSkeleton, BlogGridSkeleton } from '../components/common/LoadingSkeleton';

export default function Home() {
  const { products, loading: productsLoading } = useProducts();
  const { posts, loading: postsLoading } = useBlogPosts();
  const { logClick } = useAnalytics();





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





  // Filter featured products
  const featuredProducts = products.filter(p => p.is_featured && p.is_published).slice(0, 3);
  
  // Filter latest blog posts
  const latestPosts = posts.slice(0, 3);

  // Dynamic product cover images for the hero preview
  const previewImages = products
    .filter(p => p.cover_image_url && p.is_published)
    .map(p => p.cover_image_url)
    .concat([
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60'
    ])
    .slice(0, 2);

  return (
    <div className="flex flex-col space-y-24 pb-20 overflow-hidden text-left">
      <SEO />
      
      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-12 md:pt-20 md:pb-16 border-b border-border/10">
        {/* Floating animated gradient backdrops */}
        <div className="absolute top-1/4 left-1/2 -z-10 h-[320px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px] animate-pulse duration-[8000ms]" />
        <div className="absolute top-1/3 left-1/3 -z-10 h-[280px] w-[450px] rounded-full bg-cyan-500/10 blur-[110px] animate-pulse duration-[6000ms]" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-5"
        >
          {/* Product Cover Image Thumbnails */}
          <div className="flex justify-center items-center gap-3 pb-3">
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src || ''}
                alt={`Product preview ${index + 1}`}
                className="w-[120px] aspect-video object-cover rounded-[12px] border border-white/15 shadow-xl"
              />
            ))}
          </div>

          <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-3 py-1 hover:bg-violet-500/20 mx-auto select-none">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 inline text-cyan-400" />
            Skip Configuration Hell & Launch Instantly
          </Badge>
          
          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl leading-tight sm:leading-none">
            Premium Digital Products for{' '}
            <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Creators, Job Seekers & Go-Getters
            </span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base leading-relaxed">
            Instant-download templates, AI prompt kits, and digital tools — built for people who want real results without the hassle.
          </p>

          <div className="flex justify-center pt-2">
            <Link to="/products" onClick={() => logClick('hero-cta-browse')}>
              <Button size="lg" className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-500/20 px-8 py-5 rounded-xl text-sm">
                Browse Products
                <ArrowRight className="ml-2 h-4 w-4" />
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
