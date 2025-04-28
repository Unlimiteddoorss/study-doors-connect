
import { supabase } from '@/lib/supabase';
import { Message } from '@/types/supabase';

// Get messages for an application
export const getApplicationMessages = async (applicationId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching messages for application ${applicationId}:`, error.message);
    return { data: [], error: error.message };
  }
};

// Send a message
export const sendMessage = async (message: Partial<Message>) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([message])
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error sending message:', error.message);
    return { data: null, error: error.message };
  }
};

// Upload message attachment
export const uploadMessageAttachment = async (
  messageId: string, 
  file: File
) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${messageId}-${Date.now()}.${fileExt}`;
    const filePath = `message-attachments/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase
      .storage
      .from('message-attachments')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('message-attachments')
      .getPublicUrl(filePath);

    // Update message with attachment
    const { data: message } = await supabase
      .from('messages')
      .select('attachments')
      .eq('id', messageId)
      .single();

    const currentAttachments = message?.attachments || [];
    
    const { data, error } = await supabase
      .from('messages')
      .update({ 
        attachments: [...currentAttachments, publicUrlData.publicUrl]
      })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error uploading message attachment:', error.message);
    return { data: null, error: error.message };
  }
};

// Mark messages as read
export const markMessagesAsRead = async (
  applicationId: string,
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('application_id', applicationId)
      .neq('sender_id', userId)
      .select();

    if (error) throw error;

    return { data, error: null };
  } catch (error: any) {
    console.error('Error marking messages as read:', error.message);
    return { data: null, error: error.message };
  }
};
