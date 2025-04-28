
import { Link } from 'react-router-dom';
import Logo from '../shared/Logo';
import { useTranslation } from 'react-i18next';
import AdminSidebarNav from './admin/AdminSidebarNav';
import AdminSidebarFooter from './admin/AdminSidebarFooter';

const AdminSidebar = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  return (
    <div className={`fixed inset-y-0 ${isRtl ? 'right-0 border-l' : 'left-0 border-r'} w-[250px] border-gray-200 bg-white z-30 flex flex-col`}>
      <div className="p-4 bg-unlimited-dark-blue text-white">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <AdminSidebarNav />
      </div>
      
      <AdminSidebarFooter />
    </div>
  );
};

export default AdminSidebar;
