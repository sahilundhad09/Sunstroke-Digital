import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAnalytics } from '../../hooks/useAnalytics';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logClick } = useAnalytics();

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Blog', path: '/blog' },
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
              className="flex items-center space-x-2"
              onClick={() => logClick('nav-logo')}
            >
              <img
                src="/sunstroke_logo.jpg"
                alt="Sunstroke Digital Logo"
                className="h-8 w-8 rounded-lg object-cover border border-[#2a2a2a]"
              />
              <span className="text-sm font-extrabold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Sunstroke Digital
              </span>
            </Link>
          </div>

          {/* Links Center */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-semibold tracking-wide transition-colors hover:text-violet-400 ${
                    isActive ? 'text-violet-400 font-bold' : 'text-muted-foreground'
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
                `text-xs font-semibold px-2.5 py-1 rounded border border-[#2a2a2a] hover:bg-muted transition-colors ${
                  isActive ? 'bg-[#1a1a1a] text-violet-400 border-violet-500/50' : 'text-muted-foreground'
                }`
              }
              onClick={() => logClick('nav-link-admin')}
            >
              Admin
            </NavLink>
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
                `block px-3 py-2 rounded-md text-base font-medium transition-colors hover:bg-muted hover:text-violet-400 ${
                  isActive ? 'text-violet-400 bg-muted/50' : 'text-muted-foreground'
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
              className="text-sm font-medium text-muted-foreground hover:text-violet-400"
              onClick={() => {
                setIsOpen(false);
                logClick('nav-mobile-link-admin');
              }}
            >
              Admin Dashboard
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
