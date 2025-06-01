
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import CTASection from '@/components/home/CTASection';

const Home = () => {
  return (
    <MainLayout>
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

export default Home;
