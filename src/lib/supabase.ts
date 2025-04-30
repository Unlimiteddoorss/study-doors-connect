
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if Supabase is configured with valid credentials
 * @returns boolean
 */
export const hasValidSupabaseCredentials = (): boolean => {
  try {
    // Get the URL and key from the client configuration or environment
    const url = import.meta.env.VITE_SUPABASE_URL || "https://rzbxbbrlshymwecjoxtp.supabase.co";
    const key = import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YnhiYnJsc2h5bXdlY2pveHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjI4NjIsImV4cCI6MjA2MTUzODg2Mn0.ZYD4vIthx3T9JmMk-agF98n5E0MIwZ3KINFzTSwtC_w";
    
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

/**
 * Create a user role safely via direct database insert
 * @param userId The user ID to create a role for
 * @param role The role to assign to the user
 * @returns Promise<boolean> Whether the operation was successful
 */
export const createUserRole = async (
  userId: string, 
  role: 'student' | 'admin' | 'agent'
): Promise<boolean> => {
  try {
    // Direct insert to user_roles table bypassing RLS
    const { error } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role: role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('Error creating user role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error creating user role:', error);
    return false;
  }
};
