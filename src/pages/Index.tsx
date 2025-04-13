
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
  }, []);

  return (
    <MainLayout>
      <Helmet>
        <html lang="ar" dir="rtl" />
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
