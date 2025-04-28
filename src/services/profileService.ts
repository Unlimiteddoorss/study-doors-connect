
import { supabase } from '@/lib/supabase';
import { StudentProfile } from '@/types/supabase';

// Get student profile
export const getStudentProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('student_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is 'no rows returned' which is fine

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching profile for user ${userId}:`, error.message);
    return { data: null, error: error.message };
  }
};

// Create or update student profile
export const upsertStudentProfile = async (profile: Partial<StudentProfile>) => {
  try {
    const { data, error } = await supabase
      .from('student_profiles')
      .upsert([profile])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating student profile:', error.message);
    return { data: null, error: error.message };
  }
};

// Upload profile image
export const uploadProfileImage = async (userId: string, file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase
      .storage
      .from('profiles')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('profiles')
      .getPublicUrl(filePath);

    // Update profile with avatar URL
    const { data, error } = await supabase
      .from('student_profiles')
      .update({ avatar_url: publicUrlData.publicUrl })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error uploading profile image:', error.message);
    return { data: null, error: error.message };
  }
};
