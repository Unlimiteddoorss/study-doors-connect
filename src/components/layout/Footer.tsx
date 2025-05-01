
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Logo from '../shared/Logo';

const Footer = () => {
  // معلومات الاتصال المحدثة
  const contactInfo = {
    phone: "+90 55 24 212 214",
    email: "unlimiteddoorss@gmail.com",
    address: "اسطنبول Bahçelievler تركيا"
  };

  return (
    <footer className="bg-unlimited-dark-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-unlimited-light-gray">
              نفتح لك أبواب غير محدودة للدراسة في أفضل الجامعات العالمية. نقدم خدمات استشارية شاملة للطلاب الراغبين بالدراسة في الخارج.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-unlimited-light-blue">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/universities" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  الجامعات
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  البرامج الدراسية
                </Link>
              </li>
              <li>
                <Link to="/scholarships" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  المنح الدراسية
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">الدول الدراسية</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/country/turkey" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  تركيا
                </Link>
              </li>
              <li>
                <Link to="/country/uk" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  المملكة المتحدة
                </Link>
              </li>
              <li>
                <Link to="/country/usa" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  الولايات المتحدة
                </Link>
              </li>
              <li>
                <Link to="/country/canada" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  كندا
                </Link>
              </li>
              <li>
                <Link to="/country/germany" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  ألمانيا
                </Link>
              </li>
              <li>
                <Link to="/country/malaysia" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  ماليزيا
                </Link>
              </li>
              <li>
                <Link to="/countries" className="text-unlimited-light-gray hover:text-unlimited-light-blue">
                  عرض كل الدول
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-unlimited-light-blue mt-1 ml-3" />
                <p className="text-unlimited-light-gray">{contactInfo.address}</p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-unlimited-light-blue mt-1 ml-3" />
                <p className="text-unlimited-light-gray" dir="ltr">{contactInfo.phone}</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-unlimited-light-blue mt-1 ml-3" />
                <p className="text-unlimited-light-gray">{contactInfo.email}</p>
              </div>
              <div className="flex items-start">
                <Globe className="h-5 w-5 text-unlimited-light-blue mt-1 ml-3" />
                <p className="text-unlimited-light-gray">www.unlimited-doors.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-unlimited-light-gray">
          <p>© {new Date().getFullYear()} Unlimited Doors. كل الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
