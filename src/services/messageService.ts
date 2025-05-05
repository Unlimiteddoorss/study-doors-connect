
import { supabase } from '@/integrations/supabase/client';

export async function getMessages(applicationId: string) {
  try {
    // Try to fetch from Supabase if connected
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error('Error fetching messages:', err);
    
    // Fallback to local storage if Supabase fails
    try {
      const storedMessages = localStorage.getItem(`messages_${applicationId}`);
      if (storedMessages) {
        return JSON.parse(storedMessages);
      }
      return [];
    } catch (error) {
      console.error('Error getting messages from localStorage:', error);
      return [];
    }
  }
}

export async function createMessage(message: any) {
  try {
    // Try to add to Supabase if connected
    const { error } = await supabase
      .from('messages')
      .insert(message);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Error creating message in Supabase:', err);
    
    // Fallback to local storage if Supabase fails
    try {
      const storedMessages = localStorage.getItem(`messages_${message.application_id}`);
      let messages = storedMessages ? JSON.parse(storedMessages) : [];
      
      messages.push(message);
      
      localStorage.setItem(`messages_${message.application_id}`, JSON.stringify(messages));
      
      return true;
    } catch (error) {
      console.error('Error saving message to localStorage:', error);
      throw error;
    }
  }
}

export async function markMessagesAsRead(applicationId: string, userId: string) {
  try {
    // Try to update in Supabase first
    const { error } = await supabase.rpc('mark_messages_read', {
      p_application_id: applicationId,
      p_user_id: userId
    });
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (err) {
    console.error('Error marking messages as read in Supabase:', err);
    
    // Fallback to local storage if Supabase fails
    try {
      const storedMessages = localStorage.getItem(`messages_${applicationId}`);
      if (!storedMessages) return false;
      
      let messages = JSON.parse(storedMessages);
      
      // Mark messages as read if sender is not the current user
      messages = messages.map((msg: any) => {
        if (msg.sender_id !== userId) {
          return { ...msg, is_read: true };
        }
        return msg;
      });
      
      localStorage.setItem(`messages_${applicationId}`, JSON.stringify(messages));
      
      return true;
    } catch (error) {
      console.error('Error updating messages in localStorage:', error);
      return false;
    }
  }
}
