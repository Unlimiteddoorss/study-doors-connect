
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/home/Hero';
import Stats from '@/components/home/Stats';
import Services from '@/components/home/Services';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import Testimonials from '@/components/home/Testimonials';
import Partners from '@/components/home/Partners';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <main className="min-h-screen">
        <Hero />
        <Stats />
        <Services />
        <FeaturedPrograms />
        <Testimonials />
        <Partners />
        <CTASection />
      </main>
    </MainLayout>
  );
};

export default Index;
