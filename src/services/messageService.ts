
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
    is_read: true
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
    is_read: true
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
    content: 'أهلاً! هل استطعت الاطلاع على المستندات المطلوبة؟ يمكنني مساعدتك في تجهيز خطابات التوصية إذا لزم الأمر.',
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    is_read: false
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

export const sendMessage = async (applicationId: string, senderId: string, content: string, attachments?: any[]): Promise<Message> => {
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
    created_at: new Date().toISOString(),
    is_read: true
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
