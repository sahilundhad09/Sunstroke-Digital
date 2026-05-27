import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Affiliate } from '../types';

export const useAffiliates = () => {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAffiliates = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('affiliates')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setAffiliates(data as Affiliate[]);
      } else {
        setAffiliates([]);
      }
    } catch (err: any) {
      if (import.meta.env.DEV) {
        console.warn('Failed to fetch affiliates from Supabase:', err.message);
      }
      setAffiliates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAffiliates();
  }, []);

  return { affiliates, loading, refresh: fetchAffiliates };
};

// Legacy hook for affiliate ref tracking
export const useAffiliate = () => {
  const [referrer, setReferrer] = useState<string | null>(null);
  const [loading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');

    if (refCode) {
      localStorage.setItem('affiliate_ref_code', refCode);
      localStorage.setItem('affiliate_ref_time', new Date().toISOString());
      setReferrer(refCode);
    } else {
      const storedRef = localStorage.getItem('affiliate_ref_code');
      if (storedRef) {
        setReferrer(storedRef);
      }
    }
  }, []);

  return { referrer, loading };
};
