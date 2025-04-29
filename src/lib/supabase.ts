
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if Supabase is configured with valid credentials
 * @returns boolean
 */
export const hasValidSupabaseCredentials = (): boolean => {
  try {
    const url = supabase?.supabaseUrl;
    const key = supabase?.supabaseKey;
    
    // Basic validation
    if (!url || !key || url.includes('YOUR_SUPABASE_URL') || key.includes('YOUR_SUPABASE_ANON_KEY')) {
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking Supabase credentials:', error);
    return false;
  }
};

/**
 * Helper function to safely access Supabase when ready
 * @param callback The function to call when Supabase is ready
 */
export const withSupabase = async <T>(callback: (client: typeof supabase) => Promise<T>): Promise<T | null> => {
  if (!hasValidSupabaseCredentials()) {
    console.error('Supabase not configured correctly');
    return null;
  }
  
  try {
    return await callback(supabase);
  } catch (error) {
    console.error('Error in Supabase operation:', error);
    return null;
  }
};
