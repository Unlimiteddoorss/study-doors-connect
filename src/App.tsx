
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from "@/components/ui/toaster";
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Programs from './pages/Programs';
import Universities from './pages/Universities';
import UniversityDetails from './pages/UniversityDetails';
import ProgramDetails from './pages/ProgramDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Scholarships from './pages/Scholarships';
import NotFound from './pages/NotFound';
import EngineeringPrograms from './pages/EngineeringPrograms';
import MedicalPrograms from './pages/MedicalPrograms';
import CountryDetails from './pages/CountryDetails';
import Countries from './pages/Countries';
import TurkishUniversities from './pages/TurkishUniversities';
import StudentApplication from './pages/StudentApplication';
import SoftwareEngineeringProgram from './pages/programs/SoftwareEngineeringProgram';

// Dashboard imports
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AgentDashboard from './pages/agent/AgentDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageUniversities from './pages/admin/ManageUniversities';
import ManageApplications from './pages/admin/ManageApplications';
import ManageAgents from './pages/admin/ManageAgents';
import Reports from './pages/admin/Reports';
import StudentProfile from './pages/dashboard/StudentProfile';
import StudentApplications from './pages/dashboard/StudentApplications';
import ApplicationDetails from './pages/dashboard/ApplicationDetails';
import StudentNotifications from './pages/dashboard/StudentNotifications';
import UnauthorizedPage from './pages/UnauthorizedPage';
import AdminMessages from './pages/admin/AdminMessages';
import AdminNotifications from './pages/admin/AdminNotifications';
import AccountSettings from './pages/dashboard/AccountSettings';
import LoginActivity from './pages/dashboard/LoginActivity';
import UserMessages from './pages/messaging/UserMessages';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/engineering" element={<EngineeringPrograms />} />
        <Route path="/programs/medical" element={<MedicalPrograms />} />
        <Route path="/programs/software-engineering" element={<SoftwareEngineeringProgram />} />
        <Route path="/program/:id" element={<ProgramDetails />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/turkey" element={<TurkishUniversities />} />
        <Route path="/university/:id" element={<UniversityDetails />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:id" element={<CountryDetails />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/apply" element={<StudentApplication />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="applications" element={<StudentApplications />} />
          <Route path="applications/:id" element={<ApplicationDetails />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="settings" element={<AccountSettings />} />
          <Route path="login-activity" element={<LoginActivity />} />
          <Route path="messages" element={<UserMessages />} />
          
          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/students" element={<ManageStudents />} />
          <Route path="admin/programs" element={<ManagePrograms />} />
          <Route path="admin/universities" element={<ManageUniversities />} />
          <Route path="admin/applications" element={<ManageApplications />} />
          <Route path="admin/agents" element={<ManageAgents />} />
          <Route path="admin/messages" element={<AdminMessages />} />
          <Route path="admin/notifications" element={<AdminNotifications />} />
          <Route path="admin/reports" element={<Reports />} />
          
          {/* Agent Routes */}
          <Route path="agent" element={<AgentDashboard />} />
        </Route>
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
