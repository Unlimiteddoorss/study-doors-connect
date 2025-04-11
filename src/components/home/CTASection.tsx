
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, GraduationCap, ArrowRight, Globe, School, MapPin, 
         University, BookOpen, Check, Search } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { availableCountries, degreeTypes } from '@/data/programsData';
import { useToast } from '@/hooks/use-toast';

const CTASection = () => {
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  
  const handleQuickApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail || !studentPhone) {
      toast({
        title: "يرجى إكمال البيانات",
        description: "جميع الحقول مطلوبة للتقديم",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would submit to an API
    toast({
      title: "تم استلام طلبك بنجاح!",
      description: "سيتواصل معك مستشار تعليمي في أقرب وقت ممكن.",
      variant: "default",
    });
    
    // Reset form
    setStudentName("");
    setStudentEmail("");
    setStudentPhone("");
  };
  
  const handleExplorePrograms = () => {
    // This allows us to filter programs when we navigate to the programs page
    let queryParams = new URLSearchParams();
    
    if (selectedCountry && selectedCountry !== "all") {
      queryParams.append("country", selectedCountry);
    }
    
    if (selectedDegree && selectedDegree !== "all") {
      queryParams.append("degree", selectedDegree);
    }
    
    return `/programs${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">ابدأ رحلة دراستك الآن</h2>
        <p className="max-w-3xl mx-auto text-lg mb-10">انضم إلى آلاف الطلاب الذين حققوا أحلامهم الأكاديمية مع أبواب بلا حدود. فريقنا جاهز لمساعدتك في كل خطوة من رحلة دراستك.</p>
        
        <Tabs defaultValue="quick-apply" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-unlimited-blue/30 mb-8">
            <TabsTrigger value="quick-apply" className="data-[state=active]:bg-white data-[state=active]:text-unlimited-blue">تقديم سريع</TabsTrigger>
            <TabsTrigger value="explore" className="data-[state=active]:bg-white data-[state=active]:text-unlimited-blue">استكشاف الفرص</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick-apply" className="space-y-6">
            <div className="max-w-md mx-auto bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">قدم طلبك في خطوات بسيطة</h3>
              
              <form onSubmit={handleQuickApply} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="الاسم الكامل"
                    className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="رقم الهاتف"
                    className="w-full px-4 py-2 rounded bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full bg-white text-unlimited-blue hover:bg-gray-100 font-bold py-3">
                  <div className="flex items-center justify-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    تقديم طلب الآن
                    <ArrowRight className="h-4 w-4 mr-1" />
                  </div>
                </Button>
              </form>
              
              <div className="mt-4 space-y-2">
                <p className="text-sm flex items-center gap-1">
                  <Check className="h-4 w-4" /> سيتواصل معك مستشار تعليمي في غضون 24 ساعة
                </p>
                <p className="text-sm flex items-center gap-1">
                  <Check className="h-4 w-4" /> خدماتنا الاستشارية مجانية بالكامل
                </p>
                <p className="text-sm flex items-center gap-1">
                  <Check className="h-4 w-4" /> فريق متخصص في كافة مجالات الدراسة
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-6">
            <div className="max-w-2xl mx-auto bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">استكشف البرامج حسب اهتماماتك</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm mb-1 text-white/80">اختر الدولة</label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="جميع الدول" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الدول</SelectItem>
                      {availableCountries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm mb-1 text-white/80">المستوى الدراسي</label>
                  <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                    <SelectTrigger className="w-full bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="جميع المستويات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المستويات</SelectItem>
                      {degreeTypes.map(degree => (
                        <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Link to={handleExplorePrograms}>
                <Button className="w-full bg-white text-unlimited-blue hover:bg-gray-100 mb-6">
                  <Search className="mr-2 h-4 w-4" /> بحث عن البرامج
                </Button>
              </Link>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Link to="/programs" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all">
                  <School className="h-8 w-8" />
                  <span className="text-sm">البرامج الدراسية</span>
                </Link>
                <Link to="/universities" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all">
                  <University className="h-8 w-8" />
                  <span className="text-sm">الجامعات</span>
                </Link>
                <Link to="/countries" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all">
                  <MapPin className="h-8 w-8" />
                  <span className="text-sm">الدول</span>
                </Link>
                <Link to="/scholarships" className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-all">
                  <BookOpen className="h-8 w-8" />
                  <span className="text-sm">المنح الدراسية</span>
                </Link>
              </div>
            </div>
            
            <Button asChild size="lg" className="bg-white text-unlimited-blue hover:bg-gray-100 font-bold">
              <Link to="/contact" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                تحدث مع مستشار
              </Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CTASection;
