
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import Index from './pages/Index';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import Programs from './pages/Programs';
import Universities from './pages/Universities';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageApplications from './pages/admin/ManageApplications';
import ManageUniversities from './pages/admin/ManageUniversities';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageAgents from './pages/admin/ManageAgents';
import Contact from './pages/Contact';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import ForgotPassword from './pages/ForgotPassword';
import ProgramDetails from './pages/ProgramDetails';
import Services from './pages/Services';
import TurkishUniversities from './pages/TurkishUniversities';
import EngineeringPrograms from './pages/EngineeringPrograms';
import MedicalPrograms from './pages/MedicalPrograms';
import Scholarships from './pages/Scholarships';
import StudentApplication from './pages/StudentApplication';
import TurkishUniversityApplication from './pages/TurkishUniversityApplication';
import UniversityDetails from './pages/UniversityDetails';
import AdminMessages from './pages/admin/AdminMessages';
import AdminNotifications from './pages/admin/AdminNotifications';
import ReviewUniversities from './pages/admin/ReviewUniversities';
import AgentDashboard from './pages/agent/AgentDashboard';
import AccountSettings from './pages/dashboard/AccountSettings';
import ApplicationDetails from './pages/dashboard/ApplicationDetails';
import LoginActivity from './pages/dashboard/LoginActivity';
import StudentApplications from './pages/dashboard/StudentApplications';
import StudentNotifications from './pages/dashboard/StudentNotifications';
import StudentProfile from './pages/dashboard/StudentProfile';
import Reports from './pages/admin/Reports';
import UserMessages from './pages/messaging/UserMessages';
import StudentMessages from './pages/students/StudentMessages';
import { useEffect } from 'react';
import { ToastProvider } from '@/components/ui/toast-notifications';
import UnauthorizedPage from './pages/UnauthorizedPage';

// 👋 New Enhanced Admin Pages - Added for better UI/UX
import EnhancedDashboard from './pages/admin/EnhancedDashboard';
import EnhancedStudentsManagement from './pages/admin/EnhancedStudentsManagement';
import EnhancedAgentsManagement from './pages/admin/EnhancedAgentsManagement';
import AdminOverview from './pages/admin/AdminOverview';

// 👋 New Pages - Added to complete the application
import Support from './pages/Support';
import Testimonials from './pages/Testimonials';
import ProgramsPage from './pages/ProgramsPage';

function App() {
  // Listen for network status changes
  useEffect(() => {
    const handleOnlineStatus = () => {
      console.log('Network is online');
    };

    const handleOfflineStatus = () => {
      console.log('Network is offline');
    };

    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2463EB" />
        <meta
          name="description"
          content="Unlimited Doors - نظام إدارة القبولات والمنح الجامعية"
        />
        <title>Unlimited Doors - أبواب بلا حدود</title>
      </Helmet>

      <ToastProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<CountryDetails />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs-old" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/:id" element={<UniversityDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/engineering-programs" element={<EngineeringPrograms />} />
          <Route path="/medical-programs" element={<MedicalPrograms />} />
          <Route path="/turkish-universities" element={<TurkishUniversities />} />
          <Route path="/apply" element={<StudentApplication />} />
          <Route path="/apply/turkish" element={<TurkishUniversityApplication />} />
          <Route path="/support" element={<Support />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* Student Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/applications" element={<StudentApplications />} />
          <Route path="/dashboard/applications/:id" element={<ApplicationDetails />} />
          <Route path="/dashboard/profile" element={<StudentProfile />} />
          <Route path="/dashboard/settings" element={<AccountSettings />} />
          <Route path="/dashboard/activity" element={<LoginActivity />} />
          <Route path="/dashboard/notifications" element={<StudentNotifications />} />
          <Route path="/student/messages" element={<StudentMessages />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminOverview />} />
          <Route path="/admin/dashboard" element={<EnhancedDashboard />} />
          <Route path="/admin/classic" element={<AdminDashboard />} />  {/* Keep classic dashboard */}
          <Route path="/admin/students" element={<EnhancedStudentsManagement />} />
          <Route path="/admin/students/classic" element={<ManageStudents />} />  {/* Keep classic students */}
          <Route path="/admin/applications" element={<ManageApplications />} />
          <Route path="/admin/universities" element={<ManageUniversities />} />
          <Route path="/admin/programs" element={<ManagePrograms />} />
          <Route path="/admin/agents" element={<EnhancedAgentsManagement />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/reviews" element={<ReviewUniversities />} />

          {/* Agent Routes */}
          <Route path="/agent" element={<AgentDashboard />} />
          <Route path="/agent/messages" element={<UserMessages />} />

          {/* Error Pages */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Toaster />
      </ToastProvider>
    </>
  );
}

export default App;
