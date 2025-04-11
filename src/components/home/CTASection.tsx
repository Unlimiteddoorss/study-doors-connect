
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageSquare, GraduationCap, ArrowRight, Globe, School, MapPin } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const CTASection = () => {
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
              <Button asChild size="lg" className="w-full bg-white text-unlimited-blue hover:bg-gray-100 font-bold py-3">
                <Link to="/apply" className="flex items-center justify-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  تقديم طلب الآن
                  <ArrowRight className="h-4 w-4 mr-1" />
                </Link>
              </Button>
              <p className="mt-4 text-sm">سيتواصل معك مستشار تعليمي في غضون 24 ساعة</p>
            </div>
          </TabsContent>
          
          <TabsContent value="explore" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button asChild variant="outline" className="border-white hover:bg-white/10">
                <Link to="/programs" className="flex items-center gap-2 text-white hover:text-white py-3">
                  <School className="h-5 w-5" />
                  استعرض البرامج الدراسية
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white hover:bg-white/10">
                <Link to="/universities" className="flex items-center gap-2 text-white hover:text-white py-3">
                  <Globe className="h-5 w-5" />
                  استعرض الجامعات
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white hover:bg-white/10">
                <Link to="/countries" className="flex items-center gap-2 text-white hover:text-white py-3">
                  <MapPin className="h-5 w-5" />
                  استكشف الدول
                </Link>
              </Button>
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
