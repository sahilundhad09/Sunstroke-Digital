import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SEO from '../components/common/SEO';

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center text-center px-4 py-16 space-y-6 relative overflow-hidden">
      <SEO 
        title="404 - Page Not Found | Sunstroke Digital" 
        description="The page you are looking for does not exist or has been moved."
      />
      
      {/* Decorative gradient blur background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-violet-600/10 blur-3xl opacity-50 pointer-events-none" />

      <div className="p-4 bg-violet-500/10 rounded-full border border-violet-500/20 text-violet-400">
        <Compass className="h-12 w-12 animate-[spin_8s_linear_infinite]" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-6xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Lost in Space?
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you requested could not be found. It might have been moved, deleted, or the URL might be mistyped.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link to="/">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold px-6 py-5 flex items-center w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Homepage</span>
          </Button>
        </Link>
        
        <Link to="/products">
          <Button variant="outline" className="border border-[#2a2a2a] text-foreground hover:bg-muted rounded-xl font-semibold px-6 py-5 w-full sm:w-auto">
            <span>Explore Products</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
