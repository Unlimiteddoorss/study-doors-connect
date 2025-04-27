
import { useState, useEffect } from 'react';

export type UserRole = 'student' | 'admin' | 'agent';

export const useRole = () => {
  const [userRole, setUserRole] = useState<UserRole>('admin');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && ['student', 'admin', 'agent'].includes(storedRole)) {
      setUserRole(storedRole as UserRole);
    } else {
      localStorage.setItem('userRole', userRole);
    }
  }, []);

  const updateRole = (newRole: UserRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  return { userRole, updateRole };
};
