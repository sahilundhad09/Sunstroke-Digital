import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '../hooks/useProducts';
import { useAnalytics } from '../hooks/useAnalytics';

export default function Products() {
  const { products, loading } = useProducts();
  const { logClick } = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { label: 'All Products', value: 'all' },
    { label: 'AI Tools', value: 'ai-tools' },
    { label: 'Resume & Portfolio', value: 'resume' },
    { label: 'Other', value: 'other' },
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
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Digital Products Hub
        </h1>
        <p className="mt-4 text-base text-muted-foreground">
          Deploy premium templates, launch boilerplates, and build your digital empire with vetted, high-quality development assets.
        </p>
      </div>

      {/* Categories Filtering tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat.value}
              size="sm"
              variant={selectedCategory === cat.value ? 'default' : 'outline'}
              className={selectedCategory === cat.value ? 'bg-violet-600 hover:bg-violet-700 text-white rounded-xl' : 'border-[#2a2a2a] text-muted-foreground hover:text-foreground rounded-xl'}
              onClick={() => {
                setSelectedCategory(cat.value);
                logClick(`products-filter-${cat.value}`);
              }}
            >
              {cat.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground space-x-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>Showing {filteredProducts.length} items</span>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-96 w-full animate-pulse rounded-2xl border border-[#2a2a2a] bg-card/25" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
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
                    />
                    <Badge className="absolute top-3 right-3 bg-black/70 border-white/10 text-xs font-semibold capitalize text-violet-300">
                      {product.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {product.tags.map((tag, idx) => (
                      <li key={idx} className="flex items-center text-xs text-muted-foreground">
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
                  
                  <Link to={`/products/${product.slug}`} onClick={() => logClick(`products-view-${product.id}`)}>
                    <Button size="sm" variant={product.price === 0 ? "outline" : "default"} className={product.price === 0 ? "border border-violet-600 text-violet-400 hover:bg-violet-600/10 rounded-xl" : "bg-violet-600 hover:bg-violet-700 text-white rounded-xl"}>
                      <span>View Product</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* No results state */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[#2a2a2a] rounded-2xl bg-card/5">
          <Terminal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold text-foreground">No Products Found</h3>
          <p className="text-sm text-muted-foreground mt-2">Try selecting a different product category.</p>
        </div>
      )}
    </motion.div>
  );
}
