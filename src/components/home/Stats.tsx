
import { useEffect, useState, useRef } from 'react';
import { Users2, GraduationCap, Building2, Award } from 'lucide-react';

const statsData = [
  {
    id: 1,
    title: 'طلاب مسجلين',
    value: '1,500+',
    icon: Users2,
    description: 'طالب وطالبة من مختلف أنحاء العالم'
  },
  {
    id: 2,
    title: 'برامج دراسية',
    value: '200+',
    icon: GraduationCap,
    description: 'برنامج في مختلف التخصصات'
  },
  {
    id: 3,
    title: 'جامعات شريكة',
    value: '50+',
    icon: Building2,
    description: 'جامعة عالمية معتمدة'
  },
  {
    id: 4,
    title: 'نسبة قبول',
    value: '95%',
    icon: Award,
    description: 'معدل نجاح في القبول'
  }
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <div 
              key={stat.id} 
              className={`flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ 
                transitionDelay: `${stat.id * 150}ms`
              }}
            >
              <div className="p-3 bg-unlimited-blue/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-unlimited-blue" />
              </div>
              <h3 className="text-3xl font-bold text-unlimited-dark-blue mb-2">{stat.value}</h3>
              <p className="text-lg font-semibold text-unlimited-blue mb-2">{stat.title}</p>
              <p className="text-unlimited-gray text-center">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
