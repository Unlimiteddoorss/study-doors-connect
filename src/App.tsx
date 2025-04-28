
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { StudentRoutes } from "@/routes/StudentRoutes";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { AgentRoutes } from "@/routes/AgentRoutes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import "./App.css";

function App() {
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'agent'>('student');
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial role check
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && (storedRole === 'admin' || storedRole === 'agent' || storedRole === 'student')) {
      setUserRole(storedRole as 'student' | 'admin' | 'agent');
    }
    
    // Listen for changes to localStorage
    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem('userRole');
      if (updatedRole && (updatedRole === 'admin' || updatedRole === 'agent' || updatedRole === 'student')) {
        if (updatedRole !== userRole) {
          setUserRole(updatedRole as 'student' | 'admin' | 'agent');
          
          toast({
            title: "تم تغيير الصلاحيات",
            description: `تم تغيير صلاحياتك إلى ${
              updatedRole === 'admin' ? 'مدير النظام' : 
              updatedRole === 'agent' ? 'وكيل' : 'طالب'
            }`,
          });
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    const checkLocalStorageChange = setInterval(() => {
      const currentRole = localStorage.getItem('userRole');
      if (currentRole && currentRole !== userRole && 
         (currentRole === 'admin' || currentRole === 'agent' || currentRole === 'student')) {
        setUserRole(currentRole as 'student' | 'admin' | 'agent');
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(checkLocalStorageChange);
    };
  }, [userRole, toast]);

  return (
    <>
      <Routes>
        <PublicRoutes />
        
        {/* Redirect admin users from /dashboard to /admin */}
        <Route path="/dashboard" element={
          userRole === 'admin' ? <Navigate to="/admin" replace /> : (
            <ProtectedRoute allowedRoles={['student', 'agent']} userRole={userRole}>
              <StudentRoutes />
            </ProtectedRoute>
          )
        } />

        {/* Protected Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} userRole={userRole}>
          <StudentRoutes />
        </ProtectedRoute>} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
          <AdminRoutes />
        </ProtectedRoute>} />

        {/* Protected Agent Routes */}
        <Route element={<ProtectedRoute allowedRoles={['agent']} userRole={userRole}>
          <AgentRoutes />
        </ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
