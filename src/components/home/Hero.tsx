
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, School, FileText, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [country, setCountry] = useState("");
  const [degree, setDegree] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    // بناء رابط البحث
    let searchUrl = '/programs';
    const params = new URLSearchParams();
    
    if (country) {
      params.append('country', country);
    }
    
    if (degree) {
      params.append('degree', degree);
    }
    
    if (specialty) {
      params.append('specialty', specialty);
    }
    
    const queryString = params.toString();
    if (queryString) {
      searchUrl += `?${queryString}`;
    }
    
    // عرض رسالة تأكيد
    toast({
      title: "جاري البحث...",
      description: "نبحث عن البرامج المناسبة لك",
    });
    
    // الانتقال إلى صفحة البرامج مع معاملات البحث
    navigate(searchUrl);
  };

  return (
    <section className="bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              فتح أبواب المستقبل للطلاب حول العالم
            </h1>
            <p className="text-xl mb-8 text-unlimited-light-blue/90">
              نساعدك في اختيار الجامعة المناسبة والبرنامج المثالي لمستقبلك الأكاديمي والمهني
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="xl" className="bg-white text-unlimited-blue hover:bg-gray-100">
                <Link to="/programs">استكشف البرامج</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/apply">تقديم طلب التسجيل</Link>
              </Button>
            </div>
            
            {/* Quick Access Features */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Link to="/apply" className="flex items-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                <FileText className="h-6 w-6 text-unlimited-light-blue" />
                <span className="text-lg">طلب التسجيل</span>
              </Link>
              <Link to="/dashboard" className="flex items-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-unlimited-light-blue" />
                <span className="text-lg">متابعة الطلب</span>
              </Link>
              <Link to="/universities" className="flex items-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                <School className="h-6 w-6 text-unlimited-light-blue" />
                <span className="text-lg">الجامعات</span>
              </Link>
              <Link to="/contact" className="flex items-center gap-3 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-colors">
                <MessageSquare className="h-6 w-6 text-unlimited-light-blue" />
                <span className="text-lg">تواصل معنا</span>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="bg-white text-unlimited-dark-blue rounded-lg shadow-lg p-6 w-full max-w-md">
              <form onSubmit={handleSearch}>
                <h3 className="text-xl font-semibold mb-6 text-center">ابحث عن برنامجك المثالي</h3>
                <div className="mb-4">
                  <label className="block text-unlimited-gray mb-2">الدولة</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="" disabled selected>اختر الدولة</option>
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
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                  >
                    <option value="" disabled selected>اختر المستوى</option>
                    <option value="bachelor">البكالوريوس</option>
                    <option value="master">الماجستير</option>
                    <option value="phd">الدكتوراه</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-unlimited-gray mb-2">التخصص</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                  >
                    <option value="" disabled selected>اختر التخصص</option>
                    <option value="business">إدارة الأعمال</option>
                    <option value="engineering">الهندسة</option>
                    <option value="medicine">الطب</option>
                    <option value="computer-science">علوم الحاسوب</option>
                    <option value="arts">الفنون</option>
                  </select>
                </div>
                <Button type="submit" size="lg" className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90 py-3 text-lg">
                  <Search className="h-5 w-5 ml-2" />
                  <span>بحث</span>
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
