import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Affiliates from './pages/Affiliates';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FreeLead from './pages/FreeLead';
import About from './pages/About';
import Admin from './pages/Admin';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './lib/analytics';

function AnalyticsTracker({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location.pathname, location.search]);

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AnalyticsTracker>
        <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-purple-500/30 selection:text-purple-200">
          <Navbar />
          <main className="flex-grow">
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
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AnalyticsTracker>
    </BrowserRouter>
  );
}
