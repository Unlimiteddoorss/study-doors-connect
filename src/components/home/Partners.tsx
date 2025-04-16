import { useRef, useEffect, useState } from 'react';
import SectionTitle from '../shared/SectionTitle';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const Partners = () => {
  const [autoScroll, setAutoScroll] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoScroll || !containerRef.current) return;

    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const newPosition = scrollLeft + 1;

        if (scrollLeft >= maxScroll) {
          containerRef.current.scrollLeft = 0;
          setScrollPosition(0);
        } else {
          containerRef.current.scrollLeft = newPosition;
          setScrollPosition(newPosition);
        }
      }
    }, 50);

    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  const partners = [
    {
      name: 'Ozyegin University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Ozyegin_University_logo.png',
      description: 'جامعة عريقة في تركيا تأسست عام 2007',
      link: '/universities/ozyegin'
    },
    {
      name: 'Fatih Sultan Mehmet University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/27/Fatih_Sultan_Mehmet_Vak%C4%B1f_%C3%9Cniversitesi_logo.jpg',
      description: 'من أفضل الجامعات الخاصة في إسطنبول',
      link: '/universities/fatih'
    },
    {
      name: 'Budapest University of Technology',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/BME_logo.jpg',
      description: 'رائدة في مجال الهندسة والتكنولوجيا',
      link: '/universities/budapest'
    },
    {
      name: 'University of Warsaw',
      logo: 'https://upload.wikimedia.org/wikipedia/en/1/13/University_of_Warsaw_logo.png',
      description: 'أقدم وأرقى الجامعات في بولندا',
      link: '/universities/warsaw'
    },
    {
      name: 'Cairo University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Cairo_University_Crest.png',
      description: 'من أعرق الجامعات في الشرق الأوسط',
      link: '/universities/cairo'
    },
    {
      name: 'Czech Technical University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/CVUT_logo.png',
      description: 'متميزة في الدراسات التقنية والهندسية',
      link: '/universities/czech'
    },
  ];

  const handleScroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    
    const scrollContainer = containerRef.current;
    const scrollAmount = 300;
    
    if (direction === 'left') {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4"
      >
        <SectionTitle 
          title="شركاؤنا"
          subtitle="نتعاون مع أفضل الجامعات والمؤسسات التعليمية حول العالم"
          centered
        />
        
        <div className="flex justify-end mb-4 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full p-2 h-10 w-10" 
            onClick={() => handleScroll('left')}
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full p-2 h-10 w-10" 
            onClick={() => handleScroll('right')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button 
            variant={autoScroll ? "default" : "outline"} 
            size="sm" 
            onClick={() => setAutoScroll(!autoScroll)}
          >
            {autoScroll ? "إيقاف التمرير التلقائي" : "تشغيل التمرير التلقائي"}
          </Button>
        </div>
        
        <div className="mt-6 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div 
            ref={containerRef} 
            className="flex items-center gap-12 overflow-x-auto scrollbar-none py-8 transition-all duration-300"
            onMouseEnter={() => setAutoScroll(false)}
            onMouseLeave={() => setAutoScroll(true)}
          >
            {partners.map((partner, index) => (
              <motion.div 
                key={`${partner.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center min-w-[220px] cursor-pointer"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <div className={`relative h-28 w-28 rounded-full overflow-hidden transition-all duration-300
                ${hoveredIndex === index ? 'border-4 border-unlimited-blue shadow-lg' : 'border-4 border-gray-100'}`}>
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className={`h-20 w-20 object-contain transition-all duration-300 
                    ${hoveredIndex === index ? 'scale-110 grayscale-0' : 'grayscale hover:grayscale-0'}`}
                  />
                </div>
                <motion.p 
                  className="mt-3 text-unlimited-dark-blue font-medium text-center"
                  animate={{ 
                    color: hoveredIndex === index ? '#2563eb' : '#1e293b'
                  }}
                >
                  {partner.name}
                </motion.p>
                <p className="text-unlimited-gray text-sm text-center mt-1">{partner.description}</p>
                <Button 
                  variant="link" 
                  size="sm" 
                  asChild
                  className={`mt-2 transition-all duration-300 ${hoveredIndex === index ? 'text-unlimited-blue underline' : ''}`}
                >
                  <a href={partner.link}>تفاصيل أكثر</a>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Partners;
