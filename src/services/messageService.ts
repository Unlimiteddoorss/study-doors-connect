
// Mock message service for the application
// In a real application, this would make API calls to your backend

import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  application_id: string;
  sender_id: string;
  sender_role: string;
  content: string;
  attachments?: {
    name: string;
    size: number;
    type: string;
    url?: string;
  }[];
  voice_message?: {
    duration: number;
    url: string;
  };
  reactions?: {
    emoji: string;
    user_id: string;
    username: string;
  }[];
  created_at: string;
  is_read: boolean;
}

const mockMessages: Message[] = [
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'advisor-1',
    sender_role: 'advisor',
    content: 'مرحباً، نحن نراجع طلبك حاليًا. هل يمكنك تقديم النسخة الأصلية من جواز سفرك في أقرب وقت ممكن؟',
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true,
    reactions: [
      { emoji: '👍', user_id: 'student-1', username: 'أنت' }
    ]
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'student-1',
    sender_role: 'student',
    content: 'بالتأكيد، سأقوم بتحميل نسخة من جواز السفر اليوم.',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'advisor-1',
    sender_role: 'advisor',
    content: 'شكرًا لك. أيضًا، نحتاج إلى نسخة مصدقة من شهادة الثانوية العامة.',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true,
    reactions: [
      { emoji: '✅', user_id: 'student-1', username: 'أنت' }
    ]
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'university-1',
    sender_role: 'university',
    content: 'مرحبًا، نحن من قسم القبول في جامعة إسطنبول. لقد استلمنا طلبك وسنقوم بمراجعته قريبًا. يرجى العلم أن هناك بعض المستندات الإضافية المطلوبة لبرنامج الطب البشري.',
    attachments: [
      {
        name: 'متطلبات_القبول.pdf',
        size: 1024 * 1024 * 2.5, // 2.5MB
        type: 'application/pdf',
        url: '#'
      }
    ],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'student-1',
    sender_role: 'student',
    content: 'شكراً لكم. هل يمكنكم تحديد المستندات الإضافية المطلوبة تحديداً؟ سأقوم بتجهيزها في أقرب وقت.',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: true
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'university-1',
    sender_role: 'university',
    content: 'نعم بالطبع. تحتاج إلى تقديم شهادة اجتياز امتحان اللغة TOEFL أو IELTS، وشهادة اجتياز اختبار القدرات للطب، وخطاب توصية من أستاذين سابقين.',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    attachments: [
      {
        name: 'متطلبات_كلية_الطب.pdf',
        size: 1024 * 1024 * 1.8, // 1.8MB
        type: 'application/pdf',
        url: '#'
      },
      {
        name: 'نموذج_خطاب_التوصية.docx',
        size: 1024 * 512, // 512KB
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        url: '#'
      }
    ]
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'advisor-1',
    sender_role: 'advisor',
    content: '',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    voice_message: {
      duration: 28,
      url: '#'
    }
  },
  {
    id: uuidv4(),
    application_id: 'app-123',
    sender_id: 'university-1',
    sender_role: 'university',
    content: 'تذكير ودي: يرجى تقديم المستندات المطلوبة قبل نهاية الأسبوع للتأكد من معالجة طلبك في الوقت المناسب.',
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    is_read: false,
    attachments: [
      {
        name: 'جدول_مواعيد_القبول.jpg',
        size: 1024 * 500, // 500KB
        type: 'image/jpeg',
        url: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80'
      }
    ]
  }
];

export const getMessages = async (applicationId: string): Promise<Message[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Filter messages by application ID
  return mockMessages.filter(message => message.application_id === applicationId);
};

export const sendMessage = async (applicationId: string, senderId: string, content: string, attachments?: any[], voiceMessage?: {duration: number, url: string}): Promise<Message> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Create new message
  const newMessage: Message = {
    id: uuidv4(),
    application_id: applicationId,
    sender_id: senderId,
    sender_role: 'student', // Assuming sender is student
    content: content,
    attachments: attachments,
    voice_message: voiceMessage,
    created_at: new Date().toISOString(),
    is_read: true,
    reactions: []
  };
  
  // Add to mock database (in a real app, this would be a POST request to an API)
  mockMessages.push(newMessage);
  
  return newMessage;
};

export const markMessagesAsRead = async (applicationId: string, userId: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, this would update the messages in a database
  // For our mock implementation, we'll update the mock messages array
  mockMessages.forEach(message => {
    if (message.application_id === applicationId && message.sender_id !== userId) {
      message.is_read = true;
    }
  });
  
  return true;
};

export const getUnreadMessageCount = async (userId: string): Promise<number> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Count unread messages not sent by the user
  return mockMessages.filter(message => !message.is_read && message.sender_id !== userId).length;
};

export const addReaction = async (messageId: string, userId: string, emoji: string, username: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const messageIndex = mockMessages.findIndex(msg => msg.id === messageId);
  
  if (messageIndex === -1) {
    return false;
  }
  
  // Initialize reactions array if it doesn't exist
  if (!mockMessages[messageIndex].reactions) {
    mockMessages[messageIndex].reactions = [];
  }
  
  // Check if user has already reacted with this emoji
  const existingReactionIndex = mockMessages[messageIndex].reactions?.findIndex(
    reaction => reaction.user_id === userId && reaction.emoji === emoji
  );
  
  if (existingReactionIndex !== -1 && existingReactionIndex !== undefined) {
    // Remove reaction if it already exists
    mockMessages[messageIndex].reactions?.splice(existingReactionIndex, 1);
  } else {
    // Add new reaction
    mockMessages[messageIndex].reactions?.push({
      emoji,
      user_id: userId,
      username
    });
  }
  
  return true;
};

export const removeReaction = async (messageId: string, userId: string, emoji: string): Promise<boolean> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const messageIndex = mockMessages.findIndex(msg => msg.id === messageId);
  
  if (messageIndex === -1 || !mockMessages[messageIndex].reactions) {
    return false;
  }
  
  const reactionIndex = mockMessages[messageIndex].reactions!.findIndex(
    reaction => reaction.user_id === userId && reaction.emoji === emoji
  );
  
  if (reactionIndex === -1) {
    return false;
  }
  
  mockMessages[messageIndex].reactions!.splice(reactionIndex, 1);
  return true;
};

// Function to get commonly used emojis for reactions
export const getCommonReactions = (): string[] => {
  return ['👍', '👏', '❤️', '🎉', '😊', '✅', '🔥', '🙏'];
};

