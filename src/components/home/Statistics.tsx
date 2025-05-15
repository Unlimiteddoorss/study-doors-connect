
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { School, Book, Globe, Award } from 'lucide-react';
import CountUp from 'react-countup';

const Statistics = () => {
  const stats = [
    {
      id: 1,
      title: 'طلاب مسجلين',
      value: 1250,
      icon: <School className="h-6 w-6" />,
      color: '#4F46E5',
      percentage: 85,
      description: 'من كافة أنحاء العالم العربي'
    },
    {
      id: 2,
      title: 'برامج دراسية',
      value: 456,
      icon: <Book className="h-6 w-6" />,
      color: '#0EA5E9',
      percentage: 92,
      description: 'في مختلف التخصصات'
    },
    {
      id: 3,
      title: 'جامعات متعاقدة',
      value: 78,
      icon: <Globe className="h-6 w-6" />,
      color: '#10B981',
      percentage: 76,
      description: 'في تركيا وأوروبا'
    },
    {
      id: 4,
      title: 'نسبة النجاح',
      value: 97,
      icon: <Award className="h-6 w-6" />,
      color: '#F59E0B',
      percentage: 97,
      description: 'في قبول الطلاب'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">نظرة على أرقامنا</h2>
        <p className="text-unlimited-gray max-w-3xl mx-auto">
          نفخر بتقديم خدمات تعليمية متميزة للطلاب من مختلف أنحاء العالم العربي في أفضل الجامعات التركية والأوروبية
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.id} className="overflow-hidden">
            <CardHeader className="bg-unlimited-light-blue/10 pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">{stat.title}</CardTitle>
                <div className="p-2 rounded-full bg-white/80 shadow-sm">
                  {stat.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-unlimited-blue">
                    <CountUp end={stat.value} duration={2.5} separator="," suffix={stat.id === 4 ? "%" : ""} />
                  </div>
                  <CardDescription className="mt-1">{stat.description}</CardDescription>
                </div>
                <div className="h-16 w-16">
                  <CircularProgressbar
                    value={stat.percentage}
                    text={`${stat.percentage}%`}
                    styles={buildStyles({
                      rotation: 0.25,
                      strokeLinecap: 'round',
                      textSize: '20px',
                      pathTransitionDuration: 1.5,
                      pathColor: stat.color,
                      textColor: stat.color,
                      trailColor: '#E5E7EB',
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
