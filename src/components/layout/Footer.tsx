import { Link } from 'react-router-dom';
import { useAnalytics } from '../../hooks/useAnalytics';
import { useProducts } from '../../hooks/useProducts';

export default function Footer() {
  const { logClick } = useAnalytics();
  const { products } = useProducts();
  
  // Get active published products to display in the footer
  const footerProducts = products.filter(p => p.is_published).slice(0, 4);

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
              <img src="/sunstroke_logo.jpg" alt="Sunstroke Digital Logo" className="h-6 w-6 rounded-md object-cover border border-[#2a2a2a]" />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Sunstroke Digital</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              High-converting digital assets, production-ready boilerplates, and developer templates built for creators.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {/* Pinterest */}
              <a
                href="https://in.pinterest.com/sahilundhad09/"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
                title="Pinterest"
                onClick={() => logClick('footer-social-pinterest')}
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.03.397 2.138.893 2.738.098.119.112.224.083.342l-.333 1.36c-.053.22-.172.269-.401.162-1.499-.696-2.435-2.89-2.435-4.651 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.022 12.017.022z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/sunstroke09/"
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
                href="https://www.reddit.com/user/Adventurous-Law4162/"
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
                href="https://github.com/sahilundhad09"
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
              {footerProducts.length > 0 ? (
                footerProducts.map(p => (
                  <li key={p.id}>
                    <Link
                      to={`/products/${p.slug}`}
                      className="text-muted-foreground hover:text-violet-400 transition-colors"
                      onClick={() => logClick(`footer-link-product-${p.slug}`)}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link to="/products" className="text-muted-foreground hover:text-violet-400 transition-colors" onClick={() => logClick('footer-link-products-all')}>
                    All Products
                  </Link>
                </li>
              )}
              {footerProducts.length > 0 && (
                <li className="pt-1">
                  <Link to="/products" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors" onClick={() => logClick('footer-link-products-all')}>
                    View All Products &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Section 3: Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-violet-400 transition-colors" onClick={() => logClick('footer-link-blog')}>
                  Technical Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-violet-400 transition-colors" onClick={() => logClick('footer-link-about')}>
                  About the Developer
                </Link>
              </li>
            </ul>
          </div>

          {/* Section 4: System */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 font-heading">System</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/admin" className="text-muted-foreground hover:text-violet-400 transition-colors" onClick={() => logClick('footer-link-admin')}>
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
