
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import ProgramCard from '../programs/ProgramCard';
import { dummyPrograms } from '@/data/programsData';

const FeaturedPrograms = () => {
  // Filter featured programs
  const featuredPrograms = dummyPrograms
    .filter(program => program.isFeatured)
    .slice(0, 3);

  // Ensure we have data for the featured programs
  if (featuredPrograms.length === 0) {
    console.warn("No featured programs found in dummyPrograms data");
  }

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
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
