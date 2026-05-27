import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './lib/analytics';
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageSkeleton } from './components/common/LoadingSkeleton';

// Code split routes with React.lazy()
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Affiliates = lazy(() => import('./pages/Affiliates'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const FreeLead = lazy(() => import('./pages/FreeLead'));
const About = lazy(() => import('./pages/About'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AnalyticsTracker({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return <>{children}</>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnalyticsTracker>
          <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-200">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<PageSkeleton />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/affiliates" element={<Affiliates />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/free" element={<FreeLead />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </AnalyticsTracker>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
