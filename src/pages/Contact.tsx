
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionTitle from '@/components/shared/SectionTitle';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    country: '',
    program: '',
    university: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "تم إرسال رسالتك بنجاح",
        description: "سيتواصل معك فريقنا في أقرب وقت ممكن",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        country: '',
        program: '',
        university: '',
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle 
          title="تواصل معنا"
          subtitle="نحن هنا لمساعدتك في رحلتك التعليمية، لا تتردد في التواصل معنا"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* بيانات الاتصال */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">بيانات الاتصال</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-unlimited-blue/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-unlimited-blue" />
                    </div>
                    <div>
                      <p className="font-semibold">العنوان</p>
                      <p className="text-unlimited-gray">اسطنبول Bahçelievler تركيا</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-unlimited-blue/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-unlimited-blue" />
                    </div>
                    <div>
                      <p className="font-semibold">رقم الهاتف</p>
                      <p className="text-unlimited-gray">+90 55 24 212 214</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-unlimited-blue/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-unlimited-blue" />
                    </div>
                    <div>
                      <p className="font-semibold">البريد الإلكتروني</p>
                      <p className="text-unlimited-gray">unlimiteddoorss@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-unlimited-blue/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-unlimited-blue" />
                    </div>
                    <div>
                      <p className="font-semibold">ساعات العمل</p>
                      <p className="text-unlimited-gray">من الإثنين إلى الجمعة: 9 صباحًا - 6 مساءً</p>
                      <p className="text-unlimited-gray">السبت: 10 صباحًا - 3 مساءً</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">الدعم المباشر</h3>
                <p className="mb-4 text-unlimited-gray">
                  هل تريد التحدث مباشرة مع أحد مستشارينا؟ يمكنك الاتصال بنا مباشرة أو حجز موعد للاستشارة.
                </p>
                <div className="flex flex-col gap-2">
                  <Button className="bg-unlimited-blue hover:bg-unlimited-dark-blue flex items-center justify-center">
                    <Phone className="mr-2 h-4 w-4" />
                    اتصل بنا الآن
                  </Button>
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    حجز موعد استشارة
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="rounded-lg overflow-hidden h-64 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12049.057396560262!2d28.836861676806638!3d41.00471749287244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa42fac37da19%3A0x893d499a1e946ee7!2sBah%C3%A7elievler%2C%20Istanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1683558961037!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* نماذج الاتصال */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="inquiry" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="inquiry">استفسار عام</TabsTrigger>
                    <TabsTrigger value="application">طلب قبول</TabsTrigger>
                    <TabsTrigger value="consultation">طلب استشارة</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="inquiry">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            الاسم الكامل <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكامل"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            البريد الإلكتروني <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="أدخل بريدك الإلكتروني"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            رقم الهاتف
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="أدخل رقم هاتفك"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium mb-1">
                            الموضوع <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="موضوع الرسالة"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          الرسالة <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="اكتب رسالتك هنا..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="application">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            الاسم الكامل <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكامل"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            البريد الإلكتروني <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="أدخل بريدك الإلكتروني"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            رقم الهاتف <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="أدخل رقم هاتفك"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-1">
                            الدولة المستهدفة <span className="text-red-500">*</span>
                          </label>
                          <select 
                            id="country" 
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="">اختر الدولة</option>
                            <option value="turkey">تركيا</option>
                            <option value="uk">المملكة المتحدة</option>
                            <option value="usa">الولايات المتحدة</option>
                            <option value="germany">ألمانيا</option>
                            <option value="malaysia">ماليزيا</option>
                            <option value="other">أخرى</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="program" className="block text-sm font-medium mb-1">
                            البرنامج الدراسي
                          </label>
                          <select 
                            id="program" 
                            name="program"
                            value={formData.program}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="">اختر البرنامج</option>
                            <option value="bachelor">بكالوريوس</option>
                            <option value="master">ماجستير</option>
                            <option value="phd">دكتوراه</option>
                            <option value="language">دورة لغة</option>
                            <option value="other">أخرى</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="university" className="block text-sm font-medium mb-1">
                            الجامعة (اختياري)
                          </label>
                          <Input
                            id="university"
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                            placeholder="اسم الجامعة"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          تفاصيل إضافية <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="اكتب تفاصيل طلبك هنا..."
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="consultation">
                    <div className="text-center mb-6">
                      <MessageCircle className="h-12 w-12 text-unlimited-blue mx-auto mb-3" />
                      <h3 className="text-lg font-bold">احصل على استشارة مجانية</h3>
                      <p className="text-unlimited-gray mt-2">
                        تحدث مع خبرائنا للحصول على المشورة المناسبة لخياراتك الدراسية
                      </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            الاسم الكامل <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="أدخل اسمك الكامل"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1">
                            رقم الهاتف <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="أدخل رقم هاتفك"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            البريد الإلكتروني <span className="text-red-500">*</span>
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="أدخل بريدك الإلكتروني"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium mb-1">
                            الدولة المهتم بها <span className="text-red-500">*</span>
                          </label>
                          <select 
                            id="country" 
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          >
                            <option value="">اختر الدولة</option>
                            <option value="turkey">تركيا</option>
                            <option value="uk">المملكة المتحدة</option>
                            <option value="usa">الولايات المتحدة</option>
                            <option value="germany">ألمانيا</option>
                            <option value="malaysia">ماليزيا</option>
                            <option value="other">أخرى</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">
                          استفساراتك <span className="text-red-500">*</span>
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="ما هي الاستفسارات التي تود مناقشتها مع المستشار؟"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'جاري الإرسال...' : 'طلب استشارة'}
                      </Button>
                      
                      <p className="text-sm text-unlimited-gray text-center">
                        سيتواصل معك أحد مستشارينا خلال 24 ساعة لتحديد موعد الاستشارة
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">ما هي متطلبات القبول العامة للجامعات التركية؟</h3>
                <p className="text-unlimited-gray">
                  تختلف متطلبات القبول حسب الجامعة والبرنامج، لكن بشكل عام تتضمن شهادة الثانوية العامة، 
                  وشهادة إتقان اللغة (الإنجليزية أو التركية)، وبعض الوثائق الشخصية. يمكنك التواصل معنا 
                  للحصول على معلومات دقيقة حسب احتياجاتك.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">هل خدمات الاستشارة التعليمية لديكم مجانية؟</h3>
                <p className="text-unlimited-gray">
                  نعم، نقدم استشارات تعليمية مجانية للطلاب الراغبين في الدراسة بالخارج. نساعدك في 
                  اختيار الجامعة والبرنامج المناسب، وشرح متطلبات القبول، وتقديم النصائح حول الإقامة والتأشيرة.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">كم تستغرق عملية القبول في الجامعات التركية؟</h3>
                <p className="text-unlimited-gray">
                  تستغرق عملية القبول عادة من 2-4 أسابيع من تاريخ تقديم الطلب الكامل. بعض الجامعات قد تستغرق 
                  وقتًا أطول في فترات التقديم المزدحمة. نحن نساعدك في متابعة طلبك وتسريع العملية قدر الإمكان.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">هل تساعدون في الحصول على المنح الدراسية؟</h3>
                <p className="text-unlimited-gray">
                  نعم، نقدم المساعدة للطلاب المؤهلين في البحث عن المنح الدراسية وتقديم الطلبات. نحن على دراية 
                  بجميع الفرص المتاحة ونساعدك في إعداد ملف تقديم قوي يزيد من فرصك في الحصول على منحة.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
