
import { useState, useEffect, useRef } from 'react';
import { Users2, GraduationCap, Building2, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsCard from '../shared/StatsCard';

const statsData = [
  {
    id: 1,
    title: 'طلاب مسجلين',
    value: '1,500+',
    icon: Users2,
    description: 'طالب وطالبة من مختلف أنحاء العالم',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'برامج دراسية',
    value: '200+',
    icon: GraduationCap,
    description: 'برنامج في مختلف التخصصات',
    color: 'bg-green-500'
  },
  {
    id: 3,
    title: 'جامعات شريكة',
    value: '50+',
    icon: Building2,
    description: 'جامعة عالمية معتمدة',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    title: 'نسبة قبول',
    value: '95%',
    icon: Award,
    description: 'معدل نجاح في القبول',
    color: 'bg-orange-500'
  }
];

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [animatedValues, setAnimatedValues] = useState<Record<number, string>>({});
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);

  const animateValue = (id: number, start: number, end: number, suffix: string, duration: number) => {
    if (isVisible) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        setAnimatedValues(prev => ({ ...prev, [id]: value + suffix }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isFirstLoad) {
          setIsVisible(true);
          setIsFirstLoad(false);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [isFirstLoad]);

  useEffect(() => {
    if (isVisible) {
      statsData.forEach(stat => {
        const value = parseInt(stat.value.replace(/[^0-9]/g, ''));
        const suffix = stat.value.replace(/[0-9]/g, '');
        animateValue(stat.id, 0, value, suffix, 2000);
      });
    }
  }, [isVisible]);

  const getDisplayValue = (stat: typeof statsData[0]) => {
    if (!isVisible) return '0';
    return animatedValues[stat.id] || stat.value;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-unlimited-dark-blue mb-4">الأرقام تتحدث عنا</h2>
          <p className="text-unlimited-gray max-w-2xl mx-auto">
            نفتخر بتحقيق نتائج متميزة لطلابنا في مختلف أنحاء العالم
          </p>
        </motion.div>
        
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
                scale: hoveredStat === stat.id ? 1.05 : 1
              }}
              onHoverStart={() => setHoveredStat(stat.id)}
              onHoverEnd={() => setHoveredStat(null)}
              transition={{ 
                duration: 0.5,
                delay: stat.id * 0.1
              }}
              className="transform transition-all duration-300"
            >
              <StatsCard
                title={stat.title}
                value={getDisplayValue(stat)}
                icon={<stat.icon className={`h-8 w-8 ${hoveredStat === stat.id ? 'text-unlimited-blue scale-110' : ''} transition-all duration-300`} />}
                className={`h-full hover:shadow-lg ${hoveredStat === stat.id ? 'border-2 border-unlimited-blue/20' : ''}`}
                iconClassName={`p-3 ${stat.color} bg-opacity-10 rounded-full transition-colors duration-300 ${hoveredStat === stat.id ? 'bg-opacity-20' : ''}`}
                valueClassName={`text-3xl font-bold mb-2 ${hoveredStat === stat.id ? 'text-unlimited-blue scale-110' : 'text-unlimited-dark-blue'} transition-all duration-300`}
                titleClassName="text-lg font-semibold text-unlimited-blue mb-2"
              />
              <p className={`text-unlimited-gray text-center mt-2 transition-opacity duration-300 ${hoveredStat === stat.id ? 'opacity-100' : 'opacity-75'}`}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
