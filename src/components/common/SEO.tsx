import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  canonical?: string;
}

export default function SEO({ 
  title = "Sunstroke Digital - Digital Products to Build & Ship", 
  description = "Premium templates, SaaS boilerplates, content hubs, and digital assets designed to help you skip configuration hell and bring your ideas to life.", 
  image = "/sunstroke_logo.jpg", 
  type = "website",
  canonical
}: SEOProps) {
  const location = useLocation();

  useEffect(() => {
    // 1. Update Page Title
    document.title = title;

    // 2. Helper to set/update meta tag
    const setMetaTag = (name: string, content: string, attrName: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attrName}="${name}"]`);
      if (element) {
        element.setAttribute('content', content);
      } else {
        element = document.createElement('meta');
        element.setAttribute(attrName, name);
        element.setAttribute('content', content);
        document.head.appendChild(element);
      }
    };

    // 3. Helper to set/update canonical link tag
    const setCanonicalLink = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (element) {
        element.setAttribute('href', href);
      } else {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        element.setAttribute('href', href);
        document.head.appendChild(element);
      }
    };

    // 4. Update standard meta tags
    setMetaTag('description', description);

    // 5. Update Open Graph (OG) tags for Facebook/Pinterest sharing
    setMetaTag('og:title', title, 'property');
    setMetaTag('og:description', description, 'property');
    setMetaTag('og:image', image.startsWith('http') ? image : window.location.origin + image, 'property');
    setMetaTag('og:type', type, 'property');
    setMetaTag('og:url', window.location.href, 'property');

    // Pinterest specific tags
    setMetaTag('og:site_name', 'Sunstroke Digital', 'property');

    // 6. Update Canonical URL
    const canonicalUrl = canonical || window.location.origin + location.pathname;
    setCanonicalLink(canonicalUrl);
  }, [title, description, image, type, canonical, location.pathname]);

  return null;
}
