
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Helmet } from 'react-helmet-async';
import FAQ from '@/components/shared/FAQ';

const FAQPage = () => {
  return (
    <MainLayout>
      <Helmet>
        <title>الأسئلة الشائعة - Unlimited Education</title>
        <meta name="description" content="إجابات على الأسئلة الأكثر شيوعاً حول التعليم في تركيا والتقديم للجامعات التركية" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-unlimited-dark-blue mb-4">
              الأسئلة الشائعة
            </h1>
            <p className="text-unlimited-gray text-lg">
              إجابات على الأسئلة الأكثر شيوعاً حول التعليم في تركيا
            </p>
          </div>
          
          <FAQ />
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;
