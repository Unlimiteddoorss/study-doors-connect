
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(
  'https://rzbxbbrlshymwecjoxtp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YnhiYnJsc2h5bXdlY2pveHRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NjI4NjIsImV4cCI6MjA2MTUzODg2Mn0.ZYD4vIthx3T9JmMk-agF98n5E0MIwZ3KINFzTSwtC_w'
);
