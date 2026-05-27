import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useAnalytics } from '../hooks/useAnalytics';
import SEO from '../components/common/SEO';
import { ProductGridSkeleton } from '../components/common/LoadingSkeleton';

export default function Products() {
  const { products, loading } = useProducts();
  const { logClick } = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Dynamically extract active categories from published products
  const activeCategories = [
    'all',
    ...Array.from(new Set(products.filter(p => p.is_published).map(p => p.category).filter(Boolean)))
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products.filter(p => p.is_published)
    : products.filter(p => p.category === selectedCategory && p.is_published);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-left"
    >
      <SEO 
        title="Products Hub - Premium Digital Templates & Assets | Sunstroke Digital" 
        description="Deploy premium templates, launch boilerplates, and build your digital empire with vetted, high-quality development assets."
      />

      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Digital Products Hub
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Deploy premium templates, launch boilerplates, and build your digital empire with vetted, high-quality development assets.
        </p>
      </div>

      {/* Categories Filtering tabs */}
      {activeCategories.length > 2 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6 mb-10">
          <div className="flex flex-wrap gap-2">
            {activeCategories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? 'default' : 'outline'}
                className={selectedCategory === cat ? 'bg-violet-600 hover:bg-violet-700 text-white rounded-xl' : 'border-[#2a2a2a] text-muted-foreground hover:text-foreground rounded-xl capitalize'}
                onClick={() => {
                  setSelectedCategory(cat);
                  logClick(`products-filter-${cat}`);
                }}
              >
                {cat === 'all' ? 'All Products' : cat.replace('-', ' ')}
              </Button>
            ))}
          </div>
          <div className="flex items-center text-xs text-muted-foreground space-x-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Showing {filteredProducts.length} items</span>
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <ProductGridSkeleton count={6} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#2a2a2a] rounded-2xl bg-[#111111]/30">
          <Terminal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold text-foreground">No Products Found</h3>
          <p className="text-sm text-muted-foreground mt-2">Try selecting a different product category or check back later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const productTitleLower = (product.title || '').toLowerCase();
            const productSlugLower = (product.slug || '').toLowerCase();
            const displayPrice = productSlugLower === 'ats-resume-kit' || productTitleLower.includes('resume')
              ? 6
              : productSlugLower === '100-chatgpt-prompts' || productTitleLower.includes('chatgpt') || productTitleLower.includes('prompt')
                ? 15
                : product.price;

            let displayBullets = product.tags;
            if (productSlugLower === 'ats-resume-kit' || productTitleLower.includes('resume')) {
              displayBullets = [
                '5 ATS-Optimised Resume Templates for all job types',
                'Editable in Google Docs — no Canva or Word license needed',
                'Includes cover letter guide + interview tips'
              ];
            } else if (productSlugLower === '100-chatgpt-prompts' || productTitleLower.includes('chatgpt') || productTitleLower.includes('prompt')) {
              displayBullets = [
                '100 tested prompts across 5 content categories',
                'Works with ChatGPT (free), Claude AI, and Gemini',
                'Copy-paste ready — no prompt engineering needed'
              ];
            } else {
              displayBullets = (product.tags || []).slice(0, 3);
            }

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <GlowCard className="flex flex-col justify-between h-full bg-[#111111] hover:border-violet-500 transition-all border border-[#2a2a2a] duration-300">
                  <div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-6 relative border border-[#2a2a2a] bg-muted">
                      <img 
                        src={product.cover_image_url || ''} 
                        alt={product.title} 
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                      
                      {/* Price Badge */}
                      <div className="absolute bottom-3 left-3 bg-[#7C3AED] text-white text-xs font-semibold px-2.5 py-1 rounded-[20px] z-10 shadow-md">
                        {displayPrice === 0 ? 'FREE' : `$${displayPrice}`}
                      </div>

                      {(() => {
                        let displayCategory = product.category.replace('-', ' ');
                        let badgeStyle = {};
                        let badgeClass = "absolute top-3 right-3 bg-black/70 border-white/10 text-xs font-semibold capitalize text-violet-300";

                        if (productSlugLower === 'ats-resume-kit' || productTitleLower.includes('resume')) {
                          displayCategory = 'Resume Kit';
                          badgeStyle = { backgroundColor: '#1D9E75', color: '#ffffff' };
                          badgeClass = "absolute top-3 right-3 border-transparent text-xs font-semibold capitalize text-white";
                        } else if (productSlugLower === '100-chatgpt-prompts' || productTitleLower.includes('chatgpt') || productTitleLower.includes('prompt')) {
                          displayCategory = 'AI Prompts';
                          badgeStyle = { backgroundColor: '#7C3AED', color: '#ffffff' };
                          badgeClass = "absolute top-3 right-3 border-transparent text-xs font-semibold capitalize text-white";
                        }

                        return (
                          <Badge className={badgeClass} style={badgeStyle}>
                            {displayCategory}
                          </Badge>
                        );
                      })()}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {product.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {displayBullets.map((tag, idx) => (
                        <li key={idx} className="flex items-center text-xs text-muted-foreground">
                          <Terminal className="h-3.5 w-3.5 text-violet-500 mr-2 shrink-0" />
                          <span>{tag}</span>
                        </li>
                      ))}
                      <li className="text-2xs text-muted-foreground/60 italic pt-1 pl-1">
                        ... and more inside →
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#2a2a2a] flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-foreground">
                      {displayPrice === 0 ? (
                        <span className="text-green-400 font-extrabold">FREE</span>
                      ) : (
                        <span>${displayPrice}</span>
                      )}
                    </span>
                    
                    <Link to={`/products/${product.slug}`} onClick={() => logClick(`products-view-${product.id}`)}>
                      <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl flex items-center space-x-1 font-semibold">
                        <span>View & Buy</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
