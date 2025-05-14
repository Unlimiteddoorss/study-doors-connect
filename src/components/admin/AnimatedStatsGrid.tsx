
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'framer-motion';
import { Users, FileText, School, BookOpen, TrendingUp } from 'lucide-react';
import AnimatedStatCard from './AnimatedStatCard';
import { useTranslation } from 'react-i18next';

interface AnimatedStatsGridProps {
  className?: string;
}

const AnimatedStatsGrid = ({ className = '' }: AnimatedStatsGridProps) => {
  const { t } = useTranslation();
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ${className}`}
    >
      <AnimatedStatCard
        title={t('admin.stats.totalStudents')}
        value="1,234"
        icon={Users}
        description={t('admin.stats.increase12')}
        trend={{ value: 12.5, isPositive: true }}
        gradientFrom="unlimited-blue"
        gradientTo="unlimited-dark-blue"
      />

      <AnimatedStatCard
        title={t('admin.stats.activeApplications')}
        value="256"
        icon={FileText}
        description={t('admin.stats.increase5')}
        trend={{ value: 5.2, isPositive: true }}
        gradientFrom="unlimited-success"
        gradientTo="unlimited-success/70"
      />

      <AnimatedStatCard
        title={t('admin.stats.partneredUniversities')}
        value="45"
        icon={School}
        description={t('admin.stats.new2unis')}
        trend={{ value: 4.5, isPositive: true }}
        gradientFrom="unlimited-warning"
        gradientTo="unlimited-warning/70"
      />

      <AnimatedStatCard
        title={t('admin.stats.availablePrograms')}
        value="189"
        icon={BookOpen}
        description={t('admin.stats.new8programs')}
        trend={{ value: 8, isPositive: true }}
        gradientFrom="unlimited-dark-blue"
        gradientTo="unlimited-blue/70"
      />
    </motion.div>
  );
};

export default AnimatedStatsGrid;
