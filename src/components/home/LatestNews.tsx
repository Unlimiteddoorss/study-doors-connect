
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type NewsItem = {
  id: number;
  title: string;
  date: string;
  category: 'عاجل' | 'تسجيل' | 'نتائج' | 'إعلان';
  link: string;
};

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "بدأ التسجيل على جامعة هجي تبة الحكومية",
    date: "2025-05-10",
    category: "تسجيل",
    link: "/turkish-applications",
  },
  {
    id: 2,
    title: "إصدار نتائج القبول في جامعة إسطنبول",
    date: "2025-05-08",
    category: "نتائج",
    link: "/programs",
  },
  {
    id: 3,
    title: "فتح باب المنح الدراسية للطلاب الدوليين",
    date: "2025-05-05",
    category: "إعلان",
    link: "/scholarships",
  },
  {
    id: 4,
    title: "موعد امتحان اليوس القادم في أنقرة",
    date: "2025-05-01",
    category: "عاجل",
    link: "/turkish-applications",
  },
  {
    id: 5,
    title: "بدء التسجيل في برامج الماجستير بجامعة بوغازيتشي",
    date: "2025-04-28",
    category: "تسجيل",
    link: "/programs?level=master",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'عاجل':
      return 'bg-red-500 hover:bg-red-600';
    case 'تسجيل':
      return 'bg-unlimited-blue hover:bg-unlimited-dark-blue';
    case 'نتائج':
      return 'bg-green-500 hover:bg-green-600';
    case 'إعلان':
      return 'bg-amber-500 hover:bg-amber-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const visibleItems = 3;
  
  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= newsItems.length ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 1 < 0 ? newsItems.length - 1 : prev - 1
    );
  };
  
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <section className="py-8 relative bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-unlimited-blue dark:text-unlimited-light-blue mr-2" />
            <h2 className="text-2xl font-bold text-unlimited-dark-blue dark:text-white">آخر الأخبار والمستجدات</h2>
          </div>
          <Link to="/news" className="text-unlimited-blue dark:text-unlimited-light-blue hover:underline flex items-center">
            كافة الأخبار
            <ChevronLeft className="h-4 w-4 mr-1" />
          </Link>
        </div>
        
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(${currentIndex * -100 / visibleItems}%)` }}
            >
              {newsItems.map((item) => (
                <div key={item.id} className="w-full md:w-1/3 px-2 flex-shrink-0">
                  <Card className="h-full dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between mb-2">
                        <Badge className={cn("text-white", getCategoryColor(item.category))}>
                          {item.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(item.date).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                      <h3 className="font-medium text-lg mb-4 line-clamp-2">
                        {item.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <Link to={item.link}>
                          <Button size="sm" variant="unlimited" className="text-sm">
                            اقرأ المزيد
                          </Button>
                        </Link>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full"
            onClick={prevSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-white dark:bg-gray-800 shadow-md rounded-full"
            onClick={nextSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex justify-center mt-4 gap-1">
            {newsItems.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx >= currentIndex && idx < currentIndex + visibleItems
                    ? 'w-6 bg-unlimited-blue'
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`انتقل إلى الشريحة ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
