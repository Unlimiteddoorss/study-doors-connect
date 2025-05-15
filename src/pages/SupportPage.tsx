
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import FAQ from '@/components/shared/FAQ';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageSquare, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupportPage = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن",
    });
  };
  
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "اتصل بنا",
      details: "+90 555 123 4567",
      action: "اتصال مباشر",
      url: "tel:+905551234567"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "البريد الإلكتروني",
      details: "info@unlimiteddoorss.com",
      action: "إرسال بريد إلكتروني",
      url: "mailto:info@unlimiteddoorss.com"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "الدردشة الفورية",
      details: "متاحة من 9 صباحاً - 6 مساءً",
      action: "بدء الدردشة",
      url: "#chat"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "العنوان",
      details: "إسطنبول، تركيا",
      action: "عرض على الخريطة",
      url: "https://maps.google.com"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "ساعات العمل",
      details: "الإثنين - الجمعة: 9 صباحاً - 6 مساءً",
      action: null,
      url: null
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">الدعم والمساعدة</h1>
          <p className="text-unlimited-gray max-w-2xl mx-auto">
            نحن هنا لمساعدتك في كل خطوة من رحلتك التعليمية. تواصل معنا عبر إحدى قنوات الاتصال أدناه
            أو أرسل استفسارك من خلال نموذج التواصل.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-unlimited-light-blue/20 p-3 rounded-full text-unlimited-blue">
                  {method.icon}
                </div>
                <CardTitle className="text-lg mt-2">{method.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-unlimited-dark-blue font-medium">
                  {method.details}
                </CardDescription>
              </CardContent>
              {method.action && (
                <CardFooter className="justify-center pt-0">
                  <Button variant="link" asChild>
                    <a href={method.url || '#'} target={method.url?.startsWith('http') ? '_blank' : '_self'}>
                      {method.action}
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>إرسال استفسار</CardTitle>
              <CardDescription>
                املأ النموذج أدناه وسنقوم بالرد عليك في أقرب وقت ممكن
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input id="name" placeholder="أدخل اسمك الكامل" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input id="email" type="email" placeholder="أدخل بريدك الإلكتروني" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input id="phone" placeholder="أدخل رقم هاتفك" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">موضوع الاستفسار</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموضوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">استفسار عام</SelectItem>
                        <SelectItem value="application">تقديم طلب</SelectItem>
                        <SelectItem value="programs">البرامج الدراسية</SelectItem>
                        <SelectItem value="visa">التأشيرات</SelectItem>
                        <SelectItem value="scholarship">المنح الدراسية</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">الرسالة</Label>
                  <Textarea 
                    id="message" 
                    placeholder="اكتب رسالتك أو استفسارك هنا" 
                    rows={5} 
                    required 
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" className="w-full">
                    <Send className="ml-2 h-4 w-4" /> إرسال الاستفسار
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>الأسئلة المتكررة</CardTitle>
                <CardDescription>
                  تحقق من الأسئلة الشائعة أدناه للحصول على إجابات سريعة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">كيف يمكنني التقدم للدراسة في تركيا؟</h4>
                  <p className="text-sm text-unlimited-gray">
                    يمكنك التقديم من خلال منصتنا عبر الإنترنت أو التواصل مع فريق خدمة العملاء لدينا للمساعدة في عملية التقديم.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">ما هي المستندات المطلوبة للتقديم؟</h4>
                  <p className="text-sm text-unlimited-gray">
                    تشمل المستندات الأساسية: جواز السفر، شهادة الثانوية، كشف الدرجات، شهادة الكفاءة اللغوية، والصور الشخصية.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">هل تقدمون خدمات السكن؟</h4>
                  <p className="text-sm text-unlimited-gray">
                    نعم، نساعد في توفير خيارات السكن المناسبة للطلاب سواء في السكن الجامعي أو الشقق الخاصة.
                  </p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" asChild className="w-full">
                    <a href="#faq">عرض جميع الأسئلة الشائعة</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>تواصل معنا عبر وسائل التواصل الاجتماعي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    <span className="sr-only">WhatsApp</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div id="faq">
          <FAQ />
        </div>
        
        <div className="py-12">
          <iframe
            title="Our Location"
            className="w-full h-96 rounded-lg shadow-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.79327595977!2d28.87243096899412!3d41.00547913651695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2sus!4v1653508666465!5m2!1sen!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </MainLayout>
  );
};

export default SupportPage;
