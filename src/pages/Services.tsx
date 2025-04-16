
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Building2,
  Globe2,
  FileCheck,
  Handshake,
  HeartHandshake,
  Plane,
  BookOpen,
  Home,
  ClipboardList,
  Languages,
  BadgeCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const servicesData = [
  {
    id: 1,
    title: 'استشارات القبول الجامعي',
    description: 'نقدم استشارات متخصصة لمساعدتك في اختيار أفضل الجامعات والبرامج المناسبة لتخصصك وطموحاتك المستقبلية.',
    longDescription: 'يقوم فريقنا المتخصص بتحليل بياناتك الأكاديمية وتحديد الخيارات المناسبة لك مع مراعاة ميزانيتك ومتطلباتك الشخصية.',
    icon: GraduationCap,
    color: 'bg-blue-500/10 text-blue-500'
  },
  {
    id: 2,
    title: 'خدمات التأشيرات',
    description: 'نساعدك في إجراءات التأشيرة الدراسية وتجهيز جميع المستندات المطلوبة للحصول على تأشيرة دراسية بنجاح.',
    longDescription: 'نتولى كافة إجراءات التقديم للتأشيرات الدراسية ومتابعتها مع السفارات والقنصليات، مع تقديم الدعم الكامل في إعداد الملفات والوثائق المطلوبة وترجمتها عند الحاجة.',
    icon: Globe2,
    color: 'bg-green-500/10 text-green-500'
  },
  {
    id: 3,
    title: 'تقديم الطلبات',
    description: 'نقوم بتقديم طلبات القبول نيابة عنك ومتابعتها مع الجامعات حتى الحصول على قبول رسمي.',
    longDescription: 'نمتلك فريقًا محترفًا متخصصًا في تحضير طلبات القبول بشكل احترافي وتقديمها للجامعات ومتابعتها حتى الحصول على نتائج إيجابية.',
    icon: FileCheck,
    color: 'bg-purple-500/10 text-purple-500'
  },
  {
    id: 4,
    title: 'السكن الطلابي',
    description: 'نوفر خدمات البحث عن السكن المناسب وحجزه قبل وصولك إلى بلد الدراسة لضمان استقرارك.',
    longDescription: 'نقدم خيارات متعددة للسكن الطلابي تناسب ميزانيتك ومتطلباتك، سواء كانت سكنًا جامعيًا أو شقة مشتركة أو خاصة، ونتولى عملية الحجز والدفع وضمان جاهزية السكن قبل وصولك.',
    icon: Building2,
    color: 'bg-amber-500/10 text-amber-500'
  },
  {
    id: 5,
    title: 'خدمات ما بعد القبول',
    description: 'نقدم الدعم المستمر بعد القبول للتأكد من راحتك واستقرارك في بلد الدراسة وحل أي مشكلات قد تواجهك.',
    longDescription: 'نوفر خدمات استقبال في المطار، وتنظيم جولة تعريفية في المدينة، والمساعدة في فتح حساب بنكي، وشراء شريحة هاتف، والتسجيل في الجامعة، وكل ما يلزم لبداية سلسة.',
    icon: HeartHandshake,
    color: 'bg-red-500/10 text-red-500'
  },
  {
    id: 6,
    title: 'شراكات دولية',
    description: 'نتعاون مع أفضل الجامعات العالمية لضمان أفضل فرص التعليم وتقديم منح دراسية حصرية لطلابنا.',
    longDescription: 'بفضل شراكاتنا الاستراتيجية مع الجامعات، نستطيع تقديم عروض خاصة وخصومات حصرية على الرسوم الدراسية وتسهيل إجراءات القبول لطلابنا.',
    icon: Handshake,
    color: 'bg-sky-500/10 text-sky-500'
  },
  {
    id: 7,
    title: 'خدمات السفر',
    description: 'نوفر خدمات حجز تذاكر الطيران بأفضل الأسعار ونساعدك في تنظيم رحلتك بشكل كامل.',
    longDescription: 'نتعاون مع شركات طيران عالمية لتوفير أفضل العروض على تذاكر السفر للطلاب، مع إمكانية زيادة وزن الأمتعة المسموح بها وتوفير خدمة المساعدة في المطارات الدولية.',
    icon: Plane,
    color: 'bg-indigo-500/10 text-indigo-500'
  },
  {
    id: 8,
    title: 'الدورات التحضيرية',
    description: 'نقدم دورات تحضيرية للغات والامتحانات الدولية لتأهيلك لدخول الجامعة بثقة وكفاءة.',
    longDescription: 'نوفر دورات مكثفة وتدريبات عملية وامتحانات تجريبية لاختبارات التوفل، الآيلتس، السات، الجي آر إي وغيرها من الاختبارات المطلوبة للقبول الجامعي.',
    icon: BookOpen,
    color: 'bg-orange-500/10 text-orange-500'
  },
  {
    id: 9,
    title: 'خدمات الإقامة',
    description: 'نساعدك في الحصول على الإقامة الطلابية ومتابعة تجديدها طوال فترة دراستك.',
    longDescription: 'نتولى إجراءات الحصول على الإقامة الطلابية من بداية الوصول ومتابعة تجديدها بشكل دوري، بالإضافة إلى حل أي مشكلات قد تطرأ خلال فترة الدراسة.',
    icon: Home,
    color: 'bg-teal-500/10 text-teal-500'
  },
  {
    id: 10,
    title: 'التدريب العملي',
    description: 'نوفر فرص تدريب عملي للطلاب في شركات ومؤسسات دولية مرموقة لتعزيز السيرة الذاتية والخبرات.',
    longDescription: 'بفضل شبكة علاقاتنا الواسعة، نساعدك في الحصول على فرص تدريب عملي أثناء الدراسة أو بعد التخرج مباشرة مع شركاء في مختلف المجالات والتخصصات.',
    icon: ClipboardList,
    color: 'bg-pink-500/10 text-pink-500'
  },
  {
    id: 11,
    title: 'الترجمة والتصديقات',
    description: 'نقدم خدمات ترجمة الوثائق والشهادات وتصديقها من الجهات المعتمدة.',
    longDescription: 'نقدم خدمات ترجمة معتمدة للوثائق والشهادات الدراسية والمستندات الرسمية، مع ضمان تصديقها من وزارة الخارجية والسفارات المختلفة وفق متطلبات البلد المستهدف.',
    icon: Languages,
    color: 'bg-emerald-500/10 text-emerald-500'
  },
  {
    id: 12,
    title: 'خدمات معادلة الشهادات',
    description: 'نساعدك في عملية معادلة شهاداتك الدراسية واعتمادها في البلدان المختلفة.',
    longDescription: 'نقدم استشارات متخصصة حول معادلة الشهادات الأكاديمية بين الدول المختلفة، ونتولى إجراءات التقديم للجهات المسؤولة ومتابعة العملية حتى الاعتماد النهائي.',
    icon: BadgeCheck,
    color: 'bg-violet-500/10 text-violet-500'
  }
];

const Services = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <section className="bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                خدماتنا الشاملة
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl text-unlimited-light-blue/90 mb-8"
              >
                نقدم مجموعة متكاملة من الخدمات التعليمية والاستشارية لدعم الطلاب في رحلتهم الدراسية
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100 mx-2">
                  <Link to="/apply">تقدم الآن</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 mx-2 mt-3 md:mt-0">
                  <Link to="/contact">تواصل معنا</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-unlimited-dark-blue mb-4">خدماتنا المتميزة</h2>
              <p className="text-unlimited-gray max-w-2xl mx-auto">
                نفتخر بتقديم مجموعة متكاملة من الخدمات المصممة خصيصًا لتلبية احتياجات الطلاب الدوليين
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => (
                <motion.div 
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-t-4" style={{ borderTopColor: service.color.split(' ')[1].replace('text-', '').replace('500/10', '500') }}>
                    <CardHeader>
                      <div className={`p-3 rounded-full w-fit mb-4 ${service.color}`}>
                        <service.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-unlimited-dark-blue">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-unlimited-gray">{service.description}</p>
                      <ul className="mt-4 space-y-2 text-sm text-unlimited-gray">
                        {service.longDescription.split('. ').map((point, idx) => point.trim() && (
                          <li key={idx} className="flex items-start">
                            <span className="text-unlimited-blue mr-2 mt-1">•</span>
                            <span>{point}.</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="unlimited" className="w-full">
                        <Link to="/apply">الاستفادة من الخدمة</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl font-bold text-unlimited-dark-blue mb-4">لماذا تختار خدماتنا؟</h2>
              <p className="text-unlimited-gray mb-8">
                نلتزم بتقديم أفضل الخدمات التعليمية مع ضمان الجودة والدعم المستمر طوال رحلتك الدراسية
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-unlimited-blue mb-3">خبرة متخصصة</h3>
                  <p className="text-unlimited-gray">فريقنا يضم مستشارين تعليميين ذوي خبرة واسعة في مجال التعليم الدولي وقبول الطلاب.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-unlimited-blue mb-3">شراكات دولية</h3>
                  <p className="text-unlimited-gray">نتعاون مع أفضل الجامعات العالمية مما يتيح لنا تقديم عروض حصرية وخيارات متميزة لطلابنا.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-unlimited-blue mb-3">دعم متكامل</h3>
                  <p className="text-unlimited-gray">نقدم الدعم طوال رحلة الطالب من لحظة التقديم وحتى التخرج، مع متابعة مستمرة وحل للمشكلات.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-unlimited-blue mb-3">حلول مخصصة</h3>
                  <p className="text-unlimited-gray">نصمم خطة دراسية مخصصة لكل طالب بناءً على أهدافه وميزانيته ومهاراته الأكاديمية.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-unlimited-blue to-unlimited-dark-blue text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-6"
              >
                مستعدون لبدء رحلتك التعليمية؟
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-lg text-unlimited-light-blue/90 mb-8"
              >
                تواصل معنا الآن للحصول على استشارة مجانية وابدأ خطواتك نحو مستقبل أفضل
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100">
                  <Link to="/apply">تقديم طلب الآن</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/contact">تحدث مع مستشار</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Services;
