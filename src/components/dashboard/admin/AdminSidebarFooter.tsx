
import { GraduationCap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AdminSidebarFooter = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-unlimited-blue/20 flex items-center justify-center">
          <GraduationCap className="h-5 w-5 text-unlimited-blue" />
        </div>
        <div className={`${isRtl ? 'mr-3' : 'ml-3'}`}>
          <p className="text-sm font-medium text-unlimited-dark-blue">{t('admin.sidebar.adminPanel')}</p>
          <p className="text-xs text-unlimited-gray">{t('site.name')}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebarFooter;
