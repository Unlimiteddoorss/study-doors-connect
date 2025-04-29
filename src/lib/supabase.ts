
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if Supabase is configured with valid credentials
 * @returns boolean
 */
export const hasValidSupabaseCredentials = (): boolean => {
  try {
    // Use the supabaseUrl and supabaseKey from environment or config
    const url = process.env.SUPABASE_URL || supabase?.supabaseUrl as string;
    const key = process.env.SUPABASE_KEY || supabase?.supabaseKey as string;
    
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
 * Check if Supabase connection is working
 * @returns Promise<boolean>
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!hasValidSupabaseCredentials()) {
    return false;
  }
  
  try {
    // Attempt a simple query to check connection
    const { error } = await supabase.from('user_roles').select('id').limit(1);
    
    // If there's no error, the connection is working
    return !error;
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
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
