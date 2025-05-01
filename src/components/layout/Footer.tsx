
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-unlimited-dark-blue text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - About */}
          <div>
            <div className="h-16 mb-4">
              <img src="/logo-white.svg" alt="Unlimited Education" className="h-full w-auto" />
            </div>
            <p className="mb-6 text-gray-300 leading-relaxed">
              خدمات تعليمية متكاملة للطلاب الراغبين بالدراسة في الخارج. نقدم استشارات مجانية ودعم كامل في جميع مراحل القبول الجامعي.
            </p>
            <div className="flex gap-2">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-unlimited-blue transition-colors">من نحن</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-unlimited-blue transition-colors">البرامج الدراسية</Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-unlimited-blue transition-colors">الجامعات</Link>
              </li>
              <li>
                <Link to="/scholarships" className="hover:text-unlimited-blue transition-colors">المنح الدراسية</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-unlimited-blue transition-colors">خدماتنا</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-unlimited-blue transition-colors">اتصل بنا</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">البرامج الشائعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs/software-engineering" className="hover:text-unlimited-blue transition-colors">هندسة البرمجيات</Link>
              </li>
              <li>
                <Link to="/programs/medicine" className="hover:text-unlimited-blue transition-colors">الطب البشري</Link>
              </li>
              <li>
                <Link to="/programs/business" className="hover:text-unlimited-blue transition-colors">إدارة الأعمال</Link>
              </li>
              <li>
                <Link to="/programs/engineering" className="hover:text-unlimited-blue transition-colors">برامج الهندسة</Link>
              </li>
              <li>
                <Link to="/programs/medical" className="hover:text-unlimited-blue transition-colors">البرامج الطبية</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-unlimited-blue transition-colors">كل البرامج</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">تواصل معنا</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>Istanbul, Bahçelievler, Turkey</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span dir="ltr">+90 552 286 8989</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>info@unlimited-edu.com</span>
              </li>
            </ul>
            
            <h3 className="text-lg font-bold mb-2">النشرة البريدية</h3>
            <p className="text-gray-300 text-sm mb-2">اشترك للحصول على آخر الأخبار والعروض</p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="البريد الإلكتروني" 
                className="bg-white/10 border-transparent focus-visible:ring-unlimited-blue"
              />
              <Button type="button" className="bg-unlimited-blue hover:bg-unlimited-blue/80">
                اشتراك
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright & Bottom Links */}
      <div className="bg-black/30 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-300">
            &copy; {currentYear} جميع الحقوق محفوظة لـ Unlimited Education
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
