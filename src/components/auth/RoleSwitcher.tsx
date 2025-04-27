
import { UserRole } from "@/hooks/useRole";

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSwitcher = ({ currentRole, onRoleChange }: RoleSwitcherProps) => {
  return (
    <div className="fixed bottom-4 left-4 bg-white shadow-lg p-2 rounded-md border z-50">
      <div className="text-xs font-bold mb-1">تغيير دور المستخدم (للاختبار فقط):</div>
      <div className="flex space-x-2">
        <button 
          onClick={() => onRoleChange('admin')}
          className={`px-2 py-1 text-xs rounded ${currentRole === 'admin' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
        >
          مدير
        </button>
        <button 
          onClick={() => onRoleChange('agent')}
          className={`px-2 py-1 text-xs rounded ${currentRole === 'agent' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
        >
          وكيل
        </button>
        <button 
          onClick={() => onRoleChange('student')}
          className={`px-2 py-1 text-xs rounded ${currentRole === 'student' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
        >
          طالب
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
