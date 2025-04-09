
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ArrowRight, MapPin, School } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';

const FeaturedPrograms = () => {
  const programs = [
    {
      id: 1,
      title: 'بكالوريوس إدارة الأعمال',
      university: 'جامعة أوزيجين',
      location: 'تركيا، إسطنبول',
      language: 'الإنجليزية',
      duration: '4 سنوات',
      deadline: '15 أغسطس 2025',
      fee: '$13,000 / سنة',
      discount: '$12,350',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 2,
      title: 'ماجستير علوم الحاسوب',
      university: 'جامعة فاتح سلطان محمد',
      location: 'تركيا، إسطنبول',
      language: 'الإنجليزية',
      duration: 'سنتان',
      deadline: '1 يوليو 2025',
      fee: '$15,000 / سنة',
      discount: '$14,250',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
    {
      id: 3,
      title: 'دكتوراه الهندسة المدنية',
      university: 'جامعة المجر للتكنولوجيا',
      location: 'المجر، بودابست',
      language: 'الإنجليزية',
      duration: '4 سنوات',
      deadline: '15 سبتمبر 2025',
      fee: '$18,000 / سنة',
      discount: '$17,100',
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3'
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="البرامج المميزة"
          subtitle="برامجنا الأكثر شعبية بين الطلاب"
          action={
            <Button asChild variant="outline">
              <Link to="/programs" className="flex items-center">
                عرض جميع البرامج
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img 
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center text-unlimited-gray mb-2">
                  <School className="h-4 w-4 mr-1" />
                  <span className="text-sm">{program.university}</span>
                </div>
                <h3 className="font-bold text-lg line-clamp-2">{program.title}</h3>
                <div className="flex items-center text-unlimited-gray">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{program.location}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-unlimited-gray">اللغة:</span>
                    <p>{program.language}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">المدة:</span>
                    <p>{program.duration}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">الموعد النهائي:</span>
                    <p>{program.deadline}</p>
                  </div>
                  <div>
                    <span className="text-unlimited-gray">الرسوم:</span>
                    <p className="line-through text-unlimited-gray">{program.fee}</p>
                    <p className="font-semibold text-unlimited-blue">{program.discount}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to={`/programs/${program.id}`}>عرض التفاصيل</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
