
import { supabase } from '@/integrations/supabase/client';

// Get all universities with optional pagination
export const getUniversities = async (
  page: number = 1, 
  pageSize: number = 10,
  filters: Record<string, any> = {}
) => {
  try {
    // Build the SQL query string with filters
    let whereClause = '';
    const conditions = [];
    
    if (filters.country) {
      conditions.push(`country = '${filters.country}'`);
    }

    if (filters.type) {
      conditions.push(`type = '${filters.type}'`);
    }
    
    if (filters.isFeatured) {
      conditions.push(`is_featured = true`);
    }
    
    if (conditions.length > 0) {
      whereClause = 'WHERE ' + conditions.join(' AND ');
    }
    
    // Get total count for pagination
    const { data: countResult, error: countError } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT COUNT(*) as total FROM universities ${whereClause};
      `
    }) as { data: Array<{total: number}> | null, error: any };
    
    if (countError) throw countError;
    
    const totalCount = countResult?.[0]?.total || 0;
    
    // Calculate pagination limits
    const offset = (page - 1) * pageSize;
    
    // Get paginated data
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT * FROM universities
        ${whereClause}
        ORDER BY name ASC
        LIMIT ${pageSize} OFFSET ${offset};
      `
    }) as { data: any[] | null, error: any };

    if (error) throw error;

    return { data, count: Number(totalCount), error: null };
  } catch (error: any) {
    console.error('Error fetching universities:', error.message);
    return { data: [], count: 0, error: error.message };
  }
};

// Get university by ID
export const getUniversityById = async (id: number) => {
  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT * FROM universities
        WHERE id = ${id}
        LIMIT 1;
      `
    }) as { data: any[] | null, error: any };

    if (error) throw error;

    return { data: data && data.length > 0 ? data[0] : null, error: null };
  } catch (error: any) {
    console.error(`Error fetching university with ID ${id}:`, error.message);
    return { data: null, error: error.message };
  }
};

// Get university programs
export const getUniversityPrograms = async (universityId: number) => {
  try {
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT * FROM programs
        WHERE university_id = ${universityId};
      `
    }) as { data: any[] | null, error: any };

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching programs for university ${universityId}:`, error.message);
    return { data: [], error: error.message };
  }
};
