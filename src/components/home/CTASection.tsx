import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
const CTASection = () => {
  return <section className="py-16 bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">ابدأ رحلة دراستك الآن</h2>
        <p className="max-w-2xl mx-auto text-lg mb-8">انضم إلى آلاف الطلاب الذين حققوا أحلامهم الأكاديمية مع أبواب بلا حدود. فريقنا جاهز لمساعدتك في كل خطوة.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100">
            <Link to="/register">إنشاء حساب</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/contact" className="\u0627\u062C\u0639\u0644 \u0644\u0648\u0646 \u0627\u0644\u0645\u0633\u062A\u0637\u064A\u0644 \u0623\u0628\u064A\u0636 \u0645\u062B\u0644 \u0644\u0648\u0646 \u0647\u0630\u0647 \u0627\u0644\u0645\u0633\u062A\u0637\u064A\u0644  \u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628">تحدث مع مستشار</Link>
          </Button>
        </div>
      </div>
    </section>;
};
export default CTASection;