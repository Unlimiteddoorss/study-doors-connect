
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { createMessagesTable } from '@/sql/messagesMigration';

interface MessageAttachment {
  url: string;
  path: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
}

interface Message {
  id?: string;
  application_id: string;
  sender_id: string;
  sender_role: 'student' | 'admin' | 'agent';
  content: string;
  attachments?: MessageAttachment[];
  is_read?: boolean;
  created_at?: string;
}

// Function to create the messages table if it doesn't exist
export const initializeMessageSystem = async () => {
  try {
    // Use raw query for checking if table exists
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT EXISTS (
          SELECT FROM information_schema.tables 
          WHERE table_schema = 'public'
          AND table_name = 'messages'
        );
      `
    }) as { data: Array<{exists: boolean}> | null, error: any };
    
    if (error) {
      console.error('Error checking if messages table exists:', error);
      // Try to create the table
      await createMessagesTable();
      return { success: true, message: 'Messages table created successfully' };
    }
    
    const tableExists = data && data[0] && data[0].exists;
    
    if (!tableExists) {
      // Table doesn't exist, create it
      await createMessagesTable();
      return { success: true, message: 'Messages table created successfully' };
    }
    
    return { success: true, message: 'Messages table already exists' };
  } catch (error: any) {
    console.error('Error initializing message system:', error.message);
    return { success: false, error: error.message };
  }
};

// Get messages for an application
export const getApplicationMessages = async (applicationId: string) => {
  try {
    // Try to create the table if it doesn't exist
    await initializeMessageSystem();
    
    // Use raw SQL query to avoid type errors
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        SELECT * FROM messages
        WHERE application_id = '${applicationId}'
        ORDER BY created_at ASC;
      `
    }) as { data: any[] | null, error: any };
    
    if (error) throw error;
    
    return { data, error: null };
  } catch (error: any) {
    console.error(`Error fetching messages for application ${applicationId}:`, error.message);
    return { data: [], error: error.message };
  }
};

// Send a message
export const sendMessage = async (message: Message) => {
  try {
    // Try to create the table if it doesn't exist
    await initializeMessageSystem();
    
    // Use raw SQL query to avoid type errors
    const { data, error } = await supabase.rpc('execute_sql', {
      sql_string: `
        INSERT INTO messages (
          id,
          application_id,
          sender_id,
          sender_role,
          content,
          attachments,
          is_read
        )
        VALUES (
          '${message.id || uuidv4()}',
          '${message.application_id}',
          '${message.sender_id}',
          '${message.sender_role}',
          '${message.content.replace(/'/g, "''")}',
          '${JSON.stringify(message.attachments || []).replace(/'/g, "''")}'::jsonb,
          ${message.is_read === undefined ? 'false' : message.is_read}
        )
        RETURNING *;
      `
    }) as { data: any[] | null, error: any };
    
    if (error) throw error;
    
    return { data: data && data.length > 0 ? data[0] : null, error: null };
  } catch (error: any) {
    console.error('Error sending message:', error.message);
    return { data: null, error: error.message };
  }
};

// Upload message attachment
export const uploadMessageAttachment = async (messageId: string, file: File) => {
  try {
    // Create storage bucket if it doesn't exist
    const bucketName = 'message-attachments';
    
    try {
      // Check if bucket exists
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(b => b.name === bucketName);
      
      if (!bucketExists) {
        // Create bucket
        await supabase.storage.createBucket(bucketName, { public: false });
      }
    } catch (err) {
      console.error('Error checking/creating bucket:', err);
    }

    // Upload file logic
    const fileExt = file.name.split('.').pop();
    const fileName = `${messageId}-${Date.now()}.${fileExt}`;
    const filePath = `${messageId}/${fileName}`;

    const { error: uploadError, data } = await supabase
      .storage
      .from(bucketName)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return { 
      data: { 
        url: publicUrlData.publicUrl,
        path: filePath,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      }, 
      error: null 
    };
    
  } catch (error: any) {
    console.error('Error uploading message attachment:', error.message);
    return { data: null, error: error.message };
  }
};

// Mark messages as read
export const markMessagesAsRead = async (applicationId: string, userId: string) => {
  try {
    // Try to create the table if it doesn't exist
    await initializeMessageSystem();
    
    // Use the database function to mark messages as read
    const { error } = await supabase.rpc('mark_messages_read', { 
      p_application_id: applicationId, 
      p_user_id: userId 
    });
    
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error marking messages as read:', error.message);
    return { success: false, error: error.message };
  }
};
