
import { useState } from 'react';
import MessagesContainer from './messages/MessagesContainer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, FileQuestion, AlertCircle, Bell } from 'lucide-react';

interface ApplicationMessagesProps {
  programName: string;
  universityName: string;
  applicationId: number;
}

const ApplicationMessages = ({ programName, universityName, applicationId }: ApplicationMessagesProps) => {
  const [unreadMessages, setUnreadMessages] = useState(2);
  const [activeTab, setActiveTab] = useState('messages');
  
  const markAsRead = () => {
    setUnreadMessages(0);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-unlimited-blue" />
              المراسلات
              {unreadMessages > 0 && (
                <Badge className="bg-unlimited-blue">{unreadMessages}</Badge>
              )}
            </CardTitle>
            <CardDescription>تواصل مع فريق القبول بخصوص طلبك</CardDescription>
          </div>
          
          {unreadMessages > 0 && (
            <Button variant="outline" size="sm" onClick={markAsRead}>
              تعليم الكل كمقروء
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="messages" className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>المراسلات</span>
              {unreadMessages > 0 && (
                <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                  {unreadMessages}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1">
              <FileQuestion className="h-4 w-4" />
              <span>الأسئلة المتكررة</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              <span>الإشعارات</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages" className="mt-0">
            <MessagesContainer
              programName={programName} 
              universityName={universityName}
              applicationId={applicationId}
              onMessageRead={markAsRead}
            />
          </TabsContent>
          
          <TabsContent value="faq" className="mt-0">
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-unlimited-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium text-unlimited-dark-blue">كم تستغرق عملية مراجعة الطلب؟</h4>
                    <p className="text-unlimited-gray text-sm mt-1">
                      عادة ما تستغرق عملية مراجعة الطلب من 2-3 أسابيع حسب حجم الطلبات وتوفر المستندات المطلوبة.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-unlimited-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium text-unlimited-dark-blue">ما هي المستندات الإضافية التي قد تكون مطلوبة؟</h4>
                    <p className="text-unlimited-gray text-sm mt-1">
                      قد تطلب الجامعة بعض المستندات الإضافية مثل خطاب توصية أو مقال شخصي أو شهادات إضافية حسب البرنامج المتقدم إليه.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-unlimited-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium text-unlimited-dark-blue">ماذا يعني القبول المشروط؟</h4>
                    <p className="text-unlimited-gray text-sm mt-1">
                      القبول المشروط يعني أنه تم قبولك في البرنامج مع بعض الشروط التي يجب تحقيقها، مثل تحقيق درجة معينة في اختبار اللغة أو اجتياز السنة التحضيرية.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-unlimited-blue mt-0.5" />
                  <div>
                    <h4 className="font-medium text-unlimited-dark-blue">كيف يمكنني معرفة حالة طلبي؟</h4>
                    <p className="text-unlimited-gray text-sm mt-1">
                      يمكنك متابعة حالة طلبك من خلال صفحة "طلباتي" في لوحة التحكم، حيث يتم تحديث حالة الطلب بشكل دوري.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <div className="space-y-3">
              <div className="border-l-4 border-unlimited-blue p-4 bg-blue-50 rounded-r-lg">
                <h4 className="font-medium text-unlimited-dark-blue">مراجعة طلبك جارية</h4>
                <p className="text-sm text-unlimited-gray mt-1">
                  نود إعلامك أن طلبك قيد المراجعة حالياً من قبل فريق القبول.
                </p>
                <p className="text-xs text-unlimited-gray mt-2">منذ 2 ساعة</p>
              </div>
              
              <div className="border-l-4 border-yellow-500 p-4 bg-yellow-50 rounded-r-lg">
                <h4 className="font-medium text-unlimited-dark-blue">مستند مطلوب</h4>
                <p className="text-sm text-unlimited-gray mt-1">
                  يرجى تحميل النسخة الأصلية من شهادة الثانوية العامة المصدقة.
                </p>
                <p className="text-xs text-unlimited-gray mt-2">منذ يوم واحد</p>
              </div>
              
              <div className="border-l-4 border-green-500 p-4 bg-green-50 rounded-r-lg">
                <h4 className="font-medium text-unlimited-dark-blue">تم استلام طلبك</h4>
                <p className="text-sm text-unlimited-gray mt-1">
                  تم استلام طلبك بنجاح وسيتم مراجعته في أقرب وقت.
                </p>
                <p className="text-xs text-unlimited-gray mt-2">منذ 3 أيام</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationMessages;
