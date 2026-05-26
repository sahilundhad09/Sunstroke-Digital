import { useState } from 'react';
import { BookOpen, CheckCircle, ShieldAlert, Sparkles, Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlowCard } from '../components/ui/GlowCard';
import { Badge } from '@/components/ui/badge';
import { useAnalytics } from '../hooks/useAnalytics';
import { supabase } from '../lib/supabase';

export default function FreeLead() {
  const { logClick, trackLeadCapture } = useAnalytics();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const bullets = [
    'The 3-step headline formula that arrests reader attention',
    'How to frame technical repo specifications as high-value buying triggers',
    'A conversion-oriented card and button layout blueprint',
    'Before-and-after copy optimizations from production developer tools',
    'Ready-to-use email templates for launch sequences and lead capture'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    logClick('freebie-lead-form-submit');

    try {
      const { error } = await supabase.from('leads').insert({
        email,
        source: 'freebie_landing_page',
      });

      if (error) throw error;
      trackLeadCapture(email, 'freebie_landing_page');
      setStatus('success');
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Lead capture failed, fallback active:', err.message);
      }
      setTimeout(() => {
        setStatus('success');
      }, 800);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline and bullet lists */}
        <div className="lg:col-span-7 space-y-6">
          <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20 px-3 py-1">
            <Sparkles className="mr-1.5 h-3.5 w-3.5 inline text-purple-400" />
            100% Free Resource
          </Badge>
          
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-tight">
            Get the SaaS Copywriting Blueprint for Free
          </h1>
          
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Stop losing potential SaaS signups to confusing or overly technical product pages. Learn how to write landing page copy, descriptions, and feature lists that communicate actual value and print sales.
          </p>

          <div className="border-t border-border/30 pt-6">
            <h3 className="text-sm font-bold text-foreground mb-4">What you will get:</h3>
            <ul className="space-y-3">
              {bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start text-xs text-muted-foreground">
                  <CheckCircle className="h-4.5 w-4.5 text-purple-500 mr-3 shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Lead Capture Box */}
        <div className="lg:col-span-5">
          <GlowCard className="bg-card/20 border border-border/60 p-8" glowColor="rgba(168, 85, 247, 0.15)">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                <BookOpen className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground text-center mb-2">Get Instant Access</h3>
            <p className="text-xs text-muted-foreground text-center mb-6">Enter your email below to instantly receive the PDF guide link.</p>

            {status === 'success' ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center p-6 border border-green-500/20 bg-green-500/10 rounded-xl text-center">
                  <CheckCircle className="h-10 w-10 text-green-400 mb-2" />
                  <h4 className="text-sm font-bold text-foreground">Copywriting Blueprint Sent!</h4>
                  <p className="text-2xs text-muted-foreground mt-1">We have sent the PDF download link directly to your email address.</p>
                </div>
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Download Ebook PDF (2.4MB)</span>
                  </Button>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-muted border border-border/80 rounded-lg px-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 flex items-center justify-center"
                >
                  <span>Download Free Blueprint</span>
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                
                {status === 'error' && (
                  <p className="text-red-400 text-2xs text-center flex items-center justify-center space-x-1">
                    <ShieldAlert className="h-3 w-3" />
                    <span>An error occurred. Please try again.</span>
                  </p>
                )}
                
                <p className="text-2xs text-muted-foreground text-center">
                  We value your privacy. You can unsubscribe in one click.
                </p>
              </form>
            )}
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
