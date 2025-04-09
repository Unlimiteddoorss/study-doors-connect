import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
const Hero = () => {
  return <section className="bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              فتح أبواب المستقبل للطلاب حول العالم
            </h1>
            <p className="text-lg mb-8 text-unlimited-light-blue/90">
              نساعدك في اختيار الجامعة المناسبة والبرنامج المثالي لمستقبلك الأكاديمي والمهني
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100">
                <Link to="/programs">استكشف البرامج</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact" className="\u063A\u064A\u0631\u0644\u064A \u062E\u0644\u0641\u064A\u0629 \u0647\u0627\u0644\u0646\u0635 \u0644\u062A\u0638\u0647\u0631">تواصل معنا</Link>
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white text-unlimited-dark-blue rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-center">ابحث عن برنامجك المثالي</h3>
              <div className="mb-4">
                <label className="block text-unlimited-gray mb-2">الدولة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue" defaultValue="">
                  <option value="" disabled>اختر الدولة</option>
                  <option value="turkey">تركيا</option>
                  <option value="cyprus">قبرص</option>
                  <option value="hungary">المجر</option>
                  <option value="poland">بولندا</option>
                  <option value="czech">التشيك</option>
                  <option value="egypt">مصر</option>
                  <option value="syria">سوريا</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-unlimited-gray mb-2">مستوى الدراسة</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue" defaultValue="">
                  <option value="" disabled>اختر المستوى</option>
                  <option value="bachelor">البكالوريوس</option>
                  <option value="master">الماجستير</option>
                  <option value="phd">الدكتوراه</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-unlimited-gray mb-2">التخصص</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue" defaultValue="">
                  <option value="" disabled>اختر التخصص</option>
                  <option value="business">إدارة الأعمال</option>
                  <option value="engineering">الهندسة</option>
                  <option value="medicine">الطب</option>
                  <option value="computer-science">علوم الحاسوب</option>
                  <option value="arts">الفنون</option>
                </select>
              </div>
              <Button className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90">
                <Search className="h-4 w-4 mr-2" />
                <span>بحث</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;