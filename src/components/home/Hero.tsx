
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, GraduationCap, School, FileText, MessageSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const quickLinks = [
    { icon: <FileText />, text: "طلب التسجيل", to: "/apply" },
    { icon: <GraduationCap />, text: "متابعة الطلب", to: "/dashboard" },
    { icon: <School />, text: "الجامعات", to: "/universities" },
    { icon: <MessageSquare />, text: "تواصل معنا", to: "/contact" }
  ];

  return (
    <section className="bg-gradient-to-r from-[#031c4c] to-[#1474d2] text-white py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              فتح أبواب المستقبل للطلاب حول العالم
            </h1>
            <p className="text-xl mb-8 text-blue-100 opacity-90">
              نساعدك في اختيار الجامعة المناسبة والبرنامج المثالي لمستقبلك الأكاديمي والمهني
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="xl" className="bg-white text-[#031c4c] hover:bg-gray-100 font-bold">
                <Link to="/programs">استكشف البرامج</Link>
              </Button>
              <Button asChild size="xl" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Link to="/apply">تقديم طلب التسجيل</Link>
              </Button>
            </div>
            
            {/* Quick Access Features */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {quickLinks.map((link, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <Link to={link.to} className="flex items-center gap-3 bg-white/10 p-4 rounded-lg transition-colors">
                    <span className="h-6 w-6 text-blue-200">{link.icon}</span>
                    <span className="text-lg">{link.text}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="bg-white text-[#031c4c] rounded-lg shadow-2xl p-6 w-full max-w-md">
              <form onSubmit={handleSearch}>
                <h3 className="text-xl font-semibold mb-6 text-center">ابحث عن برنامجك المثالي</h3>
                
                <div className="mb-4">
                  <label className="block text-unlimited-gray mb-2">الدولة</label>
                  <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md">
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="turkey">تركيا</SelectItem>
                      <SelectItem value="cyprus">قبرص</SelectItem>
                      <SelectItem value="hungary">المجر</SelectItem>
                      <SelectItem value="poland">بولندا</SelectItem>
                      <SelectItem value="czech">التشيك</SelectItem>
                      <SelectItem value="egypt">مصر</SelectItem>
                      <SelectItem value="syria">سوريا</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-unlimited-gray mb-2">مستوى الدراسة</label>
                  <Select value={degree} onValueChange={setDegree}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md">
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bachelor">البكالوريوس</SelectItem>
                      <SelectItem value="master">الماجستير</SelectItem>
                      <SelectItem value="phd">الدكتوراه</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-unlimited-gray mb-2">التخصص</label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-md">
                      <SelectValue placeholder="اختر التخصص" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="business">إدارة الأعمال</SelectItem>
                      <SelectItem value="engineering">الهندسة</SelectItem>
                      <SelectItem value="medicine">الطب</SelectItem>
                      <SelectItem value="computer-science">علوم الحاسوب</SelectItem>
                      <SelectItem value="arts">الفنون</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#1474d2] hover:bg-[#0f5ca6] py-6 text-lg font-semibold tracking-wide"
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5 ml-2" />
                  <span>بحث</span>
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
