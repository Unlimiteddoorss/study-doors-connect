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

function App() {
  const userRole = 'student';

  const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) => {
    const isAuthenticated = true;
    const hasPermission = allowedRoles.includes(userRole);

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (!hasPermission) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
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

        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Dashboard />
          </ProtectedRoute>
        } />
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
            <StudentApplications />
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

        <Route path="/agent" element={
          <ProtectedRoute allowedRoles={['agent']}>
            <AgentDashboard />
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
