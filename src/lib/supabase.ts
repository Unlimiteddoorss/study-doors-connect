
import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in your deployed environment
// For development, you can replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if Supabase is properly connected
export const checkSupabaseConnection = async () => {
  try {
    // Try to fetch a simple count from a public table like universities
    const { count, error } = await supabase
      .from('universities')
      .select('*', { count: 'exact', head: true });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};
