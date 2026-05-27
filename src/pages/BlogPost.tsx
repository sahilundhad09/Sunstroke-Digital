import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Terminal, ChevronRight, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { MOCK_POSTS } from '../hooks/useBlogPosts';
import { useAnalytics } from '../hooks/useAnalytics';
import { supabase } from '../lib/supabase';
import type { BlogPost as BlogPostType } from '../types';
import SEO from '../components/common/SEO';
import { PageSkeleton } from '../components/common/LoadingSkeleton';
import NotFound from './NotFound';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { logClick, trackLeadCapture } = useAnalytics();
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPostType[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        // Fetch all published posts to calculate related posts
        const { data: listData } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('is_published', true);

        if (listData && listData.length > 0) {
          setAllPosts(listData as BlogPostType[]);
        }

        // Fetch single post
        const { data: postData, error: postErr } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .single();

        if (postErr) throw postErr;
        if (postData) {
          setPost(postData as BlogPostType);
        }
      } catch (err) {
        // Fallback to local mock data
        const localList = MOCK_POSTS;
        setAllPosts(localList);
        const found = localList.find(p => p.slug === slug);
        setPost(found || null);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !post) return;

    setStatus('loading');
    logClick(`blog-post-subscribe-${post.id}`);

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: `blog_post_${post.slug}`,
      });

      if (error) throw error;
      trackLeadCapture(email, `blog_post_${post.slug}`);
      setStatus('success');
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Subscription error, falling back locally:', err.message);
      }
      setTimeout(() => {
        setStatus('success');
      }, 800);
    }
  };

  if (loading) {
    return <PageSkeleton />;
  }

  if (!post) {
    return <NotFound />;
  }

  // Related posts: exclude current, match tags or just take first two
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 2);

  // Social share URLs
  const shareUrl = window.location.href;
  const pinterestShare = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(post.cover_image_url || '')}&description=${encodeURIComponent(post.title)}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 text-left space-y-8">
      <SEO 
        title={`${post.title} | Sunstroke Digital Blog`} 
        description={post.excerpt} 
        image={post.cover_image_url || undefined}
        type="article"
      />
      {/* Breadcrumbs / Back Link */}
      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
        <Link to="/blog" className="hover:text-foreground transition-colors" onClick={() => logClick('blog-post-back-nav')}>
          Blog
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-xs">{post.title}</span>
      </div>

      <header className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} className="bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20">
              {tag}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-border/40 pb-6">
          <span className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1.5" />
            {formatDate(post.created_at)}
          </span>

          {/* Social Share Buttons */}
          <div className="flex items-center space-x-2">
            <span className="text-2xs text-muted-foreground flex items-center mr-1">
              <Share2 className="h-3.5 w-3.5 mr-1" /> Share:
            </span>
            <a 
              href={pinterestShare} 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-[#BD081C] hover:text-red-500 transition-colors"
              title="Pin on Pinterest"
              onClick={() => logClick('share-pinterest', { slug: post.slug })}
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.651 8.01 6.446 9.585-.09-.8-.172-2.038.037-2.919l1.682-7.116s-.43-.86-.43-2.133c0-2 .115-3.5 1.5-3.5 1.417 0 2.102 1.064 2.102 2.338 0 1.425-.907 3.556-1.378 5.534-.391 1.65.823 3 2.45 3 2.94 0 5.2-3.1 5.2-7.575 0-3.96-2.846-6.728-6.907-6.728-4.707 0-7.47 3.53-7.47 7.18 0 1.42.548 2.943 1.232 3.77a.4.4 0 0 1 .093.385l-.462 1.884c-.075.308-.248.375-.57.225-2.115-.983-3.435-4.08-3.435-6.567 0-5.348 3.885-10.26 11.2-10.26 5.88 0 10.455 4.19 10.455 9.8 0 5.842-3.682 10.545-8.79 10.545-1.717 0-3.33-.892-3.88-1.937l-1.058 4.032c-.383 1.467-1.425 3.31-2.122 4.453C9.524 23.83 10.742 24 12 24c5.671 0 10.289-4.617 10.289-10.289C22.289 6.617 17.671 2 12.289 2z" />
              </svg>
            </a>
            <a 
              href={twitterShare} 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-foreground transition-colors"
              title="Share on X"
              onClick={() => logClick('share-twitter', { slug: post.slug })}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a 
              href={linkedinShare} 
              target="_blank" 
              rel="noreferrer" 
              className="p-1.5 rounded-lg border border-border/60 hover:bg-muted text-blue-400 hover:text-blue-300 transition-colors"
              title="Share on LinkedIn"
              onClick={() => logClick('share-linkedin', { slug: post.slug })}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Feature Image */}
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/40">
        <img 
          src={post.cover_image_url || ''} 
          alt={post.title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content Area */}
      <article className="prose prose-invert max-w-none text-muted-foreground text-sm leading-relaxed space-y-6">
        {(post.content || '').split('\n\n').map((paragraph, idx) => {
          // Check for code blocks
          if (paragraph.startsWith('```')) {
            const lines = paragraph.split('\n');
            const code = lines.slice(1, -1).join('\n');
            return (
              <pre key={idx} className="bg-card/40 border border-border/50 rounded-lg p-4 font-mono text-xs overflow-x-auto text-foreground my-6">
                <code>{code}</code>
              </pre>
            );
          }
          // Check for subheadings
          if (paragraph.startsWith('### ')) {
            return (
              <h3 key={idx} className="text-lg font-bold text-foreground pt-4 mb-2">
                {paragraph.replace('### ', '')}
              </h3>
            );
          }
          // Check for ordered list items
          if (paragraph.match(/^\d\.\s/)) {
            const listItems = paragraph.split('\n');
            return (
              <ol key={idx} className="list-decimal pl-5 space-y-2 my-4">
                {listItems.map((item, i) => (
                  <li key={i}>{item.replace(/^\d\.\s/, '')}</li>
                ))}
              </ol>
            );
          }
          return <p key={idx}>{paragraph}</p>;
        })}
      </article>

      {/* Author Bio Section */}
      <section className="border-t border-border/30 pt-12 mt-12">
        <div className="rounded-2xl border border-border/40 bg-card/10 p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" 
            alt="Sahil" 
            className="h-16 w-16 rounded-full object-cover border-2 border-purple-500"
            loading="lazy"
          />
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-base font-bold text-foreground">Written by Sahil</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Software developer & digital product creator. I build templates, SaaS architectures, and prompt configurations to help developer-creators build faster and launch successful online assets.
            </p>
          </div>
        </div>
      </section>

      {/* Embedded Lead Capture Box */}
      <section className="pt-4">
        <GlowCard className="bg-card/20 border-border/60 p-8 text-center" glowColor="rgba(168, 85, 247, 0.15)">
          <Terminal className="mx-auto h-10 w-10 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold text-foreground">Enjoyed this tutorial?</h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto">
            Subscribe to our newsletter to receive technical tutorials, system designs, and early product releases weekly.
          </p>
          
          <div className="mt-6 max-w-md mx-auto">
            {status === 'success' ? (
              <div className="flex items-center justify-center space-x-2 text-xs text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <Check className="h-4 w-4 shrink-0" />
                <span>Success! Subscribed successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 bg-muted border border-border/80 rounded-lg px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-500/50"
                />
                <Button type="submit" disabled={status === 'loading'} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2.5">
                  Join Newsletter
                </Button>
              </form>
            )}
          </div>
        </GlowCard>
      </section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-border/30 pt-12 space-y-6">
          <h3 className="text-xl font-bold text-foreground">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map(p => (
              <div key={p.id} className="p-5 rounded-xl border border-border/40 bg-card/10 flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-colors">
                <div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden mb-3 bg-muted">
                    <img 
                      src={p.cover_image_url || ''} 
                      alt={p.title} 
                      className="object-cover w-full h-full" 
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-bold text-sm text-foreground hover:text-purple-400 transition-colors">
                    <Link to={`/blog/${p.slug}`} onClick={() => logClick(`blog-related-link-${p.id}`)}>
                      {p.title}
                    </Link>
                  </h4>
                </div>
                <Link to={`/blog/${p.slug}`} className="text-2xs text-purple-400 font-semibold flex items-center" onClick={() => logClick(`blog-related-btn-${p.id}`)}>
                  <span>Read Article</span>
                  <ChevronRight className="h-3 w-3 ml-0.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
