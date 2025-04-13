
import { GraduationCap, School, Globe, BookOpen } from 'lucide-react';
import StatsCard from '../shared/StatsCard';
import SectionTitle from '../shared/SectionTitle';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    {
      title: 'طلاب ناجحون',
      value: 10000,
      formattedValue: '10,000+',
      icon: <GraduationCap size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'جامعات شريكة',
      value: 250,
      formattedValue: '250+',
      icon: <School size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'دول متاحة',
      value: 15,
      formattedValue: '15+',
      icon: <Globe size={42} className="text-unlimited-blue" />,
    },
    {
      title: 'برامج دراسية',
      value: 1000,
      formattedValue: '1,000+',
      icon: <BookOpen size={42} className="text-unlimited-blue" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="stats" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="أرقامنا تتحدث عنا"
          subtitle="إنجازاتنا في مجال التعليم العالي على مدى سنوات"
          centered
          className="mb-16"
        />
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          ref={ref}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <StatsCard 
                title={stat.title}
                value={
                  inView ? (
                    <CountUp 
                      end={stat.value} 
                      suffix="+" 
                      duration={2.5}
                      separator="," 
                      useEasing
                    />
                  ) : '0'
                }
                icon={stat.icon}
                className="transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
