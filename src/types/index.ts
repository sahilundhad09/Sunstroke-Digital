// ============================================================
// TypeScript interfaces matching the Supabase database schema
// ============================================================

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description?: string;
  price: number;
  currency: string;
  checkout_url?: string;
  cover_image_url?: string;
  preview_images: string[];
  category: 'ai-tools' | 'resume' | 'other';
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
}

export interface Affiliate {
  id: string;
  name: string;
  description?: string;
  logo_url?: string;
  affiliate_url: string;
  category?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: 'product_view' | 'checkout_click' | 'affiliate_click' | 'page_view' | 'lead_capture';
  entity_id?: string;
  entity_type?: 'product' | 'affiliate';
  session_id?: string;
  referrer?: string;
  user_agent?: string;
  country?: string;
  created_at?: string;
}

export interface Lead {
  id: string;
  email: string;
  name?: string;
  source?: string;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  cover_image_url?: string;
  tags: string[];
  is_published: boolean;
  created_at?: string;
}

export interface AdminSetting {
  id: string;
  key: string;
  value?: string;
}
