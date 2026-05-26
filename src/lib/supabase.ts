import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ikuxnaikwsszibaqeqht.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdXhuYWlrd3NzemliYXFlcWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODY4NDIsImV4cCI6MjA5NTM2Mjg0Mn0.6J4qR-I3vhvT8i90WrZpUbnoW0rmL1wulel8WFZOEdY'
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
