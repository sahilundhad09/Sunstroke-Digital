import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Terminal, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnalytics } from '../../hooks/useAnalytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logClick } = useAnalytics();

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
    { name: 'Affiliates', path: '/affiliates' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Left */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-bold tracking-tight text-foreground hover:opacity-90 transition-opacity"
              onClick={() => logClick('nav-logo')}
            >
              <Terminal className="h-6 w-6 text-purple-500" />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Sunstroke Digital</span>
            </Link>
          </div>

          {/* Nav Links Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-purple-400 ${
                    isActive ? 'text-purple-400 font-semibold' : 'text-muted-foreground'
                  }`
                }
                onClick={() => logClick(`nav-link-${link.name.toLowerCase()}`)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* CTA & Admin Right */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-xs font-semibold px-2.5 py-1 rounded border border-border/60 hover:bg-muted transition-colors ${
                  isActive ? 'bg-muted text-purple-400 border-purple-500/50' : 'text-muted-foreground'
                }`
              }
              onClick={() => logClick('nav-link-admin')}
            >
              Admin
            </NavLink>
            <Link to="/free" onClick={() => logClick('nav-cta-freebie')}>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white font-medium group">
                <span>Get Free Resource</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted hover:text-purple-400 ${
                  isActive ? 'text-purple-400 bg-muted/50' : 'text-muted-foreground'
                }`
              }
              onClick={() => {
                setIsOpen(false);
                logClick(`nav-mobile-link-${link.name.toLowerCase()}`);
              }}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="border-t border-border/40 my-3 pt-3 flex flex-col space-y-3 px-3">
            <NavLink
              to="/admin"
              className="text-sm font-medium text-muted-foreground hover:text-purple-400"
              onClick={() => {
                setIsOpen(false);
                logClick('nav-mobile-link-admin');
              }}
            >
              Admin Dashboard
            </NavLink>
            <Link 
              to="/free" 
              onClick={() => {
                setIsOpen(false);
                logClick('nav-mobile-cta-freebie');
              }}
              className="w-full"
            >
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-center">
                <span>Get Free Resource</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
