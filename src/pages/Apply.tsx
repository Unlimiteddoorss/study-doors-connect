
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, GraduationCap, Globe, Book, Calendar, UserRoundCheck } from 'lucide-react';
import { PhotoUpload } from '@/components/applications/PhotoUpload';
import { DocumentUpload } from '@/components/applications/DocumentUpload';
import { ApplicationSteps, defaultApplicationSteps } from '@/components/applications/ApplicationSteps';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Apply = () => {
  useEffect(() => {
    document.title = 'تقديم طلب التسجيل - أبواب بلا حدود';
  }, []);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal-info');
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleStepChange = (step: number) => {
    const stepTabs = ['personal-info', 'academic-info', 'programs', 'documents', 'review'];
    if (step > 0 && step <= stepTabs.length) {
      setCurrentStep(step);
      setActiveTab(stepTabs[step - 1]);
    }
  };
  
  const handleNext = () => {
    const stepTabs = ['personal-info', 'academic-info', 'programs', 'documents', 'review'];
    const currentIndex = stepTabs.indexOf(activeTab);
    if (currentIndex < stepTabs.length - 1) {
      const nextTab = stepTabs[currentIndex + 1];
      setActiveTab(nextTab);
      setCurrentStep(currentIndex + 2);
    }
  };
  
  const handlePrevious = () => {
    const stepTabs = ['personal-info', 'academic-info', 'programs', 'documents', 'review'];
    const currentIndex = stepTabs.indexOf(activeTab);
    if (currentIndex > 0) {
      const prevTab = stepTabs[currentIndex - 1];
      setActiveTab(prevTab);
      setCurrentStep(currentIndex);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم مراجعة طلبك والتواصل معك قريباً",
      });
      navigate('/dashboard/applications');
    }, 2000);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'personal-info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <PhotoUpload 
                  label="صورة شخصية" 
                  description="أضف صورة شخصية بخلفية بيضاء"
                  required
                />
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-unlimited-gray mb-2">الاسم الأول <span className="text-red-500">*</span></label>
                  <Input placeholder="الاسم الأول" className="w-full" />
                </div>
                <div>
                  <label className="block text-unlimited-gray mb-2">اسم العائلة <span className="text-red-500">*</span></label>
                  <Input placeholder="اسم العائلة" className="w-full" />
                </div>
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">تاريخ الميلاد <span className="text-red-500">*</span></label>
                <Input type="date" className="w-full" />
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">الجنسية <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الجنسية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="syria">سوريا</SelectItem>
                    <SelectItem value="jordan">الأردن</SelectItem>
                    <SelectItem value="egypt">مصر</SelectItem>
                    <SelectItem value="iraq">العراق</SelectItem>
                    <SelectItem value="saudi">السعودية</SelectItem>
                    <SelectItem value="uae">الإمارات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                <Input placeholder="رقم الهاتف" className="w-full" />
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
                <Input placeholder="البريد الإلكتروني" className="w-full" type="email" />
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">رقم جواز السفر <span className="text-red-500">*</span></label>
                <Input placeholder="رقم جواز السفر" className="w-full" />
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">تاريخ انتهاء جواز السفر <span className="text-red-500">*</span></label>
                <Input type="date" className="w-full" />
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">الجنس <span className="text-red-500">*</span></label>
                <RadioGroup defaultValue="male" className="flex gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">ذكر</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">أنثى</Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">الحالة الاجتماعية</label>
                <RadioGroup defaultValue="single" className="flex gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">أعزب</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">متزوج</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div>
              <label className="block text-unlimited-gray mb-2">عنوان الإقامة في الخارج</label>
              <Textarea placeholder="أدخل عنوان الإقامة" className="w-full" />
            </div>
          </div>
        );
      
      case 'academic-info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-unlimited-gray mb-2">آخر شهادة <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الشهادة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">الثانوية العامة</SelectItem>
                    <SelectItem value="bachelor">البكالوريوس</SelectItem>
                    <SelectItem value="master">الماجستير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">سنة التخرج <span className="text-red-500">*</span></label>
                <Input type="number" placeholder="سنة التخرج" className="w-full" />
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">المعدل العام <span className="text-red-500">*</span></label>
                <Input placeholder="المعدل العام" className="w-full" />
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">التخصص <span className="text-red-500">*</span></label>
                <Input placeholder="التخصص" className="w-full" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-unlimited-gray mb-2">المؤسسة التعليمية <span className="text-red-500">*</span></label>
                <Input placeholder="اسم المدرسة أو الجامعة" className="w-full" />
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">مستوى اللغة الإنجليزية</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">مبتدئ</SelectItem>
                    <SelectItem value="intermediate">متوسط</SelectItem>
                    <SelectItem value="advanced">متقدم</SelectItem>
                    <SelectItem value="fluent">طلاقة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-unlimited-gray mb-2">هل لديك شهادة لغة (توفل، آيلتس، ...الخ)؟</label>
                <RadioGroup defaultValue="no" className="flex gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="yes" id="has-cert" />
                    <Label htmlFor="has-cert">نعم</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="no" id="no-cert" />
                    <Label htmlFor="no-cert">لا</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        );
      
      case 'programs':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-unlimited-gray mb-2">الدولة <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="turkey">تركيا</SelectItem>
                    <SelectItem value="cyprus">قبرص</SelectItem>
                    <SelectItem value="hungary">المجر</SelectItem>
                    <SelectItem value="poland">بولندا</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">المدينة</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر المدينة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="istanbul">اسطنبول</SelectItem>
                    <SelectItem value="ankara">أنقرة</SelectItem>
                    <SelectItem value="izmir">إزمير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">الجامعة <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الجامعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">جامعة إسطنبول جيليشيم</SelectItem>
                    <SelectItem value="2">جامعة أوزيجين</SelectItem>
                    <SelectItem value="3">جامعة فاتح سلطان محمد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">مستوى الدراسة <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bachelor">بكالوريوس</SelectItem>
                    <SelectItem value="master">ماجستير</SelectItem>
                    <SelectItem value="phd">دكتوراه</SelectItem>
                    <SelectItem value="diploma">دبلوم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">البرنامج <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر البرنامج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">بكالوريوس إدارة الأعمال</SelectItem>
                    <SelectItem value="2">ماجستير علوم الحاسوب</SelectItem>
                    <SelectItem value="3">دكتوراه الهندسة المدنية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-unlimited-gray mb-2">لغة الدراسة <span className="text-red-500">*</span></label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">الإنجليزية</SelectItem>
                    <SelectItem value="turkish">التركية</SelectItem>
                    <SelectItem value="arabic">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border p-4 rounded-lg bg-unlimited-blue/5 flex items-center gap-4">
              <div className="bg-unlimited-blue/10 rounded-full p-3">
                <Calendar className="h-6 w-6 text-unlimited-blue" />
              </div>
              <div>
                <h3 className="font-medium">موعد بدء الدراسة</h3>
                <p className="text-sm text-unlimited-gray">يرجى اختيار الفصل الدراسي المناسب للبدء</p>
              </div>
              <div className="mr-auto">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفصل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fall-2025">خريف 2025</SelectItem>
                    <SelectItem value="spring-2026">ربيع 2026</SelectItem>
                    <SelectItem value="summer-2026">صيف 2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="border p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">برامج أخرى</h3>
                <Button variant="outline" className="text-unlimited-blue">
                  إضافة برنامج آخر +
                </Button>
              </div>
              <p className="text-sm text-unlimited-gray">
                يمكنك إضافة برامج أخرى كخيارات بديلة في حال كانت هناك منافسة على البرنامج الأساسي
              </p>
            </div>
          </div>
        );
      
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-lg font-medium text-unlimited-dark-blue mb-1">المستندات الرسمية</h3>
              <p className="text-sm text-unlimited-gray">
                جميع المستندات يجب أن تكون واضحة وبصيغة PDF أو صور عالية الجودة
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <DocumentUpload 
                label="جواز السفر" 
                description="قم برفع صورة عن جواز السفر الخاص بك (PDF أو JPG)" 
                required
              />
              
              <DocumentUpload 
                label="الشهادة الثانوية" 
                description="قم برفع نسخة عن الشهادة الثانوية (PDF أو JPG)" 
                required
              />
              
              <DocumentUpload 
                label="كشف علامات" 
                description="قم برفع نسخة عن كشف العلامات (PDF أو JPG)" 
                required
              />
              
              <DocumentUpload 
                label="شهادة لغة (إن وجدت)" 
                description="قم برفع نسخة عن شهادة اللغة (توفل، آيلتس، ..الخ)" 
              />
              
              <DocumentUpload 
                label="السيرة الذاتية" 
                description="قم برفع سيرتك الذاتية إن وجدت (PDF)" 
              />
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-unlimited-blue/5 p-6 rounded-lg border border-unlimited-blue/20">
              <div className="flex gap-3 items-center mb-4">
                <UserRoundCheck className="h-6 w-6 text-unlimited-blue" />
                <h3 className="text-lg font-medium text-unlimited-dark-blue">مراجعة المعلومات</h3>
              </div>
              <p className="text-unlimited-gray mb-4">
                يرجى مراجعة جميع المعلومات التي قمت بإدخالها قبل إرسال الطلب. بعد إرسال الطلب، سيقوم فريقنا بمراجعته والتواصل معك في أقرب وقت.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-unlimited-blue">المعلومات الشخصية</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">الاسم الكامل</span>
                        <span>محمد أحمد علي</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">تاريخ الميلاد</span>
                        <span>15/05/1998</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">الجنسية</span>
                        <span>سوريا</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">رقم جواز السفر</span>
                        <span>N12345678</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-unlimited-blue">المعلومات الأكاديمية</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">آخر شهادة</span>
                        <span>الثانوية العامة</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">المعدل</span>
                        <span>88%</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">سنة التخرج</span>
                        <span>2022</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-unlimited-blue">تفاصيل البرنامج</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">الجامعة</span>
                        <span>جامعة اسطنبول</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">البرنامج</span>
                        <span>بكالوريوس هندسة البرمجيات</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">لغة الدراسة</span>
                        <span>الإنجليزية</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span className="text-unlimited-gray">بدء الدراسة</span>
                        <span>خريف 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-unlimited-blue">المستندات المرفقة</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between py-1 border-b text-unlimited-blue">
                        <span>جواز السفر</span>
                        <span className="underline cursor-pointer">عرض</span>
                      </div>
                      <div className="flex justify-between py-1 border-b text-unlimited-blue">
                        <span>الشهادة الثانوية</span>
                        <span className="underline cursor-pointer">عرض</span>
                      </div>
                      <div className="flex justify-between py-1 border-b text-unlimited-blue">
                        <span>كشف علامات</span>
                        <span className="underline cursor-pointer">عرض</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <input id="agreement" type="checkbox" className="ml-2" />
                <label htmlFor="agreement" className="text-sm">
                  أوافق على جميع الشروط والأحكام وأؤكد صحة جميع المعلومات المقدمة
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
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
          <ApplicationSteps
            currentStep={currentStep} 
            steps={defaultApplicationSteps}
            onStepChange={handleStepChange}
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" dir="rtl">
            <TabsList className="hidden">
              <TabsTrigger value="personal-info">المعلومات الشخصية</TabsTrigger>
              <TabsTrigger value="academic-info">المعلومات الأكاديمية</TabsTrigger>
              <TabsTrigger value="programs">اختيار البرامج</TabsTrigger>
              <TabsTrigger value="documents">المستندات</TabsTrigger>
              <TabsTrigger value="review">المراجعة والتأكيد</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-8">
              <h2 className="text-xl font-bold text-unlimited-blue mb-6">
                {activeTab === 'personal-info' && 'المعلومات الشخصية'}
                {activeTab === 'academic-info' && 'المعلومات الأكاديمية'}
                {activeTab === 'programs' && 'اختيار البرامج'}
                {activeTab === 'documents' && 'المستندات المطلوبة'}
                {activeTab === 'review' && 'المراجعة والتأكيد'}
              </h2>
              
              {getTabContent()}
              
              <div className="mt-8 flex flex-wrap justify-between">
                {activeTab !== 'personal-info' && (
                  <Button variant="outline" onClick={handlePrevious}>
                    السابق
                  </Button>
                )}
                
                {activeTab !== 'review' ? (
                  <Button 
                    className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6 mr-auto"
                    onClick={handleNext}
                  >
                    التالي
                  </Button>
                ) : (
                  <Button 
                    className="bg-unlimited-blue hover:bg-unlimited-dark-blue text-white px-6 mr-auto"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Apply;
