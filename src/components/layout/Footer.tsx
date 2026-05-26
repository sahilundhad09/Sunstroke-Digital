import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

export default function Footer() {
  const { logClick } = useAnalytics();

  return (
    <footer className="w-full border-t border-border/40 bg-background/50 py-12 mt-auto text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Section 1: Logo & Tagline */}
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-lg font-bold"
              onClick={() => logClick('footer-logo')}
            >
              <Terminal className="h-5 w-5 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Sunstroke Digital</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              High-converting digital assets, production-ready boilerplates, and developer templates built for creators.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* Pinterest */}
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-red-500 transition-colors"
                title="Pinterest"
                onClick={() => logClick('footer-social-pinterest')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.289 2C6.617 2 2 6.617 2 12.289c0 4.305 2.651 8.01 6.446 9.585-.09-.8-.172-2.038.037-2.919l1.682-7.116s-.43-.86-.43-2.133c0-2 .115-3.5 1.5-3.5 1.417 0 2.102 1.064 2.102 2.338 0 1.425-.907 3.556-1.378 5.534-.391 1.65.823 3 2.45 3 2.94 0 5.2-3.1 5.2-7.575 0-3.96-2.846-6.728-6.907-6.728-4.707 0-7.47 3.53-7.47 7.18 0 1.42.548 2.943 1.232 3.77a.4.4 0 0 1 .093.385l-.462 1.884c-.075.308-.248.375-.57.225-2.115-.983-3.435-4.08-3.435-6.567 0-5.348 3.885-10.26 11.2-10.26 5.88 0 10.455 4.19 10.455 9.8 0 5.842-3.682 10.545-8.79 10.545-1.717 0-3.33-.892-3.88-1.937l-1.058 4.032c-.383 1.467-1.425 3.31-2.122 4.453C9.524 23.83 10.742 24 12 24c5.671 0 10.289-4.617 10.289-10.289C22.289 6.617 17.671 2 12.289 2z" />
                </svg>
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-pink-500 transition-colors"
                title="Instagram"
                onClick={() => logClick('footer-social-instagram')}
              >
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Reddit */}
              <a 
                href="https://reddit.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                title="Reddit"
                onClick={() => logClick('footer-social-reddit')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485.07.07.166.108.263.108h16.444c.097 0 .193-.038.263-.108C22.657 18.314 24 15.314 24 12c0-6.627-5.373-12-12-12zm6.07 15.228c-.18.18-.465.18-.645 0-1.344-1.344-3.535-1.344-4.88 0-.09.09-.207.135-.325.135s-.236-.045-.325-.135c-.18-.18-.18-.465 0-.645 1.7-1.7 4.485-1.7 6.185 0 .18.18.18.465 0 .645zm-1.808-3.328c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1zm-8.524 0c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z" />
                </svg>
              </a>
              {/* GitHub */}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-muted-foreground hover:text-white transition-colors"
                title="GitHub"
                onClick={() => logClick('footer-social-github')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Section 2: Products */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">Products</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-products-all')}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=ai-tools" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-products-ai')}>
                  AI Prompt Kits
                </Link>
              </li>
              <li>
                <Link to="/products?category=resume" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-products-resume')}>
                  Resume Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-blog')}>
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link to="/free" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-freebie')}>
                  Free Resources & Prompts
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-about')}>
                  About the Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: Connect & Admin */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">Connect</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/affiliates" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-affiliates')}>
                  Recommendations & Tools
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-purple-400 transition-colors" onClick={() => logClick('footer-link-admin')}>
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center">
          <p className="text-2xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Sunstroke Digital. All rights reserved. Built with React, Tailwind CSS, and Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
