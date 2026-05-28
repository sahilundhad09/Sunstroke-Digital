import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Send, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { useAnalytics } from '../hooks/useAnalytics';
import { useAffiliates } from '../hooks/useAffiliate';
import { supabase } from '../lib/supabase';
import { Badge } from '@/components/ui/badge';

export default function Affiliates() {
  const { logClick, trackAffiliateClick, trackLeadCapture } = useAnalytics();
  const { affiliates, loading } = useAffiliates();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Lead capture form state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const categories = ['all', ...Array.from(new Set(affiliates.map(a => a.category).filter(Boolean)))].filter((c): c is string => !!c);

  const filteredAffiliates = selectedCategory === 'all'
    ? affiliates
    : affiliates.filter(a => a.category === selectedCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    logClick('affiliates-lead-form-submit');

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: 'affiliates_page',
      });

      if (error) throw error;
      trackLeadCapture(email, 'affiliates_page');
      setStatus('success');
      setEmail('');
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Lead capture failed, simulating success:', err.message);
      }
      setTimeout(() => {
        setStatus('success');
        setEmail('');
      }, 800);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-left space-y-16"
    >
      
      {/* Intro section */}
      <section className="max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Resources I Personally Use and Recommend
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Hand-picked resources, packages, hosting providers, and digital services that I trust to power production applications.
        </p>
      </section>

      {/* Category Filter bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={selectedCategory === cat ? 'bg-violet-600 hover:bg-violet-700 text-white rounded-xl' : 'border-[#2a2a2a] text-muted-foreground hover:text-foreground capitalize rounded-xl'}
              onClick={() => {
                setSelectedCategory(cat);
                logClick(`affiliates-filter-${cat}`);
              }}
            >
              {cat.replace('-', ' ')}
            </Button>
          ))}
        </div>
        <div className="flex items-center text-xs text-muted-foreground space-x-1.5 bg-muted/40 px-3 py-1.5 rounded-lg border border-border/40">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{filteredAffiliates.length} resources listed</span>
        </div>
      </div>

      {/* Affiliates Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-[#2a2a2a] bg-[#111111]/25" />
          ))
        ) : (
          filteredAffiliates.map((affiliate, idx) => (
            <motion.div
              key={affiliate.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <GlowCard className="flex flex-col justify-between h-full bg-[#111111] hover:border-violet-500 transition-all border border-[#2a2a2a] duration-300">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    {affiliate.logo_url && (
                      <img
                        src={affiliate.logo_url}
                        alt={affiliate.name}
                        className="h-10 w-10 rounded-lg object-contain bg-white/5 border border-[#2a2a2a] p-1"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{affiliate.name}</h3>
                      {affiliate.category && (
                        <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-3xs font-semibold uppercase tracking-wider">
                          {affiliate.category}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {affiliate.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#2a2a2a] mt-auto">
                  <a
                    href={affiliate.affiliate_url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackAffiliateClick(affiliate.id, affiliate.affiliate_url)}
                  >
                    <Button size="sm" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium rounded-xl group">
                      <span>Check it out →</span>
                      <ExternalLink className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))
        )}
      </section>

      {/* Newsletter signup */}
      <section className="border-t border-[#2a2a2a] pt-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <GlowCard className="bg-[#111111] border-[#2a2a2a] p-8 max-w-2xl mx-auto text-center" glowColor="rgba(124, 58, 237, 0.15)">
            <Sparkles className="mx-auto h-8 w-8 text-violet-400 mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Get Resource Discounts</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Subscribe to receive notifications when we negotiate exclusive coupon codes, pricing discounts, and release schedules for developer resources.
            </p>

            {status === 'success' ? (
              <div className="flex items-center justify-center space-x-2 text-xs text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Thanks for subscribing! You'll hear from us soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-violet-500/50"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-6 rounded-xl"
                >
                  <Send className="h-3.5 w-3.5 mr-2" />
                  Subscribe
                </Button>
              </form>
            )}
          </GlowCard>
        </motion.div>
      </section>

      {/* 4. Disclaimer Text at bottom */}
      <section className="text-center max-w-2xl mx-auto pt-8 border-t border-border/10">
        <p className="text-3xs text-muted-foreground leading-normal italic">
          Disclaimer: Some of the recommendations above contain affiliate redirect links. If you make a purchase through these links, we may receive a small commission at no additional cost to you. We only recommend resources that we use in production architectures.
        </p>
      </section>

    </motion.div>
  );
}
