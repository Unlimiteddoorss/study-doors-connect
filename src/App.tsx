
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
        <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/dashboard/profile" element={<DashboardLayout><StudentProfile /></DashboardLayout>} />
        <Route path="/dashboard/applications" element={<DashboardLayout><StudentApplications /></DashboardLayout>} />
        <Route path="/dashboard/applications/:id" element={<DashboardLayout><ApplicationDetails /></DashboardLayout>} />
        <Route path="/dashboard/notifications" element={<DashboardLayout><StudentNotifications /></DashboardLayout>} />
        <Route path="/dashboard/settings" element={<DashboardLayout><AccountSettings /></DashboardLayout>} />
        <Route path="/dashboard/login-activity" element={<DashboardLayout><LoginActivity /></DashboardLayout>} />
        <Route path="/dashboard/messages" element={<DashboardLayout><UserMessages /></DashboardLayout>} />
        
        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<DashboardLayout userRole="admin"><AdminDashboard /></DashboardLayout>} />
        <Route path="/dashboard/admin/students" element={<DashboardLayout userRole="admin"><ManageStudents /></DashboardLayout>} />
        <Route path="/dashboard/admin/programs" element={<DashboardLayout userRole="admin"><ManagePrograms /></DashboardLayout>} />
        <Route path="/dashboard/admin/universities" element={<DashboardLayout userRole="admin"><ManageUniversities /></DashboardLayout>} />
        <Route path="/dashboard/admin/applications" element={<DashboardLayout userRole="admin"><ManageApplications /></DashboardLayout>} />
        <Route path="/dashboard/admin/agents" element={<DashboardLayout userRole="admin"><ManageAgents /></DashboardLayout>} />
        <Route path="/dashboard/admin/messages" element={<DashboardLayout userRole="admin"><AdminMessages /></DashboardLayout>} />
        <Route path="/dashboard/admin/notifications" element={<DashboardLayout userRole="admin"><AdminNotifications /></DashboardLayout>} />
        <Route path="/dashboard/admin/reports" element={<DashboardLayout userRole="admin"><Reports /></DashboardLayout>} />
        
        {/* Agent Routes */}
        <Route path="/dashboard/agent" element={<DashboardLayout userRole="agent"><AgentDashboard /></DashboardLayout>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
