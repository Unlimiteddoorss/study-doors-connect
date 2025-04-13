
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, School, FileText, MessageSquare } from 'lucide-react';

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
              <Button asChild size="lg" variant="outline" className="border-white text-unlimited-blue bg-white hover:bg-gray-100">
                <Link to="/apply">تقديم طلب التسجيل</Link>
              </Button>
            </div>
            
            {/* Quick Access Features */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Link to="/apply" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <FileText className="h-5 w-5 text-unlimited-light-blue" />
                <span>طلب التسجيل</span>
              </Link>
              <Link to="/dashboard" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <GraduationCap className="h-5 w-5 text-unlimited-light-blue" />
                <span>متابعة الطلب</span>
              </Link>
              <Link to="/universities" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <School className="h-5 w-5 text-unlimited-light-blue" />
                <span>الجامعات</span>
              </Link>
              <Link to="/messages" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                <MessageSquare className="h-5 w-5 text-unlimited-light-blue" />
                <span>تواصل معنا</span>
              </Link>
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
                <Search className="h-4 w-4 ml-2" />
                <span>بحث</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
