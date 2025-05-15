
import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Implementation of ApplicationDetailsSection
const ApplicationDetailsSection = ({ applicationId }: { applicationId?: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">تفاصيل الطلب #{applicationId}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">الجامعة</p>
          <p className="font-medium">جامعة إسطنبول التقنية</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">البرنامج</p>
          <p className="font-medium">هندسة البرمجيات</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">المستوى</p>
          <p className="font-medium">بكالوريوس</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">تاريخ التقديم</p>
          <p className="font-medium">15 مايو 2023</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">حالة الطلب</p>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            قيد المراجعة
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">المستندات المرفقة</p>
          <p className="font-medium">4 مستندات</p>
        </div>
      </div>
    </div>
  );
};

// Implementation of ApplicationTimeline
const ApplicationTimeline = ({ applicationId }: { applicationId?: string }) => {
  const timeline = [
    {
      date: "15 مايو 2023",
      title: "تم استلام الطلب",
      description: "تم استلام طلبك بنجاح وسيتم مراجعته قريباً.",
      status: "completed"
    },
    {
      date: "16 مايو 2023",
      title: "قيد المراجعة",
      description: "يقوم فريقنا بمراجعة طلبك والمستندات المرفقة.",
      status: "current"
    },
    {
      date: "قريباً",
      title: "إرسال إلى الجامعة",
      description: "سيتم إرسال طلبك إلى الجامعة للحصول على قرار القبول.",
      status: "upcoming"
    },
    {
      date: "قريباً",
      title: "قرار القبول",
      description: "سيتم إعلامك بقرار القبول من الجامعة.",
      status: "upcoming"
    }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">مسار الطلب</h2>
      <div className="space-y-8">
        {timeline.map((item, index) => (
          <div key={index} className="relative">
            {index < timeline.length - 1 && (
              <div className={`absolute top-7 left-5 h-full border-l-2 ${item.status === 'upcoming' ? 'border-gray-200 dark:border-gray-700' : 'border-unlimited-blue'}`}></div>
            )}
            <div className="flex gap-4">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                item.status === 'completed' ? 'bg-unlimited-blue text-white' :
                item.status === 'current' ? 'bg-yellow-500 text-white' :
                'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {index + 1}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.date}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Implementation of ApplicationMessages
const ApplicationMessages = ({ applicationId }: { applicationId?: string }) => {
  const messages = [
    {
      id: 1,
      from: "فريق الدعم",
      date: "16 مايو 2023",
      content: "مرحباً، شكراً لتقديم طلبك. نحن بحاجة إلى نسخة أوضح من جواز سفرك. هل يمكنك تحميل صورة أوضح؟",
      isAdmin: true
    },
    {
      id: 2,
      from: "أنت",
      date: "16 مايو 2023",
      content: "حسناً، سأقوم بتحميل نسخة أوضح في أقرب وقت ممكن. شكراً لك.",
      isAdmin: false
    }
  ];
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-6">المحادثات والاستفسارات</h2>
      
      <div className="space-y-4 mb-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isAdmin ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-lg ${message.isAdmin ? 'bg-gray-100 dark:bg-gray-700' : 'bg-unlimited-blue text-white'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{message.from}</span>
                <span className="text-xs opacity-70">{message.date}</span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 dark:border-gray-700">
        <form className="flex items-end gap-2">
          <div className="flex-grow">
            <textarea 
              rows={3} 
              placeholder="اكتب رسالتك هنا..."
              className="w-full p-3 border rounded-lg resize-none dark:bg-gray-700 dark:border-gray-600"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-4 py-2 rounded-md h-10"
          >
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

const ApplicationStatus = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <DashboardLayout userRole="student">
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">حالة الطلب</h1>
        <ApplicationDetailsSection applicationId={id} />
        <ApplicationTimeline applicationId={id} />
        <ApplicationMessages applicationId={id} />
      </div>
    </DashboardLayout>
  );
};

export default ApplicationStatus;
