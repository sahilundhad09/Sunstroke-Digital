import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types';

export const MOCK_POSTS: BlogPost[] = [
  {
    id: 'supabase-rls-saas',
    title: 'How to Structure Supabase RLS Policies for SaaS Products',
    slug: 'supabase-rls-saas',
    excerpt: 'A step-by-step security blueprint to lock down user data, allow administrative writes, and support billing webhook syncs safely.',
    content: `Row Level Security (RLS) is one of Supabase's strongest features, yet it is where most developers make critical security mistakes. When building a SaaS, you need to support distinct authorization rules:

1. Users should only read/write their own records.
2. Admins should view aggregated data.
3. Automated Stripe webhooks must insert transaction data without logging in as a user.

### Establishing the Base Configuration
By default, always enable RLS on any new table. If you forget this, any database client can select, update, or delete records.

\`\`\`sql
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
\`\`\`

### Rule 1: Private User Tables
For profiles, settings, or subscriptions, match the authenticated user's ID:

\`\`\`sql
CREATE POLICY "Users can manage their own profile"
  ON public.user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
\`\`\`

### Rule 2: Administrative Access
To allow admin roles or dashboard queries, you can check user roles in custom JWT metadata:

\`\`\`sql
CREATE POLICY "Admins can view all records"
  ON public.user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
\`\`\`

Using these patterns guarantees data containment while maintaining application scalability.`,
    tags: ['Database', 'Security', 'SaaS'],
    cover_image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
    is_published: true,
    created_at: '2026-05-20T00:00:00Z',
  },
  {
    id: 'tailwind-v4-guide',
    title: 'Migrating to Tailwind CSS v4: Core Changes and Benefits',
    slug: 'tailwind-v4-guide',
    excerpt: 'An inspection of Tailwind CSS v4 CSS-first configuration engines, lightning-fast compiler builds, and new features.',
    content: `Tailwind CSS v4 introduces a complete rewrite focusing on performance and a CSS-first configuration approach. 

### Key Differences
- **CSS-First Configuration**: Instead of \`tailwind.config.js\`, everything is configured using CSS variables and \`@theme\` directives in your stylesheet.
- **Lightning CSS Compiler**: Builds are up to 10x faster thanks to Rust-based tooling.
- **Dynamic Utility Generation**: Color opacities and variations are generated dynamically, removing bloating boilerplate.

### Standard Setup
Instead of imports and plugins, we write:

\`\`\`css
@import "tailwindcss";

@theme {
  --color-brand: #a855f7;
  --font-display: "Outfit", sans-serif;
}
\`\`\`

This eliminates Javascript transpilation overhead for configurations, paving the way for faster bundler environments.`,
    tags: ['CSS', 'Frontend', 'Tailwind'],
    cover_image_url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60',
    is_published: true,
    created_at: '2026-05-12T00:00:00Z',
  },
  {
    id: 'sales-copywriting-devs',
    title: 'The Developer-to-Creator Sales Copywriting Formula',
    slug: 'sales-copywriting-devs',
    excerpt: 'How to translate technical repository specs into compelling benefit copy that convinces developers to pull out their wallets.',
    content: `Most developers fail at marketing because they sell features, not results. A buyer does not care that your template uses "Redis adapter session synchronization". They care that "their dashboard page loads in under 50ms".

### The Formula
1. **The Headline**: Address the core problem immediately. (e.g. "Ship your SaaS this weekend, not next month.")
2. **The Pain**: Remind them of configuration hell. Spending days configuring OAuth and Stripe billing is exhausting.
3. **The Solution**: Frame your product as the shortcut.
4. **The Benefits**: Translate features.
   - *Feature*: React Router v6 code splitting.
   - *Benefit*: High SEO scores and minimal page load time for customers.

Mastering this transition converts technical authority into digital product sales.`,
    tags: ['Marketing', 'Copywriting', 'Indie-Hacker'],
    cover_image_url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=60',
    is_published: true,
    created_at: '2026-05-04T00:00:00Z',
  },
];

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error: fetchErr } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;

      if (data && data.length > 0) {
        setProductsList(data as BlogPost[]);
      } else {
        setProductsList(MOCK_POSTS);
      }
      setError(null);
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Failed to fetch blog posts from Supabase, using mock data:', err.message);
      }
      setProductsList(MOCK_POSTS);
    } finally {
      setLoading(false);
    }
  };

  const setProductsList = (list: BlogPost[]) => {
    setPosts(list);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error, refresh: fetchPosts };
};
