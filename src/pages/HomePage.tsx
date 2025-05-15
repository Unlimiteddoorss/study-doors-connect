
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import Statistics from '@/components/home/Statistics';
import Services from '@/components/home/Services';
import Testimonials from '@/components/home/Testimonials';
import FeaturedPrograms from '@/components/home/FeaturedPrograms';
import FAQ from '@/components/shared/FAQ';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-unlimited-light-blue/10 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-unlimited-dark-blue mb-6">
                أبواب غير محدودة للتعليم في <span className="text-unlimited-blue">تركيا والخارج</span>
              </h1>
              <p className="text-lg md:text-xl text-unlimited-gray mb-8">
                نمهد الطريق أمام الطلاب العرب للدراسة في أفضل الجامعات التركية والعالمية. نقدم خدمات شاملة من اختيار التخصص المناسب حتى الحصول على التأشيرة والسكن.
              </p>
              <div className="flex flex-wrap gap-4 justify-start">
                <Button size="lg" asChild>
                  <Link to="/programs">استكشف البرامج الدراسية</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">تواصل معنا</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end relative">
              <img
                src="/lovable-uploads/13969768-694c-4cac-8689-b9fb6dde49d1.png"
                alt="طلاب يدرسون في الخارج"
                className="rounded-lg shadow-lg max-w-full h-auto relative z-10"
              />
              <div className="absolute top-10 -right-6 w-24 h-24 bg-unlimited-blue/10 rounded-full"></div>
              <div className="absolute bottom-10 -left-6 w-16 h-16 bg-unlimited-blue/20 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-16 h-16 bg-unlimited-blue/5 rounded-full"></div>
          <div className="absolute top-3/4 right-10 w-24 h-24 bg-unlimited-blue/5 rounded-full"></div>
          <div className="absolute bottom-10 left-1/4 w-32 h-32 bg-unlimited-blue/5 rounded-full"></div>
        </div>
      </section>

      {/* Statistics Section */}
      <Statistics />
      
      {/* Services Section */}
      <Services />

      {/* Featured Programs */}
      <FeaturedPrograms />
      
      {/* CTA Section */}
      <section className="bg-unlimited-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلتك التعليمية اليوم</h2>
            <p className="text-lg mb-8 text-white/80">
              لا تدع الفرصة تفوتك للدراسة في أفضل الجامعات. تواصل معنا الآن واحصل على استشارة مجانية لمساعدتك في اختيار المسار التعليمي الأفضل لك.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/application">تقديم طلب الآن</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-unlimited-blue" asChild>
                <Link to="/contact">
                  احصل على استشارة مجانية <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <Testimonials />
      
      {/* FAQ Section */}
      <FAQ />
      
      {/* Universities Partners */}
      <section className="py-16 bg-unlimited-light-blue/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">شركاؤنا من الجامعات</h2>
            <p className="text-unlimited-gray max-w-3xl mx-auto">
              نفتخر بشراكاتنا مع أفضل الجامعات في تركيا وحول العالم لتقديم أفضل الفرص التعليمية لطلابنا
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="grayscale hover:grayscale-0 transition-all">
                <img 
                  src={`https://via.placeholder.com/150x80?text=University+${i}`}
                  alt={`University Partner ${i}`}
                  className="h-16 object-contain"
                />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="link" asChild>
              <Link to="/universities">عرض جميع الجامعات الشريكة <ArrowRight className="mr-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;
