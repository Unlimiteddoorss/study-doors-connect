
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Scholarships from "./pages/Scholarships";
import Universities from "./pages/Universities";
import TurkishUniversities from "./pages/TurkishUniversities";
import MedicalPrograms from "./pages/MedicalPrograms";
import EngineeringPrograms from "./pages/EngineeringPrograms";
import UniversityDetails from "./pages/UniversityDetails";
import Login from "./pages/Login";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StudentApplication from "./pages/StudentApplication";
import Services from "./pages/Services";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageAgents from "./pages/admin/ManageAgents";
import ManagePrograms from "./pages/admin/ManagePrograms";
import ManageApplications from "./pages/admin/ManageApplications";
import ManageUniversities from "./pages/admin/ManageUniversities";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminMessages from "./pages/admin/AdminMessages";
import AgentDashboard from "./pages/agent/AgentDashboard";
import StudentApplications from "./pages/dashboard/StudentApplications";
import StudentProfile from "./pages/dashboard/StudentProfile";
import StudentNotifications from "./pages/dashboard/StudentNotifications";
import LoginActivity from "./pages/dashboard/LoginActivity";
import AccountSettings from "./pages/dashboard/AccountSettings";
import UserMessages from "./pages/messaging/UserMessages";
import Reports from "./pages/admin/Reports";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ApplicationDetails from "./pages/dashboard/ApplicationDetails";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  // FIXME: In production, this would come from auth context or user state
  // For testing purposes, we'll allow the user to switch roles
  const [userRole, setUserRole] = useState<'student' | 'admin' | 'agent'>('admin'); // Default to admin

  type UserRole = 'student' | 'admin' | 'agent';
  
  // Use location to detect if user is on admin pages
  const location = useLocation();

  // Store user role in localStorage for persistence
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole && ['student', 'admin', 'agent'].includes(storedRole)) {
      setUserRole(storedRole as UserRole);
    } else {
      localStorage.setItem('userRole', userRole);
    }
  }, []);

  // Update localStorage when role changes
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: UserRole[] }) => {
    const isAuthenticated = true; // For testing purposes
    const hasPermission = allowedRoles.includes(userRole);
    
    console.log(`Route check - User role: ${userRole}, Allowed roles: ${allowedRoles.join(', ')}, Has permission: ${hasPermission}`);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  };

  // Create a role switcher component for testing
  const RoleSwitcher = () => {
    return (
      <div className="fixed bottom-4 left-4 bg-white shadow-lg p-2 rounded-md border z-50">
        <div className="text-xs font-bold mb-1">تغيير دور المستخدم (للاختبار فقط):</div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setUserRole('admin')}
            className={`px-2 py-1 text-xs rounded ${userRole === 'admin' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
          >
            مدير
          </button>
          <button 
            onClick={() => setUserRole('agent')}
            className={`px-2 py-1 text-xs rounded ${userRole === 'agent' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
          >
            وكيل
          </button>
          <button 
            onClick={() => setUserRole('student')}
            className={`px-2 py-1 text-xs rounded ${userRole === 'student' ? 'bg-unlimited-blue text-white' : 'bg-gray-200'}`}
          >
            طالب
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/accommodation" element={<Services />} />
        <Route path="/services/support" element={<Services />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/medical-programs" element={<MedicalPrograms />} />
        <Route path="/engineering-programs" element={<EngineeringPrograms />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/turkish-universities" element={<TurkishUniversities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Redirect admin users from /dashboard to /admin */}
        <Route path="/dashboard" element={
          userRole === 'admin' ? <Navigate to="/admin" replace /> : (
            <ProtectedRoute allowedRoles={['student', 'agent']}>
              <Dashboard />
            </ProtectedRoute>
          )
        } />

        {/* Student Application Routes - completely separate from admin pages */}
        <Route path="/apply" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentApplication />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentApplications />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications/:id" element={
          <ProtectedRoute allowedRoles={['student']}>
            <ApplicationDetails />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/notifications" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentNotifications />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/login-activity" element={
          <ProtectedRoute allowedRoles={['student']}>
            <LoginActivity />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/account-settings" element={
          <ProtectedRoute allowedRoles={['student']}>
            <AccountSettings />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute allowedRoles={['student', 'agent']}>
            <UserMessages />
          </ProtectedRoute>
        } />

        {/* Admin routes with proper protection */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageStudents />
          </ProtectedRoute>
        } />
        <Route path="/admin/agents" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageAgents />
          </ProtectedRoute>
        } />
        <Route path="/admin/programs" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManagePrograms />
          </ProtectedRoute>
        } />
        <Route path="/admin/applications" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageApplications />
          </ProtectedRoute>
        } />
        <Route path="/admin/universities" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <ManageUniversities />
          </ProtectedRoute>
        } />
        <Route path="/admin/notifications" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminNotifications />
          </ProtectedRoute>
        } />
        <Route path="/admin/messages" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminMessages />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Reports />
          </ProtectedRoute>
        } />

        {/* Agent routes with proper protection */}
        <Route path="/agent" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/students" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/applications" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/messages" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <UserMessages />
          </ProtectedRoute>
        } />
        <Route path="/agent/notifications" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <StudentNotifications />
          </ProtectedRoute>
        } />
        <Route path="/agent/profile" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/agent/settings" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AccountSettings />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <RoleSwitcher />
    </>
  );
}

export default App;
