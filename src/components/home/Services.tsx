
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GraduationCap, Building, Plane, Home, Users } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const Services = () => {
  const services = [
    {
      title: 'إدارة طلبات القبول',
      description: 'نساعدك في تقديم طلبات القبول للجامعات المناسبة وفقاً لاهتماماتك ومؤهلاتك',
      icon: <FileText className="h-8 w-8" />,
    },
    {
      title: 'اختيار التخصص المناسب',
      description: 'نقدم استشارات متخصصة لمساعدتك في اختيار التخصص الذي يناسب قدراتك وطموحاتك',
      icon: <GraduationCap className="h-8 w-8" />,
    },
    {
      title: 'اختيار الجامعة المناسبة',
      description: 'نساعدك في العثور على الجامعة المثالية التي تلبي احتياجاتك الأكاديمية والشخصية',
      icon: <Building className="h-8 w-8" />,
    },
    {
      title: 'خدمات التأشيرة',
      description: 'نقدم المساعدة في إجراءات التأشيرة والإقامة والأوراق المطلوبة للدراسة في الخارج',
      icon: <Plane className="h-8 w-8" />,
    },
    {
      title: 'خدمات السكن',
      description: 'نساعدك في العثور على السكن المناسب قريباً من الجامعة وبأسعار مناسبة',
      icon: <Home className="h-8 w-8" />,
    },
    {
      title: 'دعم الطلاب',
      description: 'نقدم الدعم المستمر للطلاب خلال فترة الدراسة ونتابع تقدمهم الأكاديمي',
      icon: <Users className="h-8 w-8" />,
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="خدماتنا"
          subtitle="نقدم مجموعة متكاملة من الخدمات لمساعدة الطلاب على تحقيق أهدافهم الأكاديمية"
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service, index) => (
            <Card key={index} className="border-t-4 border-t-unlimited-blue transition-all hover:shadow-md">
              <CardHeader>
                <div className="text-unlimited-blue mb-3">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
