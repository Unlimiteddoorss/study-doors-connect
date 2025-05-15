
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { dummyPrograms } from '@/data/programsData';
import { ProgramInfo } from '@/data/programsData';

const ProgramDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find program by ID
  const program = dummyPrograms.find(p => p.id === parseInt(id || '0'));
  
  if (!program) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">البرنامج غير موجود</h1>
            <p className="mb-6">لم يتم العثور على البرنامج المطلوب.</p>
            <Button asChild>
              <a href="/programs">العودة إلى البرامج</a>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">{program.name}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={program.university_image || "https://via.placeholder.com/800x400"} 
                alt={program.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{program.university}</h2>
                  <span className="bg-unlimited-blue text-white text-sm px-3 py-1 rounded-full">
                    {program.degree_type}
                  </span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">وصف البرنامج</h3>
                  <p className="text-unlimited-gray">{program.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-1">المدة</h4>
                    <p>{program.duration} سنوات</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-1">لغة الدراسة</h4>
                    <p>{program.language}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-1">الموقع</h4>
                    <p>{program.city}، {program.country}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-1">الرسوم الدراسية</h4>
                    <p>${program.tuition_fee} / سنوياً</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold mb-4">تقديم طلب</h3>
              <div className="mb-4">
                <p className="text-unlimited-gray mb-2">للتسجيل في هذا البرنامج، يرجى ملء استمارة الطلب.</p>
                <p className="text-xl font-semibold text-unlimited-blue mb-4">${program.tuition_fee} <span className="text-sm font-normal">/ سنوياً</span></p>
              </div>
              <Button asChild className="w-full">
                <a href={`/application?program=${program.id}`}>تقديم طلب</a>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">تحتاج مساعدة؟</h3>
              <p className="text-unlimited-gray mb-4">فريقنا جاهز للإجابة على جميع استفساراتك حول هذا البرنامج.</p>
              <Button variant="outline" className="w-full">
                تواصل معنا
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProgramDetails;
