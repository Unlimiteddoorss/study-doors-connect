import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, School, FileText, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchData, setSearchData] = useState({
    country: '',
    level: '',
    specialization: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchData.country || !searchData.level || !searchData.specialization) {
      toast({
        title: "تنبيه",
        description: "الرجاء ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    navigate(`/programs?country=${searchData.country}&level=${searchData.level}&specialization=${searchData.specialization}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 mb-10 md:mb-0"
          >
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
                <Link to="/apply">تقديم طلب التسجيل</Link>
              </Button>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/apply" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <FileText className="h-5 w-5 text-unlimited-light-blue" />
                  <span>طلب التسجيل</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/dashboard" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <GraduationCap className="h-5 w-5 text-unlimited-light-blue" />
                  <span>متابعة الطلب</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/universities" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <School className="h-5 w-5 text-unlimited-light-blue" />
                  <span>الجامعات</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/messages" className="flex items-center gap-2 bg-white/10 p-3 rounded-lg hover:bg-white/20 transition-colors">
                  <MessageSquare className="h-5 w-5 text-unlimited-light-blue" />
                  <span>تواصل معنا</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <form onSubmit={handleSearch} className="bg-white text-unlimited-dark-blue rounded-lg shadow-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-center">ابحث عن برنامجك المثالي</h3>
              <div className="mb-4">
                <label className="block text-unlimited-gray mb-2">الدولة</label>
                <select 
                  name="country"
                  value={searchData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                >
                  <option value="">اختر الدولة</option>
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
                  name="level"
                  value={searchData.level}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                >
                  <option value="">اختر المستوى</option>
                  <option value="bachelor">البكالوريوس</option>
                  <option value="master">الماجستير</option>
                  <option value="phd">الدكتوراه</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-unlimited-gray mb-2">التخصص</label>
                <select 
                  name="specialization"
                  value={searchData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-unlimited-blue"
                >
                  <option value="">اختر التخصص</option>
                  <option value="business">إدارة الأعمال</option>
                  <option value="engineering">الهندسة</option>
                  <option value="medicine">الطب</option>
                  <option value="computer-science">علوم الحاسوب</option>
                  <option value="arts">الفنون</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-unlimited-blue hover:bg-unlimited-blue/90">
                <Search className="h-4 w-4 ml-2" />
                <span>بحث</span>
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
