
import { GraduationCap, School, Globe, BookOpen } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import SectionTitle from '../shared/SectionTitle';

const Stats = () => {
  const stats = [
    {
      title: 'طلاب ناجحون',
      value: '10,000+',
      icon: <GraduationCap size={36} />,
    },
    {
      title: 'جامعات شريكة',
      value: '250+',
      icon: <School size={36} />,
    },
    {
      title: 'دول متاحة',
      value: '15+',
      icon: <Globe size={36} />,
    },
    {
      title: 'برامج دراسية',
      value: '1,000+',
      icon: <BookOpen size={36} />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="أرقامنا تتحدث عنا"
          subtitle="إنجازاتنا في مجال التعليم العالي على مدى سنوات"
          centered
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
          {stats.map((stat, index) => (
            <StatsCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
