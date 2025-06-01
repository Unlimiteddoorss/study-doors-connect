
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import CTASection from '@/components/home/CTASection';
import { Helmet } from 'react-helmet-async';

const HomePage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>Unlimited Education - التعليم اللامحدود</title>
        <meta name="description" content="منصة التعليم الرائدة للدراسة في الجامعات التركية والعالمية. ابدأ رحلتك التعليمية معنا اليوم!" />
        <meta name="keywords" content="التعليم في تركيا, الجامعات التركية, الدراسة في الخارج, تعليم عالي" />
      </Helmet>
      
      <Hero />
      <Services />
      <FeaturedPrograms />
      <Statistics />
      <Testimonials />
      <Partners />
      <CTASection />
    </MainLayout>
  );
};

export default HomePage;
