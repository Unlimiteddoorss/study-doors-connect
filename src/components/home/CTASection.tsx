
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const CTASection = () => {
  return <section className="py-16 bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">ابدأ رحلة دراستك الآن</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">انضم إلى آلاف الطلاب الذين حققوا أحلامهم الأكاديمية مع أبواب بلا حدود. فريقنا جاهز لمساعدتك في كل خطوة.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100">
            <Link to="/register">إنشاء حساب</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10">
            <Link to="/contact" className="flex items-center gap-2 text-white hover:text-white">
              <MessageSquare className="h-5 w-5" />
              تحدث مع مستشار
            </Link>
          </Button>
        </div>
      </div>
    </section>;
};

export default CTASection;
