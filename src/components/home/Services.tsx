
import { 
  GraduationCap, 
  Building2, 
  Globe2, 
  FileCheck, 
  Handshake, 
  HeartHandshake 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const servicesData = [
  {
    id: 1,
    title: 'استشارات القبول الجامعي',
    description: 'نقدم استشارات متخصصة لاختيار أفضل الجامعات والبرامج المناسبة لك',
    icon: GraduationCap,
    link: '/programs'
  },
  {
    id: 2,
    title: 'خدمات التأشيرات',
    description: 'نساعدك في إجراءات التأشيرة الدراسية وتجهيز جميع المستندات المطلوبة',
    icon: Globe2,
    link: '/services'
  },
  {
    id: 3,
    title: 'تقديم الطلبات',
    description: 'نقوم بتقديم طلبات القبول نيابة عنك ومتابعتها مع الجامعات',
    icon: FileCheck,
    link: '/apply'
  },
  {
    id: 4,
    title: 'السكن الطلابي',
    description: 'نوفر خدمات البحث عن السكن المناسب وحجزه قبل وصولك',
    icon: Building2,
    link: '/services'
  },
  {
    id: 5,
    title: 'خدمات ما بعد القبول',
    description: 'نقدم الدعم المستمر بعد القبول للتأكد من راحتك واستقرارك',
    icon: HeartHandshake,
    link: '/services'
  },
  {
    id: 6,
    title: 'شراكات دولية',
    description: 'نتعاون مع أفضل الجامعات العالمية لضمان أفضل فرص التعليم',
    icon: Handshake,
    link: '/universities'
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-unlimited-dark-blue mb-4">خدماتنا</h2>
          <p className="text-unlimited-gray max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لمساعدتك في رحلتك التعليمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-unlimited-blue/10 rounded-full w-fit mb-4">
                <service.icon className="h-6 w-6 text-unlimited-blue" />
              </div>
              <h3 className="text-xl font-semibold text-unlimited-dark-blue mb-3">
                {service.title}
              </h3>
              <p className="text-unlimited-gray mb-4">
                {service.description}
              </p>
              <Button 
                variant="link" 
                className="text-unlimited-blue hover:text-unlimited-dark-blue p-0 flex items-center gap-2"
                onClick={() => navigate(service.link)}
              >
                اكتشف المزيد
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
