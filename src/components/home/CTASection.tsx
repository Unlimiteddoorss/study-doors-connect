
import { ArrowLeft, Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast({
        title: "خطأ في البريد الإلكتروني",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم الاشتراك بنجاح",
        description: "شكراً لاشتراكك في نشرتنا البريدية، سنبقيك على اطلاع بأحدث البرامج والمنح",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-unlimited-dark-blue to-unlimited-blue text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-unlimited-dark-blue/30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Animated circles */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-unlimited-light-blue/10 animate-pulse" />
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-unlimited-light-blue/5 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-right"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              ابدأ رحلتك التعليمية اليوم
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg mb-8 text-white/90"
            >
              سجل الآن واكتشف الفرص التعليمية المتاحة في أفضل الجامعات العالمية
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto hover:bg-white hover:text-unlimited-blue transition-colors group"
                onClick={() => navigate('/register')}
              >
                سجل كطالب
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-white group"
                onClick={() => navigate('/programs')}
              >
                استكشف البرامج
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 grid grid-cols-1 gap-4"
            >
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-white/10">
                  <Phone className="h-5 w-5" />
                </div>
                <a href="tel:+123456789" className="hover:underline">+123-456-789</a>
              </div>
              
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-white/10">
                  <Mail className="h-5 w-5" />
                </div>
                <a href="mailto:info@unlimited-edu.com" className="hover:underline">info@unlimited-edu.com</a>
              </div>
              
              <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors">
                <div className="p-2 rounded-full bg-white/10">
                  <MapPin className="h-5 w-5" />
                </div>
                <address className="not-italic">إسطنبول، تركيا</address>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">اشترك في نشرتنا البريدية</h3>
            <p className="text-white/80 mb-6 text-center">احصل على آخر الأخبار والتحديثات حول البرامج الجديدة والمنح الدراسية</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  required
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-unlimited-blue hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الاشتراك..." : "اشترك الآن"}
                <Send className="h-4 w-4 mr-2" />
              </Button>
            </form>
            
            <p className="text-white/60 text-sm text-center mt-4">
              باشتراكك، أنت توافق على <a href="/privacy" className="underline hover:text-white">سياسة الخصوصية</a> الخاصة بنا
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
