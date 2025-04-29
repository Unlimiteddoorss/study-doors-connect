
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if Supabase is configured with valid credentials
 * @returns boolean
 */
export const hasValidSupabaseCredentials = (): boolean => {
  try {
    // Instead of directly accessing protected properties, use the values from the config file
    const url = process.env.SUPABASE_URL || "https://rzbxbbrlshymwecjoxtp.supabase.co";
    const key = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YnhiYnJsc2h5bXdlY2pveHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjI4NjIsImV4cCI6MjA2MTUzODg2Mn0.ZYD4vIthx3T9JmMk-agF98n5E0MIwZ3KINFzTSwtC_w";
    
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
