
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Logo = () => {
  const { t } = useTranslation();
  
  return (
    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
      <img 
        alt={t('site.name')} 
        className="h-12 w-auto" 
        src="/lovable-uploads/a0d3407c-db28-452b-9d6f-84824ac5096f.png" 
      />
      <div className="hidden md:block">
        <h1 className="text-lg font-bold text-white">{t('site.name')}</h1>
        <p className="text-xs text-unlimited-light-blue">{t('site.tagline')}</p>
      </div>
    </Link>
  );
};

export default Logo;
