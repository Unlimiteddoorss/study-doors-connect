
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import ProgramCard from '../programs/ProgramCard';
import { dummyPrograms } from '@/data/programsData';

const FeaturedPrograms = () => {
  // إضافة برنامج هندسة البرمجيات كبرنامج مميز
  const softwareEngineeringProgram = {
    id: 'software-engineering',
    title: 'هندسة البرمجيات',
    university: 'جامعة اسطنبول التقنية',
    location: 'Turkey، إسطنبول',
    language: 'الإنجليزية',
    duration: '4 سنوات',
    deadline: '2024/12/31',
    fee: '5500 دولار/سنوياً',
    isFeatured: true,
    image: '/lovable-uploads/9152a791-f246-458d-bd7c-b3c15d53cdbf.png',
    badges: ['بكالوريوس', 'معتمد دولياً', 'فرصة تدريب عملي']
  };

  // Filter featured programs
  const featuredPrograms = dummyPrograms
    .filter(program => program.isFeatured)
    .slice(0, 2);

  // Combine with software engineering program
  const allFeaturedPrograms = [softwareEngineeringProgram, ...featuredPrograms];

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
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          }
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {allFeaturedPrograms.map((program) => (
            <Link 
              key={program.id} 
              to={program.id === 'software-engineering' ? '/programs/software-engineering' : `/program/${program.id}`}
              className="transition-transform hover:scale-[1.02]"
            >
              <ProgramCard program={program} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
