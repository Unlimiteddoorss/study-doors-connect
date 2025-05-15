
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const MessagesContainer = () => {
  const [activeConversation, setActiveConversation] = React.useState<number>(1);
  
  const conversations: Conversation[] = [
    {
      id: 1,
      name: "فريق الدعم",
      avatar: "/images/avatars/support.png",
      lastMessage: "نعم، يمكنك إرسال المستندات المطلوبة عبر النظام مباشرة",
      timestamp: "12:30 م",
      unreadCount: 2
    },
    {
      id: 2,
      name: "جامعة إسطنبول التقنية",
      avatar: "/images/universities/istanbul-technical-university.jpg",
      lastMessage: "تم استلام طلبك وسيتم مراجعته قريباً",
      timestamp: "أمس",
      unreadCount: 0
    },
    {
      id: 3,
      name: "وكيل الجامعات الأوربية",
      avatar: "/images/avatars/agent1.png",
      lastMessage: "أهلاً، لدي بعض التوصيات للبرامج الدراسية في بولندا",
      timestamp: "23/05",
      unreadCount: 1
    }
  ];
  
  const messages: Record<number, Message[]> = {
    1: [
      {
        id: 1,
        sender: "فريق الدعم",
        content: "مرحباً بك في نظام إدارة طلبات الجامعات! كيف يمكنني مساعدتك اليوم؟",
        timestamp: "10:30 ص",
        isRead: true,
        avatar: "/images/avatars/support.png"
      },
      {
        id: 2,
        sender: "أنت",
        content: "مرحباً، لدي استفسار حول المستندات المطلوبة للتقديم على برنامج الهندسة",
        timestamp: "10:35 ص",
        isRead: true
      },
      {
        id: 3,
        sender: "فريق الدعم",
        content: "بالتأكيد! للتقديم على برامج الهندسة، ستحتاج إلى: شهادة الثانوية العامة، جواز السفر، صور شخصية، وإثبات إجادة اللغة الإنجليزية مثل شهادة TOEFL أو IELTS.",
        timestamp: "10:40 ص",
        isRead: true,
        avatar: "/images/avatars/support.png"
      },
      {
        id: 4,
        sender: "أنت",
        content: "شكراً جزيلاً! هل يمكنني إرسال هذه المستندات عبر النظام؟",
        timestamp: "12:20 م",
        isRead: true
      },
      {
        id: 5,
        sender: "فريق الدعم",
        content: "نعم، يمكنك إرسال المستندات المطلوبة عبر النظام مباشرة عند تقديم الطلب أو من خلال صفحة الطلب الخاصة بك بعد إنشائها.",
        timestamp: "12:30 م",
        isRead: false,
        avatar: "/images/avatars/support.png"
      },
      {
        id: 6,
        sender: "فريق الدعم",
        content: "وإذا كان لديك أي استفسارات إضافية، فلا تتردد في طرحها!",
        timestamp: "12:31 م",
        isRead: false,
        avatar: "/images/avatars/support.png"
      }
    ],
    2: [
      {
        id: 1,
        sender: "جامعة إسطنبول التقنية",
        content: "مرحباً! نشكرك على اهتمامك بالدراسة في جامعتنا.",
        timestamp: "الأمس",
        isRead: true,
        avatar: "/images/universities/istanbul-technical-university.jpg"
      },
      {
        id: 2,
        sender: "جامعة إسطنبول التقنية",
        content: "تم استلام طلبك وسيتم مراجعته قريباً من قبل لجنة القبول.",
        timestamp: "الأمس",
        isRead: true,
        avatar: "/images/universities/istanbul-technical-university.jpg"
      }
    ],
    3: [
      {
        id: 1,
        sender: "وكيل الجامعات الأوربية",
        content: "أهلاً، لدي بعض التوصيات للبرامج الدراسية في بولندا التي تناسب اهتماماتك.",
        timestamp: "23/05",
        isRead: false,
        avatar: "/images/avatars/agent1.png"
      }
    ]
  };
  
  const activeMessages = messages[activeConversation] || [];
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="flex h-[600px]">
        {/* Conversations List */}
        <div className="w-1/3 border-l dark:border-gray-700">
          <div className="p-4 border-b dark:border-gray-700">
            <input 
              type="text" 
              placeholder="بحث..." 
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="overflow-y-auto h-[calc(600px-64px)]">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`p-4 border-b dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  activeConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-700' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-center">
                  {conversation.avatar ? (
                    <img 
                      src={conversation.avatar} 
                      alt={conversation.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-unlimited-blue text-white flex items-center justify-center mr-3">
                      {conversation.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{conversation.lastMessage}</p>
                      {conversation.unreadCount > 0 && (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-unlimited-blue text-white text-xs rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Thread */}
        <div className="w-2/3 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex items-center dark:border-gray-700">
            {conversations.find(c => c.id === activeConversation)?.avatar ? (
              <img 
                src={conversations.find(c => c.id === activeConversation)?.avatar} 
                alt={conversations.find(c => c.id === activeConversation)?.name}
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-unlimited-blue text-white flex items-center justify-center mr-3">
                {conversations.find(c => c.id === activeConversation)?.name.charAt(0)}
              </div>
            )}
            <div>
              <h3 className="font-semibold">{conversations.find(c => c.id === activeConversation)?.name}</h3>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {activeMessages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'أنت' ? 'justify-end' : 'justify-start'}`}>
                {message.sender !== 'أنت' && message.avatar && (
                  <img 
                    src={message.avatar} 
                    alt={message.sender}
                    className="w-8 h-8 rounded-full object-cover ml-2 mt-1"
                  />
                )}
                <div 
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.sender === 'أنت' 
                      ? 'bg-unlimited-blue text-white' 
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm">{message.sender}</span>
                    <span className="text-xs opacity-70 mr-2">{message.timestamp}</span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.sender === 'أنت' && (
                  <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center mr-2 mt-1">
                    أ
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Input */}
          <div className="p-4 border-t dark:border-gray-700">
            <form className="flex items-center">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <input 
                type="text" 
                placeholder="اكتب رسالتك هنا..."
                className="flex-grow mx-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                type="submit"
                className="p-2 bg-unlimited-blue text-white rounded-md hover:bg-unlimited-dark-blue"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">الرسائل</h1>
        <MessagesContainer />
      </div>
    </DashboardLayout>
  );
};

export default Messages;
