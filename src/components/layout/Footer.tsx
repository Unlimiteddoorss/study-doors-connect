import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
const Footer = () => {
  return <footer className="bg-unlimited-dark-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <Logo />
            <p className="mt-4 text-unlimited-light-blue/80">منصة &quot;أبواب بلا حدود&quot; هي بوابتك للدراسة في الخارج، نقدم خدمات متكاملة للطلاب الراغبين بالدراسة في الجامعات العالمية.</p>
            <div className="flex mt-4 space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-unlimited-light-blue transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-unlimited-light-blue transition-colors">البرامج الدراسية</Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-unlimited-light-blue transition-colors">الجامعات</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-unlimited-light-blue transition-colors">من نحن</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-unlimited-light-blue transition-colors">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-4">خدماتنا</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/application" className="hover:text-unlimited-light-blue transition-colors">تقديم الطلبات</Link>
              </li>
              <li>
                <Link to="/services/visa" className="hover:text-unlimited-light-blue transition-colors">خدمات التأشيرة</Link>
              </li>
              <li>
                <Link to="/services/accommodation" className="hover:text-unlimited-light-blue transition-colors">السكن الجامعي</Link>
              </li>
              <li>
                <Link to="/services/consultation" className="hover:text-unlimited-light-blue transition-colors">الاستشارات الدراسية</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-unlimited-light-blue transition-colors">الأسئلة الشائعة</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:info@unlimiteddoorss.com" className="hover:text-unlimited-light-blue transition-colors">
                  info@unlimiteddoorss.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <a href="tel:+1234567890" className="hover:text-unlimited-light-blue transition-colors">
                  +123 456 7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-1" />
                <span>
                  العنوان، المدينة، الدولة
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-unlimited-blue/30 mt-8 pt-6 text-center">
          <p>© {new Date().getFullYear()} أبواب بلا حدود. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;
