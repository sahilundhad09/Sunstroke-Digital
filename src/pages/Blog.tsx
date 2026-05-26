import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Search, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '../hooks/useAnalytics';
import { useBlogPosts } from '../hooks/useBlogPosts';

export default function Blog() {
  const { logClick } = useAnalytics();
  const { posts, loading } = useBlogPosts();
  const [search, setSearch] = useState('');

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    (post.excerpt || '').toLowerCase().includes(search.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-left"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Technical Blog
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            Insights on SaaS architecture, frontend design systems, security practices, and product monetization.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-violet-500/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-2xl border border-[#2a2a2a] bg-card/25" />
          ))}
        </div>
      ) : (
        /* Grid of Blog Posts */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
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
                      src={post.cover_image_url || ''} 
                      alt={post.title} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-2xs bg-muted text-muted-foreground border-none">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 leading-snug hover:text-violet-400 transition-colors">
                    <Link to={`/blog/${post.slug}`} onClick={() => logClick(`blog-card-title-${post.id}`)}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {/* Post meta */}
                <div className="pt-4 border-t border-[#2a2a2a] flex items-center justify-between mt-auto text-2xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(post.created_at)}
                    </span>
                  </div>

                  <Link to={`/blog/${post.slug}`} onClick={() => logClick(`blog-card-read-${post.id}`)}>
                    <Button size="sm" variant="ghost" className="h-7 p-0 text-violet-400 hover:text-violet-300 flex items-center space-x-1">
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

      {/* No articles state */}
      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-20 border border-dashed border-[#2a2a2a] rounded-2xl bg-card/5">
          <Terminal className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold text-foreground">No Articles Found</h3>
          <p className="text-sm text-muted-foreground mt-2">No results matched "{search}".</p>
        </div>
      )}
    </motion.div>
  );
}
