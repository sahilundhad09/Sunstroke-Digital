import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';

// Fallback mock products (used when Supabase is not connected)
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ai-resume-builder',
    title: 'AI Resume Builder',
    slug: 'ai-resume-builder',
    description: 'Generate ATS-optimized resumes in seconds using AI. Tailored for tech professionals and developers.',
    long_description: 'Stop spending hours formatting your resume. Our AI Resume Builder analyzes job descriptions and generates perfectly tailored, ATS-friendly resumes. Built with GPT-4o, it understands technical roles and highlights the skills recruiters are scanning for.',
    price: 29,
    currency: 'USD',
    checkout_url: 'https://payhip.com/b/mock-ai-resume',
    cover_image_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=60',
    preview_images: [],
    category: 'ai-tools',
    tags: ['AI', 'Resume', 'Career', 'GPT'],
    is_featured: true,
    is_published: true,
  },
  {
    id: 'developer-portfolio-template',
    title: 'Developer Portfolio Template',
    slug: 'developer-portfolio-template',
    description: 'A stunning, dark-themed portfolio template built with React, Tailwind CSS, and Framer Motion. Deploy in minutes.',
    long_description: 'Make a lasting first impression. This portfolio template features smooth page transitions, glassmorphic UI elements, project showcases with live demos, an integrated blog section, and full mobile responsiveness.',
    price: 19,
    currency: 'USD',
    checkout_url: 'https://payhip.com/b/mock-portfolio',
    cover_image_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    preview_images: [],
    category: 'resume',
    tags: ['Portfolio', 'React', 'Template', 'Tailwind'],
    is_featured: true,
    is_published: true,
  },
  {
    id: 'saas-copywriting-ebook',
    title: 'SaaS Copywriting Ebook',
    slug: 'saas-copywriting-ebook',
    description: 'A comprehensive copywriting framework specifically tailored for developers who want to write landing pages that sell.',
    long_description: 'Stop losing visitors to boring copy. This ebook teaches you how to translate technical features into clear benefits, write high-converting headlines, structure social proof, and design compelling calls-to-action.',
    price: 0,
    currency: 'USD',
    checkout_url: undefined,
    cover_image_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60',
    preview_images: [],
    category: 'other',
    tags: ['Copywriting', 'Marketing', 'Ebook', 'Free'],
    is_featured: false,
    is_published: true,
  },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error: fetchErr } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) throw fetchErr;

      if (data) {
        setProducts(data as Product[]);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Failed to fetch products from Supabase:', err.message);
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (productData: Omit<Product, 'id'>) => {
    try {
      const { data, error: insertErr } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (insertErr) throw insertErr;

      await fetchProducts();
      return { success: true, data };
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Error adding product to Supabase:', err.message);
      }
      return { success: false, error: err.message };
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error: deleteErr } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (deleteErr) throw deleteErr;

      await fetchProducts();
      return { success: true };
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Error deleting product from Supabase:', err.message);
      }
      return { success: false, error: err.message };
    }
  };

  return { products, loading, error, refresh: fetchProducts, addProduct, deleteProduct };
};
