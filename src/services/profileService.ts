
import { supabase } from '@/integrations/supabase/client';

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
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

// Create or update user profile
export const upsertUserProfile = async (profile: any) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert([profile])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error updating user profile:', error.message);
    return { data: null, error: error.message };
  }
};

// Upload profile image
export const uploadProfileImage = async (userId: string, file: File) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Create avatars bucket if it doesn't exist
    const { data: bucketExists } = await supabase
      .storage
      .getBucket('avatars');
    
    if (!bucketExists) {
      await supabase.storage.createBucket('avatars', { public: true });
    }

    // Upload file to storage
    const { error: uploadError } = await supabase
      .storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('avatars')
      .getPublicUrl(filePath);

    // Update profile with avatar URL
    const { data, error } = await supabase
      .from('user_profiles')
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
