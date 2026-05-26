-- ============================================================
-- Sunstroke Digital — Complete Supabase Database Schema
-- Run this in the Supabase SQL Editor to bootstrap all tables,
-- indexes, RLS policies, and seed data.
-- ============================================================

-- ============================================================
-- 1. PRODUCTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  long_description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  checkout_url TEXT,                          -- Gumroad / Payhip link
  cover_image_url TEXT,
  preview_images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'other'
    CHECK (category IN ('ai-tools', 'resume', 'other')),
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_is_published ON public.products (is_published);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Public can only read published products
CREATE POLICY "products_public_read"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

-- Authenticated admin can do everything
CREATE POLICY "products_admin_all"
  ON public.products FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);


-- ============================================================
-- 2. AFFILIATES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  logo_url TEXT,
  affiliate_url TEXT NOT NULL,
  category TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliates_is_published ON public.affiliates (is_published);

ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- Public can only read published affiliates
CREATE POLICY "affiliates_public_read"
  ON public.affiliates FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

-- Authenticated admin can do everything
CREATE POLICY "affiliates_admin_all"
  ON public.affiliates FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);


-- ============================================================
-- 3. ANALYTICS EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL
    CHECK (event_type IN (
      'product_view', 'checkout_click', 'affiliate_click',
      'page_view', 'lead_capture'
    )),
  entity_id UUID,                             -- product id or affiliate id
  entity_type TEXT                             -- 'product' or 'affiliate'
    CHECK (entity_type IS NULL OR entity_type IN ('product', 'affiliate')),
  session_id TEXT,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events (event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_entity ON public.analytics_events (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics_events (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_session_id ON public.analytics_events (session_id);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT analytics events (no auth required)
CREATE POLICY "analytics_public_insert"
  ON public.analytics_events FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

-- Only authenticated admin can read analytics
CREATE POLICY "analytics_admin_read"
  ON public.analytics_events FOR SELECT
  TO authenticated
  USING (TRUE);

-- Admin can delete old events for cleanup
CREATE POLICY "analytics_admin_delete"
  ON public.analytics_events FOR DELETE
  TO authenticated
  USING (TRUE);


-- ============================================================
-- 4. LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT,                                -- which page they signed up from
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT leads (public signup forms)
CREATE POLICY "leads_public_insert"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (TRUE);

-- Only authenticated admin can read/manage leads
CREATE POLICY "leads_admin_all"
  ON public.leads FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "leads_admin_update"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

CREATE POLICY "leads_admin_delete"
  ON public.leads FOR DELETE
  TO authenticated
  USING (TRUE);


-- ============================================================
-- 5. BLOG POSTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,                               -- markdown content
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts (slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_is_published ON public.blog_posts (is_published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON public.blog_posts (created_at DESC);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can only read published blog posts
CREATE POLICY "blog_posts_public_read"
  ON public.blog_posts FOR SELECT
  TO anon, authenticated
  USING (is_published = TRUE);

-- Authenticated admin can do everything
CREATE POLICY "blog_posts_admin_all"
  ON public.blog_posts FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);


-- ============================================================
-- 6. ADMIN SETTINGS (key-value store)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT
);

ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated admin can access settings
CREATE POLICY "admin_settings_admin_all"
  ON public.admin_settings FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);


-- ============================================================
-- 7. SEED DATA — Sample Products
-- ============================================================
INSERT INTO public.products (title, slug, description, long_description, price, currency, checkout_url, cover_image_url, category, tags, is_featured, is_published)
VALUES
  (
    'AI Resume Builder',
    'ai-resume-builder',
    'Generate ATS-optimized resumes in seconds using AI. Tailored for tech professionals and developers.',
    'Stop spending hours formatting your resume. Our AI Resume Builder analyzes job descriptions and generates perfectly tailored, ATS-friendly resumes. Built with GPT-4o, it understands technical roles and highlights the skills recruiters are scanning for.',
    29,
    'USD',
    'https://payhip.com/b/mock-ai-resume',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
    'ai-tools',
    ARRAY['AI', 'Resume', 'Career', 'GPT'],
    TRUE,
    TRUE
  ),
  (
    'Developer Portfolio Template',
    'developer-portfolio-template',
    'A stunning, dark-themed portfolio template built with React, Tailwind CSS, and Framer Motion. Deploy in minutes.',
    'Make a lasting first impression. This portfolio template features smooth page transitions, glassmorphic UI elements, project showcases with live demos, an integrated blog section, and full mobile responsiveness. Perfect for freelancers, indie hackers, and senior engineers.',
    19,
    'USD',
    'https://payhip.com/b/mock-portfolio',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    'resume',
    ARRAY['Portfolio', 'React', 'Template', 'Tailwind'],
    TRUE,
    TRUE
  ),
  (
    'SaaS Copywriting Ebook',
    'saas-copywriting-ebook',
    'A comprehensive copywriting framework specifically tailored for developers who want to write landing pages that sell.',
    'Stop losing visitors to boring copy. This ebook teaches you how to translate technical features into clear benefits, write high-converting headlines, structure social proof, and design compelling calls-to-action.',
    0,
    'USD',
    NULL,
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60',
    'other',
    ARRAY['Copywriting', 'Marketing', 'Ebook', 'Free'],
    FALSE,
    TRUE
  );


-- ============================================================
-- 8. SEED DATA — Sample Affiliates
-- ============================================================
INSERT INTO public.affiliates (name, description, logo_url, affiliate_url, category, is_featured, is_published)
VALUES
  (
    'Vercel',
    'The platform for frontend developers. Deploy Next.js and React apps with zero configuration.',
    'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
    'https://vercel.com/?ref=sunstroke',
    'Hosting',
    TRUE,
    TRUE
  ),
  (
    'Supabase',
    'The open source Firebase alternative. Build production-grade applications with a Postgres database, Auth, and Edge Functions.',
    'https://supabase.com/brand-assets/supabase-logo-icon.png',
    'https://supabase.com/?ref=sunstroke',
    'Backend',
    TRUE,
    TRUE
  );


-- ============================================================
-- 9. SEED DATA — Sample Blog Posts
-- ============================================================
INSERT INTO public.blog_posts (title, slug, excerpt, content, cover_image_url, tags, is_published)
VALUES
  (
    'How to Structure Supabase RLS Policies for SaaS Products',
    'supabase-rls-saas',
    'A step-by-step security blueprint to lock down user data, allow administrative writes, and support billing webhook syncs safely.',
    E'Row Level Security (RLS) is one of Supabase''s strongest features, yet it is where most developers make critical security mistakes.\n\n## Establishing the Base Configuration\n\nBy default, always enable RLS on any new table:\n\n```sql\nALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;\n```\n\n## Rule 1: Private User Tables\n\nFor profiles, settings, or subscriptions, match the authenticated user''s ID:\n\n```sql\nCREATE POLICY "Users can manage their own profile"\n  ON public.user_profiles\n  FOR ALL\n  TO authenticated\n  USING (auth.uid() = id)\n  WITH CHECK (auth.uid() = id);\n```\n\n## Rule 2: Administrative Access\n\nTo allow admin roles, check user roles in custom JWT metadata:\n\n```sql\nCREATE POLICY "Admins can view all records"\n  ON public.user_profiles\n  FOR SELECT\n  TO authenticated\n  USING (auth.jwt() ->> ''role'' = ''admin'');\n```\n\nUsing these patterns guarantees data containment while maintaining application scalability.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    ARRAY['Database', 'Security', 'SaaS'],
    TRUE
  ),
  (
    'Migrating to Tailwind CSS v4: Core Changes and Benefits',
    'tailwind-v4-guide',
    'An inspection of Tailwind CSS v4 CSS-first configuration engines, lightning-fast compiler builds, and new features.',
    E'Tailwind CSS v4 introduces a complete rewrite focusing on performance and a CSS-first configuration approach.\n\n## Key Differences\n\n- **CSS-First Configuration**: Instead of `tailwind.config.js`, everything is configured using CSS variables and `@theme` directives.\n- **Lightning CSS Compiler**: Builds are up to 10x faster thanks to Rust-based tooling.\n- **Dynamic Utility Generation**: Color opacities and variations are generated dynamically.\n\n## Standard Setup\n\n```css\n@import "tailwindcss";\n\n@theme {\n  --color-brand: #a855f7;\n  --font-display: "Outfit", sans-serif;\n}\n```\n\nThis eliminates Javascript transpilation overhead for configurations.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    ARRAY['CSS', 'Frontend', 'Tailwind'],
    TRUE
  ),
  (
    'The Developer-to-Creator Sales Copywriting Formula',
    'sales-copywriting-devs',
    'How to translate technical repository specs into compelling benefit copy that convinces developers to pull out their wallets.',
    E'Most developers fail at marketing because they sell features, not results.\n\n## The Formula\n\n1. **The Headline**: Address the core problem immediately. (e.g. "Ship your SaaS this weekend, not next month.")\n2. **The Pain**: Remind them of configuration hell.\n3. **The Solution**: Frame your product as the shortcut.\n4. **The Benefits**: Translate features into outcomes.\n   - *Feature*: React Router v6 code splitting.\n   - *Benefit*: High SEO scores and minimal page load time.\n\nMastering this transition converts technical authority into digital product sales.',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60',
    ARRAY['Marketing', 'Copywriting', 'Indie-Hacker'],
    TRUE
  );


-- ============================================================
-- 10. SEED DATA — Default Admin Settings
-- ============================================================
INSERT INTO public.admin_settings (key, value)
VALUES
  ('site_name', 'Sunstroke Digital'),
  ('site_tagline', 'Premium digital products for developers'),
  ('admin_email', 'admin@sunstrokedigital.com'),
  ('analytics_enabled', 'true');
