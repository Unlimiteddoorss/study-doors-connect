
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Interface for migration
interface Migration {
  name: string;
  sql: string;
}

// Check if migrations table exists, if not create it
const checkMigrationsTable = async () => {
  try {
    // We can't use the standard supabase.from() here because the migrations table isn't in the types
    // Instead, we'll use a custom RPC call to check if the table exists
    const { data, error } = await supabase.rpc('execute_sql', { 
      sql_string: `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'migrations'
        );
      `
    });
    
    if (error) {
      console.error('Error checking migrations table:', error);
      return false;
    }
    
    // If table doesn't exist, create it
    if (!data || !data[0] || !data[0].exists) {
      const { error: createError } = await supabase.rpc('execute_sql', { 
        sql_string: `
          CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      });
      
      if (createError) {
        console.error('Error creating migrations table:', createError);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error in migration check:', error);
    return false;
  }
};

// Apply migration if it hasn't been applied yet
export const applyMigration = async (migration: Migration) => {
  const { toast } = useToast();
  
  try {
    // Ensure migrations table exists
    const tableExists = await checkMigrationsTable();
    if (!tableExists) {
      toast({
        title: "خطأ في الترحيل",
        description: "فشل في التحقق من جدول الترحيلات",
        variant: "destructive"
      });
      return false;
    }
    
    // Check if migration has already been applied using RPC
    const { data, error } = await supabase.rpc('execute_sql', { 
      sql_string: `
        SELECT EXISTS (
          SELECT 1 FROM migrations 
          WHERE name = '${migration.name}'
        );
      `
    });
      
    if (error) {
      console.error('Error checking migration:', error);
      return false;
    }
    
    if (data && data[0] && data[0].exists) {
      console.log(`Migration ${migration.name} already applied`);
      return true;
    }
    
    // Apply migration
    const { error: sqlError } = await supabase.rpc('execute_sql', { 
      sql_string: migration.sql
    });
    
    if (sqlError) {
      console.error('Error applying migration:', sqlError);
      toast({
        title: "خطأ في الترحيل",
        description: `فشل في تطبيق الترحيل: ${migration.name}`,
        variant: "destructive"
      });
      return false;
    }
    
    // Record migration using RPC
    const { error: recordError } = await supabase.rpc('execute_sql', { 
      sql_string: `
        INSERT INTO migrations (name)
        VALUES ('${migration.name}');
      `
    });
      
    if (recordError) {
      console.error('Error recording migration:', recordError);
      toast({
        title: "تحذير",
        description: "تم تطبيق الترحيل ولكن فشل في تسجيله",
        variant: "default"
      });
    }
    
    toast({
      title: "تم الترحيل بنجاح",
      description: `تم تطبيق الترحيل: ${migration.name}`
    });
    
    return true;
  } catch (error) {
    console.error('Error in applyMigration:', error);
    toast({
      title: "خطأ في الترحيل",
      description: "حدث خطأ غير متوقع أثناء الترحيل",
      variant: "destructive"
    });
    return false;
  }
};
