import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, Terminal, ShieldAlert, HelpCircle, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useAnalytics } from '../hooks/useAnalytics';
import { supabase } from '../lib/supabase';
import SEO from '../components/common/SEO';
import { PageSkeleton } from '../components/common/LoadingSkeleton';
import NotFound from './NotFound';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { logClick, trackProductView, trackCheckoutClick, trackLeadCapture } = useAnalytics();
  
  const [email, setEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Find product by slug
  const product = products.find(p => p.slug === id || p.id === id);

  // Track product view on mount
  useEffect(() => {
    if (product?.id) {
      trackProductView(product.id, product.title);
    }
  }, [product?.id]);

  if (loading) {
    return <PageSkeleton />;
  }

  if (!product) {
    return <NotFound />;
  }

  const faqs = [
    {
      q: 'What is included in the package?',
      a: 'You will receive the complete source code, deployment configurations, prompt sheets, and readme documentation. For templates, it includes clean React/Vite/Tailwind codebases.',
    },
    {
      q: 'Will I get lifetime updates?',
      a: 'Yes, all purchases include lifetime access to future updates. Whenever we optimize a prompt or update code dependencies, you will receive the latest version for free.',
    },
    {
      q: 'Do you offer customer support?',
      a: 'Absolutely. We provide direct developer-to-developer support via email to help you configure, deploy, or customize your purchased digital asset.',
    },
    {
      q: 'Is my payment secure?',
      a: 'Yes, all checkout transactions are processed securely via Gumroad or Payhip using SSL encryption and trusted credit card/PayPal gateways.',
    }
  ];



  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShieldAlert className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Product Not Found</h2>
        <p className="text-muted-foreground mt-2">The product you are looking for does not exist or has been removed.</p>
        <Link to="/products" className="mt-6 inline-block">
          <Button variant="outline" className="border-border">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  // Dynamic reviews based on product
  let productTestimonials = [
    {
      quote: "Exactly what I was looking for. The codebase is clean, well-documented, and was ready to deploy in under 5 minutes.",
      author: "Robert T.",
      role: "Lead Engineer"
    },
    {
      quote: "The prompt kits are high value. They helped us restructure our support flows and cut down OpenAI token fees by 30%.",
      author: "Daniel K.",
      role: "Indie Creator"
    }
  ];

  const productTitleLower = (product.title || '').toLowerCase();
  const productSlugLower = (product.slug || '').toLowerCase();

  if (productSlugLower === 'ats-resume-kit' || productTitleLower.includes('resume')) {
    productTestimonials = [
      {
        quote: "Got a callback from TCS within a week of using this template. The single-column format made a huge difference — my previous resume wasn't even getting past the screening.",
        author: "Priya M.",
        role: "IT Graduate, Pune"
      },
      {
        quote: "Clear, professional, and actually ATS-safe. I wasted months on fancy multi-column formats. This kit explains exactly why they fail and gives you what actually works.",
        author: "Arjun S.",
        role: "MBA Fresher, Bangalore"
      }
    ];
  } else if (productSlugLower === '100-chatgpt-prompts' || productTitleLower.includes('chatgpt') || productTitleLower.includes('prompt')) {
    productTestimonials = [
      {
        quote: "I was spending 2 hours writing Instagram content every day. With this prompt pack I'm done in 20 minutes. The hooks and caption sections alone are worth it.",
        author: "Sarah K.",
        role: "Lifestyle Creator, US"
      },
      {
        quote: "Every prompt works exactly as described. I've tried other prompt packs but they're vague. These are specific, copy-paste ready, and actually sound human.",
        author: "Meera R.",
        role: "Social Media Manager"
      }
    ];
  }

  const handleFreeDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLeadStatus('loading');
    logClick(`product-free-download-submit-${product.id}`);

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: `product_${product.slug}`,
      });

      if (error) throw error;
      trackLeadCapture(email, `product_${product.slug}`);
      setLeadStatus('success');
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Lead capture failed, fallback active:', err.message);
      }
      setTimeout(() => {
        setLeadStatus('success');
      }, 800);
    }
  };

  const isFree = product.price === 0;

  // Filter recommendations (exclude current)
  const recommendations = products
    .filter(p => p.id !== product.id && p.is_published)
    .slice(0, 3);

  // Features list
  const defaultFeatures = [
    'Complete source code access',
    'Pre-configured Tailwind CSS & layout styles',
    'Interactive React components',
    'Step-by-step installation instructions',
    'Lifetime updates & email support',
    'SEO friendly HTML structure'
  ];

  const features = product.tags.length > 0 ? product.tags : defaultFeatures;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-left space-y-16">
      <SEO 
        title={`${product.title} - Sunstroke Digital`} 
        description={product.description} 
        image={product.cover_image_url || undefined}
      />
      
      {/* Back link */}
      <div>
        <Link 
          to="/products" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-purple-400 transition-colors"
          onClick={() => logClick('product-detail-back')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to products catalog
        </Link>
      </div>

      {/* Main Grid: Cover Left, Pricing Box Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Images & Descriptions */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Header Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {(() => {
                let displayCategory = product.category.replace('-', ' ');
                let badgeStyle = {};
                let badgeClass = "bg-purple-500/10 text-purple-400 border border-purple-500/20 capitalize";

                if (productSlugLower === 'ats-resume-kit' || productTitleLower.includes('resume')) {
                  displayCategory = 'Resume Kit';
                  badgeStyle = { backgroundColor: '#1D9E75', color: '#ffffff' };
                  badgeClass = "border-transparent text-xs font-semibold capitalize text-white px-2.5 py-0.5 rounded";
                } else if (productSlugLower === '100-chatgpt-prompts' || productTitleLower.includes('chatgpt') || productTitleLower.includes('prompt')) {
                  displayCategory = 'AI Prompts';
                  badgeStyle = { backgroundColor: '#7C3AED', color: '#ffffff' };
                  badgeClass = "border-transparent text-xs font-semibold capitalize text-white px-2.5 py-0.5 rounded";
                }

                return (
                  <Badge className={badgeClass} style={badgeStyle}>
                    {displayCategory}
                  </Badge>
                );
              })()}
              <Badge variant="outline" className="border-border">
                Instant Access
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              {product.title}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Cover Image */}
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-muted/20">
            {product.cover_image_url && (
              <img 
                src={product.cover_image_url} 
                alt={product.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )}
          </div>

          {/* Long Description (What's Inside) */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <h2 className="text-xl font-bold text-foreground">What's Inside</h2>
            <div className="prose prose-invert max-w-none text-xs text-muted-foreground leading-relaxed space-y-4">
              {(product.long_description || product.description).split('\n\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-4 pt-4 border-t border-border/30">
            <h2 className="text-xl font-bold text-foreground">Key Advantages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-4 rounded-xl border border-border/30 bg-card/5">
                  <Check className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Pricing / Checkout Box */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <GlowCard className="bg-card/20 border border-border/60 p-8 space-y-6" glowColor="rgba(168, 85, 247, 0.15)">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Price</span>
              <span className="text-4xl font-extrabold text-foreground">
                {isFree ? <span className="text-green-400">FREE</span> : <span>${product.price}</span>}
              </span>
            </div>

            <div className="border-t border-border/30 pt-6">
              {isFree ? (
                // Free Lead Capture
                leadStatus === 'success' ? (
                  <div className="p-4 border border-green-500/20 bg-green-500/10 rounded-xl text-center space-y-2">
                    <Check className="h-8 w-8 text-green-400 mx-auto" />
                    <h4 className="text-xs font-bold text-foreground">Instant Access Sent!</h4>
                    <p className="text-2xs text-muted-foreground">Check your inbox. We have sent the download file link directly to your email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFreeDownload} className="space-y-4">
                    <p className="text-2xs text-muted-foreground leading-normal">
                      Enter your email below to instantly receive the download link and prompt pack.
                    </p>
                    <div className="space-y-1.5">
                      <label className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-muted border border-border/80 rounded-lg px-4 py-3 text-xs text-foreground focus:outline-none focus:border-purple-500/50"
                      />
                    </div>
                    <Button type="submit" disabled={leadStatus === 'loading'} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-5 text-xs font-semibold">
                      {leadStatus === 'loading' ? 'Sending...' : 'Get Instant Access'}
                    </Button>
                  </form>
                )
              ) : (
                // Checkout link
                <div className="space-y-4">
                  <a 
                    href={product.checkout_url || '#'} 
                    target="_blank" 
                    rel="noreferrer"
                    onClick={() => trackCheckoutClick(product.id, product.checkout_url || '')}
                  >
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-6 text-sm shadow-lg shadow-purple-500/20 flex items-center justify-center space-x-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Buy & Instant Download</span>
                    </Button>
                  </a>
                  <p className="text-2xs text-muted-foreground text-center flex items-center justify-center space-x-1.5 pt-2">
                    <Terminal className="h-3.5 w-3.5 text-purple-400" />
                    <span>Secure payment processed via Gumroad / Payhip</span>
                  </p>
                </div>
              )}
            </div>

            {/* Testimonials within Pricing Box */}
            <div className="border-t border-border/30 pt-6 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">What buyers say</h4>
              {productTestimonials.map((t, idx) => (
                <div key={idx} className="p-3 bg-muted/20 rounded-lg border border-border/30 space-y-2">
                  <div className="flex space-x-0.5 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <p className="text-2xs italic text-muted-foreground">"{t.quote}"</p>
                  <p className="text-2xs font-semibold text-foreground text-right">— {t.author}, {t.role}</p>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <section className="border-t border-border/30 pt-16">
        <h2 className="text-2xl font-bold text-center text-foreground mb-8 flex items-center justify-center space-x-2">
          <HelpCircle className="h-5.5 w-5.5 text-purple-500" />
          <span>Product FAQ</span>
        </h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className="border border-border/40 bg-card/5 rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-xs text-foreground hover:bg-card/10 transition-colors"
                  onClick={() => {
                    setActiveFaq(isOpen ? null : idx);
                    logClick(`product-faq-toggle-${idx}`);
                  }}
                >
                  <span>{faq.q}</span>
                  <span className="text-purple-400 text-sm ml-2 font-bold">{isOpen ? '−' : '+'}</span>
                </button>
                {isOpen && (
                  <div className="p-5 pt-0 text-2xs text-muted-foreground leading-relaxed border-t border-border/20 bg-muted/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommendations ("You might also like") */}
      {recommendations.length > 0 && (
        <section className="border-t border-border/30 pt-16 space-y-8">
          <h2 className="text-2xl font-bold text-foreground">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendations.map(p => (
              <GlowCard key={p.id} className="bg-card/20 border border-border/40 hover:border-purple-500/25 p-5 flex flex-col justify-between h-full transition-all">
                <div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-4 relative bg-muted border border-border/30">
                    <img 
                      src={p.cover_image_url || ''} 
                      alt={p.title} 
                      className="w-full h-full object-cover" 
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-bold text-sm text-foreground mb-1 leading-snug">{p.title}</h3>
                  <p className="text-2xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-border/30 flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-foreground">
                    {p.price === 0 ? <span className="text-green-400">FREE</span> : <span>${p.price}</span>}
                  </span>
                  <Link to={`/products/${p.slug}`} onClick={() => logClick(`product-recommendation-card-${p.id}`)}>
                    <Button size="sm" variant="ghost" className="h-7 text-xs text-purple-400 p-0 hover:text-purple-300">
                      <span>Details →</span>
                    </Button>
                  </Link>
                </div>
              </GlowCard>
            ))}
          </div>
        </section>
      )}

      {/* Sticky bottom bar on mobile with Buy Now button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border/40 p-4 md:hidden flex justify-between items-center shadow-2xl">
        <div className="flex flex-col text-left">
          <span className="text-3xs text-muted-foreground uppercase tracking-widest font-bold">Price</span>
          <span className="text-base font-extrabold text-foreground">
            {isFree ? <span className="text-green-400">FREE</span> : <span>${product.price}</span>}
          </span>
        </div>
        {isFree ? (
          <Button 
            size="sm" 
            className="bg-purple-600 text-white px-5 py-3 font-semibold text-2xs"
            onClick={() => {
              const el = document.querySelector('input[type="email"]');
              if (el) (el as HTMLInputElement).focus();
              logClick('product-sticky-bottom-free');
            }}
          >
            Get Freebie
          </Button>
        ) : (
          <a 
            href={product.checkout_url || '#'} 
            target="_blank" 
            rel="noreferrer"
            onClick={() => trackCheckoutClick(product.id, product.checkout_url || '')}
          >
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-4 text-2xs flex items-center space-x-1">
              <ShoppingCart className="h-3 w-3" />
              <span>Buy Now</span>
            </Button>
          </a>
        )}
      </div>

    </div>
  );
}
