
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../shared/Logo';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-unlimited-dark-blue text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* الشعار ومعلومات الشركة */}
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-gray-300">
              {t('footer.companyDescription')}
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="hover:text-unlimited-light-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-unlimited-light-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-unlimited-light-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-unlimited-light-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/universities" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.universities')}
                </Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.programs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* البرامج */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.programs')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/programs/bachelor" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.bachelorPrograms')}
                </Link>
              </li>
              <li>
                <Link to="/programs/master" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.masterPrograms')}
                </Link>
              </li>
              <li>
                <Link to="/programs/phd" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.phdPrograms')}
                </Link>
              </li>
              <li>
                <Link to="/programs/diploma" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.diplomaPrograms')}
                </Link>
              </li>
              <li>
                <Link to="/programs/language" className="hover:text-unlimited-light-blue transition-colors">
                  {t('footer.languagePrograms')}
                </Link>
              </li>
            </ul>
          </div>

          {/* اتصل بنا */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footer.contactUs')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{t('footer.address')}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span dir="ltr">+966 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>info@unlimited-edu.com</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">
            &copy; {currentYear} Unlimited Education. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-300 hover:text-unlimited-light-blue transition-colors">
              {t('footer.terms')}
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-unlimited-light-blue transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/cookies" className="text-gray-300 hover:text-unlimited-light-blue transition-colors">
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
