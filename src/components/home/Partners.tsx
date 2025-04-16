import { useRef, useEffect } from 'react';
import SectionTitle from '../shared/SectionTitle';
import { motion } from 'framer-motion';

const Partners = () => {
  const partners = [
    {
      name: 'Ozyegin University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Ozyegin_University_logo.png',
    },
    {
      name: 'Fatih Sultan Mehmet University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/2/27/Fatih_Sultan_Mehmet_Vak%C4%B1f_%C3%9Cniversitesi_logo.jpg',
    },
    {
      name: 'Budapest University of Technology',
      logo: 'https://upload.wikimedia.org/wikipedia/en/d/d4/BME_logo.jpg',
    },
    {
      name: 'University of Warsaw',
      logo: 'https://upload.wikimedia.org/wikipedia/en/1/13/University_of_Warsaw_logo.png',
    },
    {
      name: 'Cairo University',
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Cairo_University_Crest.png',
    },
    {
      name: 'Czech Technical University',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/13/CVUT_logo.png',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    let scrollPos = 0;
    const maxScroll = scrollWidth - clientWidth;

    const scroll = () => {
      if (!scrollContainer) return;
      scrollPos = (scrollPos + 0.5) % maxScroll;
      scrollContainer.scrollLeft = scrollPos;
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

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
        
        <div className="mt-10 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div 
            ref={containerRef} 
            className="flex items-center gap-12 overflow-hidden whitespace-nowrap py-8"
          >
            {[...partners, ...partners].map((partner, index) => (
              <motion.div 
                key={`${partner.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center min-w-[180px]"
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-16 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                <p className="mt-3 text-unlimited-gray text-sm">{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Partners;
