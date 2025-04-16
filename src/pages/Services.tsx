
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SectionTitle from '@/components/shared/SectionTitle';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  Building2, 
  Globe2, 
  FileCheck, 
  Handshake, 
  HeartHandshake,
  Clock,
  BadgeCheck,
  BookOpen,
  Plane,
  CreditCard,
  Languages
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// نموذج الخدمات مع تفاصيل إضافية
const servicesData = [
  {
    id: 1,
    title: 'استشارات القبول الجامعي',
    description: 'نقدم استشارات متخصصة لاختيار أفضل الجامعات والبرامج المناسبة لك',
    icon: GraduationCap,
    details: [
      'تقييم شامل للمؤهلات الأكاديمية',
      'تحديد أفضل الجامعات المناسبة لتخصصك',
      'المقارنة بين البرامج المختلفة',
      'تقديم معلومات حول متطلبات القبول',
      'إرشاد حول كيفية زيادة فرص القبول'
    ],
    link: '/programs'
  },
  {
    id: 2,
    title: 'خدمات التأشيرات',
    description: 'نساعدك في إجراءات التأشيرة الدراسية وتجهيز جميع المستندات المطلوبة',
    icon: Globe2,
    details: [
      'إرشاد حول متطلبات التأشيرة لكل دولة',
      'مراجعة وتدقيق جميع المستندات المطلوبة',
      'المساعدة في تعبئة نماذج طلب التأشيرة',
      'ترتيب مواعيد المقابلات في السفارات',
      'متابعة حالة طلب التأشيرة'
    ],
    link: '/countries'
  },
  {
    id: 3,
    title: 'تقديم الطلبات',
    description: 'نقوم بتقديم طلبات القبول نيابة عنك ومتابعتها مع الجامعات',
    icon: FileCheck,
    details: [
      'إعداد وتجهيز ملف التقديم الكامل',
      'التواصل المباشر مع الجامعات بالنيابة عنك',
      'ترجمة وتصديق المستندات المطلوبة',
      'متابعة حالة الطلب حتى صدور القبول',
      'التفاوض حول المنح الدراسية والخصومات'
    ],
    link: '/apply'
  },
  {
    id: 4,
    title: 'السكن الطلابي',
    description: 'نوفر خدمات البحث عن السكن المناسب وحجزه قبل وصولك',
    icon: Building2,
    details: [
      'البحث عن خيارات السكن المناسبة قرب الجامعة',
      'المقارنة بين أنواع السكنات المتاحة والأسعار',
      'حجز السكن المناسب قبل وصولك',
      'تزويدك بمعلومات عن المنطقة والخدمات المحيطة',
      'المساعدة في إجراءات التعاقد والدفع'
    ],
    link: '/services/accommodation'
  },
  {
    id: 5,
    title: 'خدمات ما بعد القبول',
    description: 'نقدم الدعم المستمر بعد القبول للتأكد من راحتك واستقرارك',
    icon: HeartHandshake,
    details: [
      'استقبال في المطار عند الوصول',
      'المساعدة في إجراءات التسجيل بالجامعة',
      'التوجيه للتأقلم مع الحياة الجامعية',
      'حل المشكلات التي قد تواجهك أثناء الدراسة',
      'دعم أكاديمي مستمر طوال فترة دراستك'
    ],
    link: '/services/support'
  },
  {
    id: 6,
    title: 'شراكات دولية',
    description: 'نتعاون مع أفضل الجامعات العالمية لضمان أفضل فرص التعليم',
    icon: Handshake,
    details: [
      'شراكات حصرية مع أكثر من 50 جامعة عالمية',
      'اتفاقيات خاصة للحصول على خصومات للطلاب',
      'برامج تبادل طلابي بين الجامعات الشريكة',
      'منح دراسية خاصة لطلاب أنليمتد إيدو',
      'تسهيل إجراءات التحويل بين الجامعات'
    ],
    link: '/universities'
  }
];

// خدمات إضافية
const additionalServices = [
  {
    id: 101,
    title: 'تعلم اللغات',
    description: 'دورات لغة مكثفة لتحسين مستوى اللغة المطلوبة للدراسة',
    icon: Languages,
    details: [
      'دورات لغة إنجليزية، تركية، ألمانية وغيرها',
      'معلمون متخصصون من ناطقين أصليين',
      'تحضير لاختبارات اللغة الدولية',
      'دورات مكثفة قبل بداية الدراسة'
    ]
  },
  {
    id: 102,
    title: 'الإرشاد الأكاديمي',
    description: 'توجيه أكاديمي مستمر لمساعدة الطلاب على التفوق',
    icon: BookOpen,
    details: [
      'مستشارون أكاديميون متخصصون',
      'وضع خطة دراسية ملائمة',
      'مراجعة وتقييم الأداء الأكاديمي',
      'نصائح للتعامل مع التحديات الدراسية'
    ]
  },
  {
    id: 103,
    title: 'الرحلات التعريفية',
    description: 'زيارات للجامعات والمدن الدراسية للتعرف عليها عن قرب',
    icon: Plane,
    details: [
      'زيارات منظمة للجامعات المختلفة',
      'لقاءات مع الطلاب والأساتذة',
      'التعرف على المرافق الجامعية',
      'استكشاف المدينة والثقافة المحلية'
    ]
  },
  {
    id: 104,
    title: 'خدمات الدفع الميسر',
    description: 'تسهيلات في دفع الرسوم الدراسية والمصاريف',
    icon: CreditCard,
    details: [
      'خيارات متعددة لدفع الرسوم الدراسية',
      'تقسيط المصاريف دون فوائد إضافية',
      'المساعدة في فتح حساب بنكي',
      'إرشادات حول تحويل الأموال الدولي'
    ]
  }
];

// الأسئلة الشائعة
const faqData = [
  {
    question: 'كيف تساعدوني في اختيار الجامعة المناسبة؟',
    answer: 'نقوم بتقييم شامل لمؤهلاتك وميولك ومتطلباتك المالية ثم نقدم لك قائمة بأفضل الخيارات المناسبة لك. نراعي عوامل مثل التصنيف الأكاديمي، التخصصات المتاحة، الرسوم الدراسية، فرص المنح، وموقع الجامعة.'
  },
  {
    question: 'هل تساعدون في الحصول على المنح الدراسية؟',
    answer: 'نعم، لدينا خبرة واسعة في مساعدة الطلاب للحصول على المنح الدراسية. نقوم بتحديد المنح التي تناسب مؤهلاتك ونساعدك في تجهيز جميع المستندات اللازمة للتقديم، كما نتابع طلب المنحة حتى الحصول عليها.'
  },
  {
    question: 'ما هي المستندات المطلوبة للتقديم؟',
    answer: 'المستندات الأساسية تشمل شهادة الثانوية العامة أو الشهادة الجامعية، جواز السفر، شهادة إثبات مستوى اللغة، السيرة الذاتية، ورسائل التوصية. قد تطلب بعض الجامعات مستندات إضافية حسب التخصص والمرحلة الدراسية.'
  },
  {
    question: 'كم تستغرق عملية القبول؟',
    answer: 'تختلف المدة حسب الجامعة والدولة، لكن عادة تستغرق من 2-8 أسابيع من تاريخ تقديم الطلب الكامل. نحن نتابع طلبك باستمرار ونبذل قصارى جهدنا لتسريع العملية.'
  },
  {
    question: 'هل تقدمون خدمات للدراسة في جميع الدول؟',
    answer: 'نعم، نقدم خدماتنا للدراسة في العديد من الدول مثل تركيا، المملكة المتحدة، الولايات المتحدة، كندا، ألمانيا، ماليزيا، روسيا، أوكرانيا، وغيرها من الدول.'
  },
  {
    question: 'هل هناك أي رسوم للاستشارة الأولية؟',
    answer: 'لا، الاستشارة الأولية مجانية بالكامل. نؤمن بأهمية مساعدتك في اتخاذ القرار المناسب دون أي التزامات مالية أولية.'
  }
];

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleServiceClick = (serviceId: number, link: string) => {
    setActiveService(serviceId);
    
    toast({
      title: "تم اختيار الخدمة",
      description: `سيتم توجيهك إلى صفحة ${servicesData.find(s => s.id === serviceId)?.title}`,
    });
    
    setTimeout(() => {
      navigate(link);
    }, 500);
  };

  const handleConsultation = () => {
    toast({
      title: "تم تقديم طلب الاستشارة",
      description: "سيتواصل معك أحد مستشارينا قريباً",
    });
    navigate('/contact');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <SectionTitle 
          title="خدماتنا" 
          subtitle="نقدم مجموعة شاملة من الخدمات التعليمية لمساعدتك في كل خطوة من رحلتك الدراسية"
          centered
        />

        {/* قسم الخدمات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {servicesData.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleServiceClick(service.id, service.link)}
              className={`bg-white p-6 rounded-lg shadow-sm transition-all duration-300 cursor-pointer hover:shadow-lg
                ${activeService === service.id ? 'border-2 border-unlimited-blue/50 bg-unlimited-blue/5' : 'border border-gray-100'}`}
            >
              <div className={`p-3 rounded-full w-fit mb-4 transition-all duration-300
                ${activeService === service.id ? 'bg-unlimited-blue text-white' : 'bg-unlimited-blue/10 text-unlimited-blue'}`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-unlimited-gray mb-4">
                {service.description}
              </p>
              <ul className="space-y-2 mb-4">
                {service.details.slice(0, 3).map((detail, idx) => (
                  <li key={idx} className="flex items-start">
                    <BadgeCheck className="h-5 w-5 text-unlimited-blue mt-0.5 ml-2 flex-shrink-0" />
                    <span className="text-unlimited-gray text-sm">{detail}</span>
                  </li>
                ))}
              </ul>
              <Button
                variant="link"
                className="p-0 text-unlimited-blue hover:text-unlimited-dark-blue flex items-center gap-2"
              >
                اكتشف المزيد
                <Clock className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* قسم كيف نعمل */}
        <div className="mt-24">
          <SectionTitle 
            title="كيف نعمل" 
            subtitle="عملية بسيطة تضمن لك تجربة دراسية ناجحة من البداية إلى النهاية"
            centered
          />
          
          <div className="mt-10 relative">
            {/* الخط الزمني */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-unlimited-blue/10 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "التسجيل والتقييم",
                  description: "بعد التسجيل، يقوم مستشارونا بدراسة ملفك الأكاديمي وتحديد أفضل الخيارات المناسبة لك",
                  icon: FileCheck
                },
                {
                  step: 2,
                  title: "اختيار البرنامج",
                  description: "مساعدتك في اختيار البرنامج والجامعة المثالية بناءً على اهتماماتك وميزانيتك",
                  icon: GraduationCap
                },
                {
                  step: 3,
                  title: "تقديم الطلب",
                  description: "نقوم بتجهيز وتقديم طلب القبول نيابة عنك ومتابعته حتى الحصول على القبول",
                  icon: BookOpen
                },
                {
                  step: 4,
                  title: "الدعم المستمر",
                  description: "مساعدتك في إجراءات التأشيرة والسكن والاستقرار في بلد الدراسة",
                  icon: HeartHandshake
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-unlimited-blue text-white flex items-center justify-center text-xl font-bold mb-4 z-10 relative">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">{item.title}</h3>
                    <p className="text-unlimited-gray text-center">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* قسم الخدمات الإضافية */}
        <div className="mt-24 bg-gray-50 p-8 rounded-lg">
          <SectionTitle 
            title="خدمات إضافية" 
            subtitle="نقدم مجموعة من الخدمات الإضافية لضمان تجربة تعليمية متكاملة"
            centered
          />
          
          <Tabs defaultValue="language" className="mt-10">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
              <TabsTrigger value="language">تعلم اللغات</TabsTrigger>
              <TabsTrigger value="academic">الإرشاد الأكاديمي</TabsTrigger>
              <TabsTrigger value="tours">الرحلات التعريفية</TabsTrigger>
              <TabsTrigger value="payment">خدمات الدفع</TabsTrigger>
            </TabsList>
            
            {additionalServices.map((service) => (
              <TabsContent key={service.id} value={
                service.id === 101 ? "language" : 
                service.id === 102 ? "academic" : 
                service.id === 103 ? "tours" : "payment"
              }>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-unlimited-blue/10 text-unlimited-blue">
                        <service.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                        <p className="text-unlimited-gray mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start">
                              <BadgeCheck className="h-5 w-5 text-unlimited-blue mt-0.5 ml-2" />
                              <span className="text-unlimited-gray">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-unlimited-blue hover:bg-unlimited-dark-blue"
                      onClick={handleConsultation}
                    >
                      احصل على استشارة مجانية
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* قسم الأسئلة الشائعة */}
        <div className="mt-24">
          <SectionTitle 
            title="الأسئلة الشائعة" 
            subtitle="إجابات لأكثر الأسئلة شيوعًا حول خدماتنا وعملية القبول الجامعي"
            centered
          />
          
          <div className="mt-10 space-y-4 max-w-4xl mx-auto">
            {faqData.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-6 rounded-lg shadow-sm cursor-pointer border transition-all duration-300
                  ${activeFaq === index ? 'border-unlimited-blue/50 shadow-md' : 'border-gray-100'}`}
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300
                    ${activeFaq === index ? 'bg-unlimited-blue text-white rotate-45' : 'bg-unlimited-blue/10 text-unlimited-blue'}`}>
                    {activeFaq === index ? '×' : '+'}
                  </div>
                </div>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="pt-4"
                  >
                    <p className="text-unlimited-gray">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* قسم الدعوة للتواصل */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-24 bg-unlimited-blue text-white p-8 md:p-12 rounded-lg text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">هل لديك أسئلة أخرى؟</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            فريق المستشارين لدينا جاهز للإجابة على جميع استفساراتك ومساعدتك في اختيار المسار التعليمي المناسب لك
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg"
              variant="secondary"
              onClick={() => navigate('/contact')}
              className="bg-white text-unlimited-blue hover:bg-white/90"
            >
              تواصل معنا الآن
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/apply')}
              className="border-white text-white hover:bg-white/10"
            >
              تقديم طلب التسجيل
            </Button>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Services;
