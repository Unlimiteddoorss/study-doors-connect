
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import CTASection from '@/components/home/CTASection';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Index = () => {
  useEffect(() => {
    document.title = 'أبواب بلا حدود - الرئيسية';
    
    // Implement smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')!.substring(1);
        const element = document.getElementById(id);
        
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          
          // Update URL without reload
          window.history.pushState(null, '', target.getAttribute('href')!);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <html lang="ar" dir="rtl" />
        <meta name="description" content="أبواب بلا حدود - خدمات استشارية تعليمية متكاملة للطلاب حول العالم" />
        <meta property="og:title" content="أبواب بلا حدود - الرئيسية" />
        <meta property="og:description" content="فتح أبواب المستقبل للطلاب حول العالم" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#1e40af" />
      </Helmet>
      <Hero />
      <Stats />
      <Services />
      <FeaturedPrograms />
      <Testimonials />
      <Partners />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
