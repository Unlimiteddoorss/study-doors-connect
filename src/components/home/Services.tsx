
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { School, FileText, GraduationCap, Building, PenTool, MessageSquare, Globe, FileCheck, ArrowRight } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const Services = () => {
  const services: Service[] = [
    {
      id: 1,
      title: 'استشارات تعليمية',
      description: 'نقدم استشارات شخصية لمساعدتك في اختيار المسار التعليمي المناسب والجامعة الأفضل لتخصصك وأهدافك المهنية.',
      icon: <GraduationCap />,
      color: 'bg-unlimited-blue/10 text-unlimited-blue'
    },
    {
      id: 2,
      title: 'التقديم للجامعات',
      description: 'نتولى إعداد وتقديم طلبات القبول للجامعات المختارة بشكل احترافي لزيادة فرص قبولك.',
      icon: <FileText />,
      color: 'bg-green-100 text-green-700'
    },
    {
      id: 3,
      title: 'المنح الدراسية',
      description: 'نساعدك في البحث عن المنح الدراسية المتاحة وإعداد طلبات التقديم للحصول على الدعم المالي.',
      icon: <School />,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 4,
      title: 'السكن الجامعي',
      description: 'نقدم خدمات البحث عن السكن المناسب قرب الجامعة وبأسعار تناسب ميزانيتك.',
      icon: <Building />,
      color: 'bg-yellow-100 text-yellow-700'
    },
    {
      id: 5,
      title: 'تجهيز المستندات',
      description: 'نساعدك في إعداد وترجمة وتصديق جميع المستندات المطلوبة للقبول الجامعي والتأشيرة.',
      icon: <FileCheck />,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: 6,
      title: 'خدمات الترجمة',
      description: 'نوفر خدمات ترجمة معتمدة لجميع الوثائق والشهادات المطلوبة للتقديم.',
      icon: <PenTool />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 7,
      title: 'التأشيرات الطلابية',
      description: 'نقدم المساعدة في إجراءات الحصول على التأشيرة الطلابية بسهولة وسرعة.',
      icon: <Globe />,
      color: 'bg-indigo-100 text-indigo-700'
    },
    {
      id: 8,
      title: 'دعم مستمر',
      description: 'نقدم الدعم المستمر للطلاب قبل وأثناء وبعد الالتحاق بالجامعة لضمان تجربة تعليمية ناجحة.',
      icon: <MessageSquare />,
      color: 'bg-teal-100 text-teal-700'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">خدماتنا التعليمية</h2>
        <p className="text-unlimited-gray max-w-3xl mx-auto">
          نقدم مجموعة شاملة من الخدمات المصممة لمساعدة الطلاب في كل خطوة من رحلتهم التعليمية في الخارج
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} className="border border-gray-100 hover:shadow-md transition-shadow overflow-hidden">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-3`}>
                {service.icon}
              </div>
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="p-0 h-auto text-unlimited-blue hover:text-unlimited-dark-blue">
                <Link to="/services" className="flex items-center">
                  اقرأ المزيد <ArrowRight className="mr-1 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;
