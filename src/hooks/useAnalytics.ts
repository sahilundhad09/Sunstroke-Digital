import {
  trackPageView,
  trackProductView,
  trackCheckoutClick,
  trackAffiliateClick,
  trackLeadCapture
} from '../lib/analytics';

export const useAnalytics = () => {
  // Compatibility helper for general clicks
  const logClick = (elementId: string, metadata?: Record<string, any>) => {
    if (import.meta.env.DEV) {
      console.log(`[Analytics Click] ${elementId}`, metadata);
    }
  };

  return {
    trackPageView,
    trackProductView,
    trackCheckoutClick,
    trackAffiliateClick,
    trackLeadCapture,
    logClick
  };
};
