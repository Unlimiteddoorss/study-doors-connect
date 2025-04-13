
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, GraduationCap, Building, Plane, Home, Users } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const services = [
    {
      title: 'إدارة طلبات القبول',
      description: 'نساعدك في تقديم طلبات القبول للجامعات المناسبة وفقاً لاهتماماتك ومؤهلاتك',
      icon: <FileText className="h-10 w-10" />,
    },
    {
      title: 'اختيار التخصص المناسب',
      description: 'نقدم استشارات متخصصة لمساعدتك في اختيار التخصص الذي يناسب قدراتك وطموحاتك',
      icon: <GraduationCap className="h-10 w-10" />,
    },
    {
      title: 'اختيار الجامعة المناسبة',
      description: 'نساعدك في العثور على الجامعة المثالية التي تلبي احتياجاتك الأكاديمية والشخصية',
      icon: <Building className="h-10 w-10" />,
    },
    {
      title: 'خدمات التأشيرة',
      description: 'نقدم المساعدة في إجراءات التأشيرة والإقامة والأوراق المطلوبة للدراسة في الخارج',
      icon: <Plane className="h-10 w-10" />,
    },
    {
      title: 'خدمات السكن',
      description: 'نساعدك في العثور على السكن المناسب قريباً من الجامعة وبأسعار مناسبة',
      icon: <Home className="h-10 w-10" />,
    },
    {
      title: 'دعم الطلاب',
      description: 'نقدم الدعم المستمر للطلاب خلال فترة الدراسة ونتابع تقدمهم الأكاديمي',
      icon: <Users className="h-10 w-10" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="خدماتنا"
          subtitle="نقدم مجموعة متكاملة من الخدمات لمساعدة الطلاب على تحقيق أهدافهم الأكاديمية"
          centered
          className="mb-16"
        />
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card 
                className={`border-t-4 border-t-unlimited-blue transition-all duration-300 ${
                  hoveredIndex === index 
                    ? 'shadow-xl -translate-y-2 border-t-unlimited-light-blue' 
                    : 'hover:shadow-lg hover:-translate-y-1'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader>
                  <div className={`transition-colors duration-300 ${
                    hoveredIndex === index ? 'text-unlimited-light-blue' : 'text-unlimited-blue'
                  } mb-3`}>
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
