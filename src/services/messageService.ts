
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

// Send a message to Supabase or localStorage
export const sendMessage = async (message: any) => {
  try {
    // Try to send to Supabase if connected
    const { data, error } = await supabase
      .from('messages')
      .insert([{ ...message, id: uuidv4() }]);
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error sending message:', err);
    
    // If Supabase fails, use local storage fallback
    saveMessageToLocalStorage(message);
    
    return message;
  }
};

// Fetch messages for an application from Supabase or localStorage
export const getMessages = async (applicationId: string) => {
  try {
    // Try to fetch from Supabase if connected
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data;
    } else {
      // Use mock data if no messages found
      return getMessagesFromLocalStorage(applicationId);
    }
  } catch (err) {
    console.error('Error fetching messages:', err);
    
    // If Supabase fails, use local storage fallback
    return getMessagesFromLocalStorage(applicationId);
  }
};

// Mark messages as read
export const markMessagesAsRead = async (applicationId: string, userId: string) => {
  try {
    // Try to mark as read in Supabase if connected
    const { error } = await supabase
      .rpc('mark_messages_read', { 
        p_application_id: applicationId, 
        p_user_id: userId 
      });
      
    if (error) throw error;
    
    return true;
  } catch (err) {
    console.error('Error marking messages as read:', err);
    
    // If Supabase fails, use local storage fallback
    markMessagesAsReadInLocalStorage(applicationId, userId);
    
    return false;
  }
};

// Upload a message attachment
export const uploadMessageAttachment = async (applicationId: string, file: File) => {
  try {
    // For now, we're simulating file uploads without actually uploading
    // In a real application, this would upload to Supabase storage
    
    // Create a mock file data object
    const fileData = {
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file), // Creates a local blob URL for preview
      application_id: applicationId,
      created_at: new Date().toISOString()
    };
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return fileData;
  } catch (error) {
    console.error('Error uploading attachment:', error);
    throw error;
  }
};

// Fetch application messages
export const fetchApplicationMessages = async (applicationId: string) => {
  try {
    // Try to fetch from Supabase
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });
      
    if (error) throw error;
    
    return data || [];
  } catch (err) {
    console.error('Error fetching application messages:', err);
    
    // If Supabase fails, use local storage or mock data
    return getMessagesFromLocalStorage(applicationId);
  }
};

// Send an application message
export const sendApplicationMessage = async (message: any) => {
  try {
    // Ensure message has an ID
    if (!message.id) {
      message.id = uuidv4();
    }
    
    // Try to send to Supabase
    const { data, error } = await supabase
      .from('messages')
      .insert([message]);
      
    if (error) throw error;
    
    return data;
  } catch (err) {
    console.error('Error sending application message:', err);
    
    // If Supabase fails, use local storage fallback
    saveMessageToLocalStorage(message);
    
    return message;
  }
};

// Local storage fallback functions
const saveMessageToLocalStorage = (message: any) => {
  try {
    const storedMessages = localStorage.getItem('applicationMessages');
    let messages = storedMessages ? JSON.parse(storedMessages) : [];
    
    messages.push({
      ...message,
      id: message.id || uuidv4(),
      created_at: message.created_at || new Date().toISOString()
    });
    
    localStorage.setItem('applicationMessages', JSON.stringify(messages));
    
    return true;
  } catch (error) {
    console.error('Error saving message to localStorage:', error);
    return false;
  }
};

const getMessagesFromLocalStorage = (applicationId: string) => {
  try {
    const storedMessages = localStorage.getItem('applicationMessages');
    if (!storedMessages) {
      // If no messages exist, create mock data
      return generateMockMessages(applicationId);
    }
    
    const messages = JSON.parse(storedMessages);
    const filteredMessages = messages.filter((msg: any) => msg.application_id === applicationId);
    
    if (filteredMessages.length === 0) {
      // If no messages for this application, create mock data
      return generateMockMessages(applicationId);
    }
    
    return filteredMessages;
  } catch (error) {
    console.error('Error getting messages from localStorage:', error);
    return generateMockMessages(applicationId);
  }
};

const markMessagesAsReadInLocalStorage = (applicationId: string, userId: string) => {
  try {
    const storedMessages = localStorage.getItem('applicationMessages');
    if (!storedMessages) return false;
    
    const messages = JSON.parse(storedMessages);
    
    // Mark messages as read where the user is not the sender
    const updatedMessages = messages.map((msg: any) => {
      if (msg.application_id === applicationId && msg.sender_id !== userId) {
        return { ...msg, is_read: true };
      }
      return msg;
    });
    
    localStorage.setItem('applicationMessages', JSON.stringify(updatedMessages));
    
    return true;
  } catch (error) {
    console.error('Error marking messages as read in localStorage:', error);
    return false;
  }
};

// Generate mock messages for demo purposes
const generateMockMessages = (applicationId: string) => {
  const now = new Date();
  const dayInMillis = 24 * 60 * 60 * 1000;
  
  return [
    {
      id: uuidv4(),
      application_id: applicationId,
      sender_type: 'university',
      sender_name: 'مكتب القبول',
      sender_id: 'admin-1',
      content: 'مرحباً، شكراً لتقديم طلبك. سنقوم بمراجعته في أقرب وقت ممكن.',
      created_at: new Date(now.getTime() - 5 * dayInMillis).toISOString(),
      read: true
    },
    {
      id: uuidv4(),
      application_id: applicationId,
      sender_type: 'university',
      sender_name: 'مكتب القبول',
      sender_id: 'admin-1',
      content: 'يرجى التأكد من إرفاق جميع المستندات المطلوبة لتسريع عملية المراجعة.',
      created_at: new Date(now.getTime() - 4 * dayInMillis).toISOString(),
      read: true
    },
    {
      id: uuidv4(),
      application_id: applicationId,
      sender_type: 'student',
      sender_name: 'الطالب',
      sender_id: 'student-1',
      content: 'شكراً للرد. لقد قمت بإرفاق جميع المستندات المطلوبة. هل هناك أي مستندات إضافية مطلوبة؟',
      created_at: new Date(now.getTime() - 3 * dayInMillis).toISOString(),
      read: true
    },
    {
      id: uuidv4(),
      application_id: applicationId,
      sender_type: 'university',
      sender_name: 'مكتب القبول',
      sender_id: 'admin-2',
      content: 'المستندات المرفقة مكتملة. سنواصل مراجعة طلبك ونعود إليك قريباً بالنتيجة.',
      created_at: new Date(now.getTime() - 2 * dayInMillis).toISOString(),
      read: true
    }
  ];
};
