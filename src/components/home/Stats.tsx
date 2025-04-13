
import { GraduationCap, School, Globe, BookOpen } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import SectionTitle from '../shared/SectionTitle';

const Stats = () => {
  const stats = [
    {
      title: 'طلاب ناجحون',
      value: '10,000+',
      icon: <GraduationCap size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'جامعات شريكة',
      value: '250+',
      icon: <School size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'دول متاحة',
      value: '15+',
      icon: <Globe size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'برامج دراسية',
      value: '1,000+',
      icon: <BookOpen size={42} className="text-unlimited-blue" />,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="أرقامنا تتحدث عنا"
          subtitle="إنجازاتنا في مجال التعليم العالي على مدى سنوات"
          centered
          className="mb-16"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              className="transition-all duration-300 hover:-translate-y-2"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
