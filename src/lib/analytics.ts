import { supabase } from './supabase';

// Generate or retrieve session ID from localStorage
export const getSessionId = (): string => {
  let sessionId = localStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Track generic page view
export const trackPageView = (page: string) => {
  const sessionId = getSessionId();
  supabase.from('analytics_events').insert({
    event_type: 'page_view',
    page_path: page,
    session_id: sessionId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      console.error('trackPageView error:', error);
    }
  });
};

// Track product detail page view
export const trackProductView = (productId: string, productTitle: string) => {
  const sessionId = getSessionId();
  supabase.from('analytics_events').insert({
    event_type: 'product_view',
    entity_id: productId,
    entity_type: 'product',
    session_id: sessionId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    metadata: { product_title: productTitle }
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      console.error('trackProductView error:', error);
    }
  });
};

// Track purchase checkout button click
export const trackCheckoutClick = (productId: string, checkoutUrl: string) => {
  const sessionId = getSessionId();
  supabase.from('analytics_events').insert({
    event_type: 'checkout_click',
    entity_id: productId,
    entity_type: 'product',
    session_id: sessionId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    metadata: { checkout_url: checkoutUrl }
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      console.error('trackCheckoutClick error:', error);
    }
  });
};

// Track external affiliate recommendation link click
export const trackAffiliateClick = (affiliateId: string, affiliateUrl: string) => {
  const sessionId = getSessionId();
  supabase.from('analytics_events').insert({
    event_type: 'affiliate_click',
    entity_id: affiliateId,
    entity_type: 'affiliate',
    session_id: sessionId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    metadata: { affiliate_url: affiliateUrl }
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      console.error('trackAffiliateClick error:', error);
    }
  });
};

// Track successful lead capture form signups
export const trackLeadCapture = (email: string, source: string) => {
  const sessionId = getSessionId();
  supabase.from('analytics_events').insert({
    event_type: 'lead_capture',
    session_id: sessionId,
    referrer: document.referrer || null,
    user_agent: navigator.userAgent,
    metadata: { email, source }
  }).then(({ error }) => {
    if (error && import.meta.env.DEV) {
      console.error('trackLeadCapture error:', error);
    }
  });
};
