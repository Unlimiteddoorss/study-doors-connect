
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { FileText, User, GraduationCap, Upload } from 'lucide-react';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    university: '',
    program: '',
    degreeType: '',
    previousEducation: '',
    gpa: '',
    englishLevel: '',
    personalStatement: '',
    documents: []
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // محاكاة إرسال البيانات
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم مراجعة طلبك والرد عليك قريباً"
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "خطأ في إرسال الطلب",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <Helmet>
        <title>تقديم طلب جديد | أبواب بلا حدود التعليمية</title>
        <meta name="description" content="قدم طلبك للدراسة في الجامعات المرموقة" />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-unlimited-dark-blue mb-4">
            تقديم طلب جديد للدراسة
          </h1>
          <p className="text-unlimited-gray">
            املأ النموذج التالي لتقديم طلبك للدراسة في الجامعات المرموقة
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* المعلومات الشخصية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-unlimited-blue" />
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="country">البلد *</Label>
                  <Select onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر البلد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">السعودية</SelectItem>
                      <SelectItem value="ae">الإمارات</SelectItem>
                      <SelectItem value="kw">الكويت</SelectItem>
                      <SelectItem value="qa">قطر</SelectItem>
                      <SelectItem value="bh">البحرين</SelectItem>
                      <SelectItem value="om">عمان</SelectItem>
                      <SelectItem value="jo">الأردن</SelectItem>
                      <SelectItem value="lb">لبنان</SelectItem>
                      <SelectItem value="eg">مصر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="city">المدينة *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* المعلومات الأكاديمية */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-unlimited-blue" />
                المعلومات الأكاديمية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="university">الجامعة المرغوبة *</Label>
                  <Select onValueChange={(value) => handleInputChange('university', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الجامعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="istanbul">جامعة إسطنبول</SelectItem>
                      <SelectItem value="ankara">جامعة أنقرة</SelectItem>
                      <SelectItem value="bogazici">جامعة البوسفور</SelectItem>
                      <SelectItem value="metu">جامعة الشرق الأوسط التقنية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="program">التخصص المرغوب *</Label>
                  <Select onValueChange={(value) => handleInputChange('program', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر التخصص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engineering">الهندسة</SelectItem>
                      <SelectItem value="medicine">الطب</SelectItem>
                      <SelectItem value="business">إدارة الأعمال</SelectItem>
                      <SelectItem value="law">القانون</SelectItem>
                      <SelectItem value="arts">الفنون</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="degreeType">نوع الدرجة *</Label>
                  <Select onValueChange={(value) => handleInputChange('degreeType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الدرجة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">بكالوريوس</SelectItem>
                      <SelectItem value="master">ماجستير</SelectItem>
                      <SelectItem value="phd">دكتوراه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="gpa">المعدل التراكمي</Label>
                  <Input
                    id="gpa"
                    value={formData.gpa}
                    onChange={(e) => handleInputChange('gpa', e.target.value)}
                    placeholder="مثال: 3.5"
                  />
                </div>
                <div>
                  <Label htmlFor="englishLevel">مستوى اللغة الإنجليزية</Label>
                  <Select onValueChange={(value) => handleInputChange('englishLevel', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">مبتدئ</SelectItem>
                      <SelectItem value="intermediate">متوسط</SelectItem>
                      <SelectItem value="advanced">متقدم</SelectItem>
                      <SelectItem value="native">متحدث أصلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="previousEducation">التعليم السابق</Label>
                <Textarea
                  id="previousEducation"
                  value={formData.previousEducation}
                  onChange={(e) => handleInputChange('previousEducation', e.target.value)}
                  placeholder="اذكر تفاصيل تعليمك السابق..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* البيان الشخصي */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-unlimited-blue" />
                البيان الشخصي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="personalStatement">لماذا تريد الدراسة في هذا التخصص؟ *</Label>
                <Textarea
                  id="personalStatement"
                  value={formData.personalStatement}
                  onChange={(e) => handleInputChange('personalStatement', e.target.value)}
                  placeholder="اكتب بياناً شخصياً يوضح دوافعك وأهدافك..."
                  rows={5}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* المستندات */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-unlimited-blue" />
                المستندات المطلوبة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">الشهادات الأكاديمية</h4>
                  <p className="text-sm text-gray-600 mb-3">ارفع شهاداتك الأكاديمية</p>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع الملفات
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">صورة جواز السفر</h4>
                  <p className="text-sm text-gray-600 mb-3">ارفع صورة واضحة لجواز السفر</p>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع الملفات
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">شهادة اللغة الإنجليزية</h4>
                  <p className="text-sm text-gray-600 mb-3">TOEFL أو IELTS (إن وجدت)</p>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع الملفات
                  </Button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium mb-2">مستندات إضافية</h4>
                  <p className="text-sm text-gray-600 mb-3">أي مستندات أخرى مطلوبة</p>
                  <Button type="button" variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    رفع الملفات
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* زر الإرسال */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="px-8"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
            </Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ApplicationForm;
