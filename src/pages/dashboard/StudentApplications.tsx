
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Eye, Download, MessageCircle } from 'lucide-react';

const StudentApplications = () => {
  useEffect(() => {
    document.title = 'طلباتي - أبواب بلا حدود';
  }, []);
  
  // Sample applications data
  const applications = [
    {
      id: 1,
      program: "بكالوريوس إدارة الأعمال",
      university: "جامعة أوزيجين",
      status: "مقبول",
      date: "15/04/2025",
      documents: [
        { id: 1, name: "جواز السفر", uploaded: true },
        { id: 2, name: "الشهادة الثانوية", uploaded: true },
        { id: 3, name: "صورة شخصية", uploaded: true }
      ],
      messages: 2
    },
    {
      id: 2,
      program: "ماجستير علوم الحاسوب",
      university: "جامعة فاتح سلطان محمد",
      status: "قيد المراجعة",
      date: "10/04/2025",
      documents: [
        { id: 1, name: "جواز السفر", uploaded: true },
        { id: 2, name: "الشهادة الثانوية", uploaded: true },
        { id: 3, name: "صورة شخصية", uploaded: true }
      ],
      messages: 0
    },
    {
      id: 3,
      program: "دكتوراه الهندسة المدنية",
      university: "جامعة المجر التكنولوجيا",
      status: "بانتظار المستندات",
      date: "05/04/2025",
      documents: [
        { id: 1, name: "جواز السفر", uploaded: false },
        { id: 2, name: "الشهادة الثانوية", uploaded: false },
        { id: 3, name: "صورة شخصية", uploaded: false }
      ],
      messages: 0
    }
  ];
  
  const [selectedApplication, setSelectedApplication] = useState(applications[0]);
  
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">طلباتي</h1>
          <Link to="/apply">
            <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
              تقديم طلب جديد
            </Button>
          </Link>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="accepted">مقبول</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            <TabsTrigger value="requires-documents">بانتظار المستندات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {applications.map((application) => (
              <Card 
                key={application.id}
                className={`mb-4 border-2 p-4 cursor-pointer transition-colors ${
                  selectedApplication.id === application.id 
                    ? 'border-unlimited-blue bg-blue-50' 
                    : 'hover:border-unlimited-blue/30'
                }`}
                onClick={() => setSelectedApplication(application)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                      <div className="w-12 h-12 bg-unlimited-blue/10 rounded-full flex items-center justify-center">
                        <span className="text-unlimited-blue font-bold">{application.id}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg">{application.program}</h3>
                      <p className="text-unlimited-gray">{application.university}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <div className="text-unlimited-gray">{application.date}</div>
                    
                    {application.status === 'مقبول' && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        مقبول
                      </span>
                    )}
                    
                    {application.status === 'قيد المراجعة' && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        قيد المراجعة
                      </span>
                    )}
                    
                    {application.status === 'بانتظار المستندات' && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        بانتظار المستندات
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
            
            {selectedApplication && (
              <div className="mt-8">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-bold mb-6">تفاصيل الطلب</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold mb-4 text-unlimited-blue">معلومات البرنامج</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-unlimited-gray">البرنامج</span>
                          <span>{selectedApplication.program}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-unlimited-gray">الجامعة</span>
                          <span>{selectedApplication.university}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-unlimited-gray">تاريخ التقديم</span>
                          <span>{selectedApplication.date}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-unlimited-gray">الحالة</span>
                          <span>
                            {selectedApplication.status === 'مقبول' && (
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                مقبول
                              </span>
                            )}
                            
                            {selectedApplication.status === 'قيد المراجعة' && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                قيد المراجعة
                              </span>
                            )}
                            
                            {selectedApplication.status === 'بانتظار المستندات' && (
                              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                بانتظار المستندات
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue">
                          <Eye className="h-4 w-4 mr-2" />
                          تفاصيل الطلب
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-4 text-unlimited-blue">المستندات المطلوبة:</h3>
                      
                      <div className="space-y-3">
                        {selectedApplication.documents.map((document) => (
                          <div key={document.id} className="flex justify-between items-center border-b pb-3">
                            <span>{document.name}</span>
                            {document.uploaded ? (
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-1" />
                                تنزيل
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-unlimited-blue hover:bg-unlimited-dark-blue">
                                تحميل
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6">
                        <Button variant="outline" className="w-full">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          الرسائل
                          {selectedApplication.messages > 0 && (
                            <span className="ml-1 bg-unlimited-blue text-white text-xs rounded-full w-5 h-5 inline-flex items-center justify-center">
                              {selectedApplication.messages}
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="accepted">
            {/* Similar structure but filtered for accepted applications */}
          </TabsContent>
          
          <TabsContent value="pending">
            {/* Similar structure but filtered for pending applications */}
          </TabsContent>
          
          <TabsContent value="requires-documents">
            {/* Similar structure but filtered for applications requiring documents */}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentApplications;
