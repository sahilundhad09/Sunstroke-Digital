import { Terminal } from 'lucide-react';
import { GlowCard } from '../ui/GlowCard';

export function ProductCardSkeleton() {
  return (
    <GlowCard className="flex flex-col justify-between h-full bg-[#111111] border border-[#2a2a2a] animate-pulse">
      <div>
        {/* Image Aspect ratio placeholder */}
        <div className="aspect-video w-full rounded-lg mb-6 bg-muted/40 relative border border-[#2a2a2a] overflow-hidden" />
        
        {/* Title Placeholder */}
        <div className="h-6 w-3/4 rounded bg-muted/40 mb-3" />
        
        {/* Description Placeholders */}
        <div className="h-4 w-full rounded bg-muted/30 mb-2" />
        <div className="h-4 w-5/6 rounded bg-muted/30 mb-6" />

        {/* Feature Tags Placeholder */}
        <div className="space-y-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <Terminal className="h-3.5 w-3.5 text-violet-500/40 mr-2 shrink-0" />
              <div className="h-3.5 w-2/3 rounded bg-muted/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Button & Price Footer Placeholder */}
      <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
        <div className="h-6 w-16 rounded bg-muted/40" />
        <div className="h-9 w-28 rounded-lg bg-muted/40" />
      </div>
    </GlowCard>
  );
}

export function ProductGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="p-6 rounded-2xl border border-[#2a2a2a] bg-card/25 animate-pulse flex flex-col justify-between h-full">
      <div>
        <div className="h-4 w-24 rounded bg-muted/40 mb-4" />
        <div className="h-6 w-5/6 rounded bg-muted/40 mb-3" />
        <div className="h-4 w-full rounded bg-muted/30 mb-2" />
        <div className="h-4 w-4/5 rounded bg-muted/30 mb-6" />
      </div>
      <div className="flex items-center space-x-1.5 pt-4 border-t border-border/30">
        <div className="h-4 w-20 rounded bg-muted/40" />
      </div>
    </div>
  );
}

export function BlogGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 text-left space-y-12 animate-pulse">
      <div className="space-y-4">
        <div className="h-10 w-2/5 rounded-lg bg-muted/40" />
        <div className="h-5 w-3/5 rounded bg-muted/30" />
      </div>
      <div className="space-y-6">
        <div className="h-4 w-full rounded bg-muted/30" />
        <div className="h-4 w-full rounded bg-muted/30" />
        <div className="h-4 w-4/5 rounded bg-muted/30" />
      </div>
    </div>
  );
}
