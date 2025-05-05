
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface ApplicationMessage {
  id?: string;
  application_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  attachments?: {
    id: string;
    name: string;
    url: string;
    size?: number;
    type?: string;
  }[];
  is_read?: boolean;
  created_at?: string;
}

export const fetchApplicationMessages = async (applicationId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('application_id', applicationId)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
  
  return data || [];
};

export const sendApplicationMessage = async (message: ApplicationMessage) => {
  // Generate client-side ID if not provided
  if (!message.id) {
    message.id = uuidv4();
  }
  
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select();
  
  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
  
  return data?.[0] || null;
};

export const markMessagesAsRead = async (applicationId: string, userId: string) => {
  // Using Supabase function to mark messages as read
  const { error } = await supabase
    .rpc('mark_messages_read', { 
      p_application_id: applicationId,
      p_user_id: userId
    });
  
  if (error) {
    console.error('Error marking messages as read:', error);
    throw error;
  }
  
  return true;
};

export const uploadMessageAttachment = async (
  applicationId: string, 
  file: File
): Promise<{ url: string; path: string; name: string; size: number; type: string }> => {
  const filePath = `applications/${applicationId}/messages/${Date.now()}_${file.name}`;
  
  const { data, error } = await supabase.storage
    .from('applications')
    .upload(filePath, file);
  
  if (error) {
    console.error('Error uploading attachment:', error);
    throw error;
  }
  
  // Get public URL for the file
  const { data: { publicUrl } } = supabase.storage
    .from('applications')
    .getPublicUrl(data.path);
  
  return {
    url: publicUrl,
    path: data.path,
    name: file.name,
    size: file.size,
    type: file.type
  };
};
