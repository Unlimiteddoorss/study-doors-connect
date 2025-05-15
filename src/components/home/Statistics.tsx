
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CountUp from '@/components/shared/CountUp';

interface StatProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

const StatCard: React.FC<StatProps> = ({ value, label, icon, suffix = "" }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
      <CardContent className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
        {icon && (
          <div className="flex-shrink-0 w-12 h-12 bg-unlimited-blue/10 rounded-full flex items-center justify-center text-unlimited-blue">
            {icon}
          </div>
        )}
        <div>
          <p className="text-3xl font-bold text-unlimited-blue">
            <CountUp end={value} duration={1500} /> {suffix}
          </p>
          <p className="text-unlimited-gray dark:text-gray-300">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
};

interface CircularStatProps {
  percentage: number;
  text: string;
  label: string;
}

const CircularStat: React.FC<CircularStatProps> = ({ percentage, text, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 mb-3">
        <CircularProgressbar
          value={percentage}
          text={text}
          styles={buildStyles({
            textSize: '16px',
            pathColor: '#3B82F6',
            textColor: '#3B82F6',
            trailColor: '#E2E8F0',
          })}
        />
      </div>
      <p className="text-unlimited-gray dark:text-gray-300 text-center">{label}</p>
    </div>
  );
};

const Statistics = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-unlimited-dark-blue dark:text-white">الإحصائيات والأرقام</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            value={1500}
            label="طالب مسجل"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            suffix="+"
          />
          <StatCard 
            value={250}
            label="جامعة شريكة"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            suffix="+"
          />
          <StatCard 
            value={30}
            label="دولة حول العالم"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard 
            value={98}
            label="نسبة الرضا"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            suffix="%"
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10">
          <h3 className="text-2xl font-bold text-unlimited-blue mb-8 text-center">إحصائيات القبول للعام الأكاديمي 2025-2024</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            <CircularStat 
              percentage={92} 
              text="92%" 
              label="نسبة القبول في برامج البكالوريوس" 
            />
            <CircularStat 
              percentage={85} 
              text="85%" 
              label="نسبة القبول في برامج الماجستير" 
            />
            <CircularStat 
              percentage={70} 
              text="70%" 
              label="نسبة القبول في برامج الدكتوراه" 
            />
            <CircularStat 
              percentage={95} 
              text="95%" 
              label="نسبة الحصول على التأشيرة" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
