
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { PublicRoutes } from "@/routes/PublicRoutes";
import { StudentRoutes } from "@/routes/StudentRoutes";
import { AdminRoutes } from "@/routes/AdminRoutes";
import { AgentRoutes } from "@/routes/AgentRoutes";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import StudentApplication from "@/pages/StudentApplication";
import UserMessages from "@/pages/messaging/UserMessages";
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
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Dashboard redirect based on role */}
        <Route 
          path="/dashboard" 
          element={
            userRole === 'admin' ? 
              <Navigate to="/admin" replace /> : 
              <Navigate to="/dashboard/applications" replace />
          } 
        />
        
        {/* Student Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentRoutes />
          </ProtectedRoute>
        } />
        
        {/* Direct access to student application */}
        <Route path="/apply" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentApplication />
          </ProtectedRoute>
        } />

        {/* Messages access for all roles */}
        <Route path="/messages" element={
          <ProtectedRoute allowedRoles={['student', 'admin', 'agent']} userRole={userRole}>
            <UserMessages />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
            <AdminRoutes />
          </ProtectedRoute>
        } />

        {/* Agent Routes */}
        <Route path="/agent/*" element={
          <ProtectedRoute allowedRoles={['agent']} userRole={userRole}>
            <AgentRoutes />
          </ProtectedRoute>
        } />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
