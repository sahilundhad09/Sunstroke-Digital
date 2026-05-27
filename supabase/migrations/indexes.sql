-- 1. Indexing Products table for fast slug and category lookups
CREATE UNIQUE INDEX IF NOT EXISTS products_slug_idx ON public.products(slug);
CREATE INDEX IF NOT EXISTS products_published_created_idx ON public.products(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS products_category_published_idx ON public.products(category, is_published);

-- 2. Indexing Blog Posts table for fast slug and publication checks
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_idx ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS blog_posts_published_created_idx ON public.blog_posts(is_published, created_at DESC);

-- 3. Indexing Affiliates table for published lists
CREATE INDEX IF NOT EXISTS affiliates_published_idx ON public.affiliates(is_published);
