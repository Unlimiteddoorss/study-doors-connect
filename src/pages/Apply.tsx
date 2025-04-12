
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileText, Upload } from 'lucide-react';

const Apply = () => {
  useEffect(() => {
    document.title = 'تقديم طلب التسجيل - أبواب بلا حدود';
  }, []);

  const [activeTab, setActiveTab] = useState('personal-info');
  
  return (
    <MainLayout>
      <div className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4 text-center">تقديم طلب التسجيل</h1>
          <p className="text-lg max-w-2xl mx-auto text-center">قم بإكمال نموذج التقديم للبدء في رحلتك الأكاديمية مع أبواب بلا حدود</p>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <Tabs defaultValue="personal-info" className="w-full" dir="rtl">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="personal-info">المعلومات الشخصية</TabsTrigger>
              <TabsTrigger value="academic-info">المعلومات الأكاديمية</TabsTrigger>
              <TabsTrigger value="programs">اختيار البرامج</TabsTrigger>
              <TabsTrigger value="documents">المستندات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal-info" className="space-y-4">
              <h2 className="text-xl font-bold text-unlimited-blue mb-6">المعلومات الشخصية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-unlimited-gray mb-2">الاسم الأول</label>
                  <Input placeholder="الاسم الأول" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">اسم العائلة</label>
                  <Input placeholder="اسم العائلة" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">تاريخ الميلاد</label>
                  <Input type="date" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">الجنسية</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled selected>اختر الجنسية</option>
                    <option value="syria">سوريا</option>
                    <option value="jordan">الأردن</option>
                    <option value="egypt">مصر</option>
                    <option value="iraq">العراق</option>
                    <option value="saudi">السعودية</option>
                    <option value="uae">الإمارات</option>
                  </select>
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">رقم الهاتف</label>
                  <Input placeholder="رقم الهاتف" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">البريد الإلكتروني</label>
                  <Input placeholder="البريد الإلكتروني" className="w-full" type="email" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6" onClick={() => setActiveTab('academic-info')}>
                  التالي
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="academic-info">
              <h2 className="text-xl font-bold text-unlimited-blue mb-6">المعلومات الأكاديمية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-unlimited-gray mb-2">آخر شهادة</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled selected>اختر الشهادة</option>
                    <option value="high_school">الثانوية العامة</option>
                    <option value="bachelor">البكالوريوس</option>
                    <option value="master">الماجستير</option>
                  </select>
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">سنة التخرج</label>
                  <Input type="number" placeholder="سنة التخرج" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">المعدل العام</label>
                  <Input placeholder="المعدل العام" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">التخصص</label>
                  <Input placeholder="التخصص" className="w-full" />
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('personal-info')}>
                  السابق
                </Button>
                <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6" onClick={() => setActiveTab('programs')}>
                  التالي
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="programs">
              <h2 className="text-xl font-bold text-unlimited-blue mb-6">اختيار البرامج</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-unlimited-gray mb-2">الدولة</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled selected>اختر الدولة</option>
                    <option value="turkey">تركيا</option>
                    <option value="cyprus">قبرص</option>
                    <option value="hungary">المجر</option>
                    <option value="poland">بولندا</option>
                  </select>
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">الجامعة</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled selected>اختر الجامعة</option>
                    <option value="1">جامعة إسطنبول جيليشيم</option>
                    <option value="2">جامعة أوزيجين</option>
                    <option value="3">جامعة فاتح سلطان محمد</option>
                  </select>
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">البرنامج</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                    <option value="" disabled selected>اختر البرنامج</option>
                    <option value="1">بكالوريوس إدارة الأعمال</option>
                    <option value="2">ماجستير علوم الحاسوب</option>
                    <option value="3">دكتوراه الهندسة المدنية</option>
                  </select>
                </div>
                <div>
                  <Button variant="outline" className="w-full">
                    إضافة برنامج آخر +
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('academic-info')}>
                  السابق
                </Button>
                <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6" onClick={() => setActiveTab('documents')}>
                  التالي
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="documents">
              <h2 className="text-xl font-bold text-unlimited-blue mb-6">المستندات المطلوبة</h2>
              
              <div className="space-y-6">
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-unlimited-blue/10 p-4">
                      <Upload className="h-8 w-8 text-unlimited-blue" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">جواز السفر</h3>
                  <p className="text-unlimited-gray text-sm mb-4">قم برفع صورة عن جواز السفر الخاص بك (PDF أو JPG)</p>
                  <Button variant="outline" className="mx-auto">
                    <FileText className="h-4 w-4 ml-2" />
                    اختيار الملف
                  </Button>
                </div>
                
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-unlimited-blue/10 p-4">
                      <Upload className="h-8 w-8 text-unlimited-blue" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">الشهادة الثانوية</h3>
                  <p className="text-unlimited-gray text-sm mb-4">قم برفع نسخة عن الشهادة الثانوية (PDF أو JPG)</p>
                  <Button variant="outline" className="mx-auto">
                    <FileText className="h-4 w-4 ml-2" />
                    اختيار الملف
                  </Button>
                </div>
                
                <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="rounded-full bg-unlimited-blue/10 p-4">
                      <Upload className="h-8 w-8 text-unlimited-blue" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">صورة شخصية</h3>
                  <p className="text-unlimited-gray text-sm mb-4">قم برفع صورة شخصية خلفية بيضاء (JPG)</p>
                  <Button variant="outline" className="mx-auto">
                    <FileText className="h-4 w-4 ml-2" />
                    اختيار الملف
                  </Button>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('programs')}>
                  السابق
                </Button>
                <Link to="/dashboard">
                  <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6">
                    إرسال الطلب
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Apply;
