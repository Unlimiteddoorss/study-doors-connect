
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-unlimited-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ابدأ رحلتك التعليمية اليوم
          </h2>
          <p className="text-lg mb-8 text-white/90">
            سجل الآن واكتشف الفرص التعليمية المتاحة في أفضل الجامعات العالمية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => navigate('/register')}
            >
              سجل كطالب
              <ArrowLeft className="mr-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white"
              onClick={() => navigate('/programs')}
            >
              استكشف البرامج
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
