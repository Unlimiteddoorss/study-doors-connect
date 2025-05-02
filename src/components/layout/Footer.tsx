import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Globe2, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '@/i18n/config';
import Logo from '../shared/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const currentLanguage = i18n.language;

  const contactInfo = {
    phone: "+90 55 24 212 214",
    email: "unlimiteddoorss@gmail.com",
    address: "اسطنبول Bahçelievler تركيا"
  };

  const socialLinks = [
    { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" }
  ];

  const programLinks = [
    { href: "/programs/bachelor", label: t('footer.bachelorPrograms') },
    { href: "/programs/master", label: t('footer.masterPrograms') },
    { href: "/programs/phd", label: t('footer.phdPrograms') },
    { href: "/programs/diploma", label: t('footer.diplomaPrograms') },
    { href: "/programs/language", label: t('footer.languagePrograms') }
  ];

  const quickLinks = [
    { href: "/", label: t('footer.home') },
    { href: "/about", label: t('footer.about') },
    { href: "/universities", label: t('footer.universities') },
    { href: "/programs", label: t('footer.programs') },
    { href: "/contact", label: t('footer.contact') }
  ];

  const handleLanguageChange = () => {
    const newLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
  };

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    if (email) {
      toast({
        title: currentLanguage === 'ar' ? "تم الاشتراك بنجاح" : "Subscription Successful",
        description: currentLanguage === 'ar' ? 
          "شكراً لاشتراكك في نشرتنا الإخبارية" : 
          "Thank you for subscribing to our newsletter",
        variant: "default",
      });
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <footer className="bg-unlimited-dark-blue text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-gray-300 leading-relaxed">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-unlimited-light-blue transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.programs')}</h3>
            <ul className="space-y-3">
              {programLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="hover:text-unlimited-light-blue transition-colors text-gray-300 hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href}
                    className="hover:text-unlimited-light-blue transition-colors text-gray-300 hover:translate-x-1 rtl:hover:-translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">{t('footer.contactUs')}</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-1" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span dir="ltr">{contactInfo.phone}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Globe2 className="h-5 w-5 flex-shrink-0" />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLanguageChange}
                  className="text-gray-300 hover:text-unlimited-light-blue p-0 h-auto font-normal"
                >
                  {currentLanguage === 'ar' ? 'English' : 'العربية'}
                </Button>
              </li>
            </ul>
            
            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="mt-4">
              <h4 className="text-sm font-semibold mb-2">{t('footer.newsletter')}</h4>
              <div className="flex">
                <Input
                  type="email"
                  name="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-r-none rtl:rounded-r-md rtl:rounded-l-none"
                  required
                />
                <Button 
                  type="submit" 
                  variant="unlimited" 
                  className="rounded-l-none rtl:rounded-l-md rtl:rounded-r-none"
                >
                  <Send size={16} />
                </Button>
              </div>
            </form>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Unlimited Education. {t('footer.allRightsReserved')}
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-400 hover:text-unlimited-light-blue text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-unlimited-light-blue text-sm transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-unlimited-light-blue text-sm transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
