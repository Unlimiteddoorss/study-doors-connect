
import { supabase } from '@/integrations/supabase/client';

// Get all universities with optional pagination
export const getUniversities = async (
  page: number = 1, 
  pageSize: number = 10,
  filters: Record<string, any> = {}
) => {
  try {
    let query = supabase
      .from('universities')
      .select('*', { count: 'exact' });
    
    // Apply filters
    if (filters.country) {
      query = query.eq('country', filters.country);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters.isFeatured) {
      query = query.eq('is_featured', true);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, count, error } = await query
      .range(from, to)
      .order('name', { ascending: true });

    if (error) throw error;

    return { data, count, error: null };
  } catch (error: any) {
    console.error('Error fetching universities:', error.message);
    return { data: [], count: 0, error: error.message };
  }
};

// Get university by ID
export const getUniversityById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching university with ID ${id}:`, error.message);
    return { data: null, error: error.message };
  }
};

// Get university programs
export const getUniversityPrograms = async (universityId: number) => {
  try {
    const { data, error } = await supabase
      .from('programs')
      .select('*')
      .eq('university_id', universityId);

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching programs for university ${universityId}:`, error.message);
    return { data: [], error: error.message };
  }
};
