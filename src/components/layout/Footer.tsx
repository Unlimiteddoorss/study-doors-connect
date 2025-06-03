
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <footer className={`bg-unlimited-dark-blue text-white py-12 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              {t('site.name', 'أبواب بلا حدود')}
            </h3>
            <p className="text-gray-300 text-sm">
              {t('site.tagline', 'أبواب بلا حدود التعليمية - منذ 1992')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">روابط سريعة</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors text-sm">
                حولنا
              </Link>
              <Link to="/services" className="block text-gray-300 hover:text-white transition-colors text-sm">
                خدماتنا
              </Link>
              <Link to="/programs" className="block text-gray-300 hover:text-white transition-colors text-sm">
                البرامج
              </Link>
              <Link to="/universities" className="block text-gray-300 hover:text-white transition-colors text-sm">
                الجامعات
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">الدعم</h4>
            <div className="space-y-2">
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors text-sm">
                اتصل بنا
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-white transition-colors text-sm">
                الأسئلة الشائعة
              </Link>
              <Link to="/support" className="block text-gray-300 hover:text-white transition-colors text-sm">
                المساعدة
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">تواصل معنا</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300 text-sm">+90 552 421 2214</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300 text-sm">info@unlimiteddoors.com</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <MapPin className="h-4 w-4 text-gray-300" />
                <span className="text-gray-300 text-sm">إسطنبول، تركيا</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2024 {t('site.name', 'أبواب بلا حدود')}. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
