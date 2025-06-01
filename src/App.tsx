
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from 'sonner';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

// Public Pages
import HomePage from '@/pages/HomePage';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Services from '@/pages/Services';
import Universities from '@/pages/Universities';
import UniversityDetails from '@/pages/UniversityDetails';
import Programs from '@/pages/Programs';
import ProgramDetails from '@/pages/ProgramDetails';
import Countries from '@/pages/Countries';
import CountryDetails from '@/pages/CountryDetails';
import Contact from '@/pages/Contact';
import FAQ from '@/pages/FAQ';
import Support from '@/pages/Support';
import Testimonials from '@/pages/Testimonials';
import Scholarships from '@/pages/Scholarships';
import TurkishUniversities from '@/pages/TurkishUniversities';

// Auth Pages
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPassword from '@/pages/ForgotPassword';

// Dashboard Pages
import Dashboard from '@/pages/Dashboard';
import StudentProfile from '@/pages/dashboard/StudentProfile';
import StudentApplications from '@/pages/dashboard/StudentApplications';
import ApplicationDetails from '@/pages/dashboard/ApplicationDetails';
import StudentNotifications from '@/pages/dashboard/StudentNotifications';
import AccountSettings from '@/pages/dashboard/AccountSettings';
import LoginActivity from '@/pages/dashboard/LoginActivity';

// Application Pages
import ApplicationForm from '@/pages/ApplicationForm';
import StudentApplication from '@/pages/StudentApplication';
import TurkishUniversityApplication from '@/pages/TurkishUniversityApplication';

// Admin Pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EnhancedDashboard from '@/pages/admin/EnhancedDashboard';
import AdminOverview from '@/pages/admin/AdminOverview';
import ManageStudents from '@/pages/admin/ManageStudents';
import EnhancedStudentsManagement from '@/pages/admin/EnhancedStudentsManagement';
import ManageApplications from '@/pages/admin/ManageApplications';
import ManageUniversities from '@/pages/admin/ManageUniversities';
import ReviewUniversities from '@/pages/admin/ReviewUniversities';
import ManagePrograms from '@/pages/admin/ManagePrograms';
import EnhancedProgramsManagement from '@/pages/admin/EnhancedProgramsManagement';
import ManageAgents from '@/pages/admin/ManageAgents';
import AgentsManagement from '@/pages/admin/AgentsManagement';
import EnhancedAgentsManagement from '@/pages/admin/EnhancedAgentsManagement';
import Reports from '@/pages/admin/Reports';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminNotifications from '@/pages/admin/AdminNotifications';

// Agent Pages
import AgentDashboard from '@/pages/agent/AgentDashboard';

// Messaging Pages
import UserMessages from '@/pages/messaging/UserMessages';
import StudentMessages from '@/pages/students/StudentMessages';

// Program Category Pages
import MedicalPrograms from '@/pages/MedicalPrograms';
import EngineeringPrograms from '@/pages/EngineeringPrograms';
import ProgramsPage from '@/pages/ProgramsPage';

// Utility Pages
import NotFound from '@/pages/NotFound';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import Index from '@/pages/Index';

// Application Status
import ApplicationStatus from '@/pages/ApplicationStatus';
import Profile from '@/pages/Profile';
import Messages from '@/pages/Messages';
import Login from '@/pages/Login';

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system">
        <ErrorBoundary>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                {/* Home Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/homepage" element={<HomePage />} />
                
                {/* Public Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/support" element={<Support />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/scholarships" element={<Scholarships />} />
                
                {/* Universities & Programs */}
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:id" element={<UniversityDetails />} />
                <Route path="/turkish-universities" element={<TurkishUniversities />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/programs-page" element={<ProgramsPage />} />
                <Route path="/programs/:id" element={<ProgramDetails />} />
                <Route path="/medical-programs" element={<MedicalPrograms />} />
                <Route path="/engineering-programs" element={<EngineeringPrograms />} />
                
                {/* Countries */}
                <Route path="/countries" element={<Countries />} />
                <Route path="/countries/:id" element={<CountryDetails />} />
                
                {/* Authentication */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/login" element={<Login />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Student Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/profile" element={<StudentProfile />} />
                <Route path="/dashboard/applications" element={<StudentApplications />} />
                <Route path="/dashboard/applications/:id" element={<ApplicationDetails />} />
                <Route path="/dashboard/notifications" element={<StudentNotifications />} />
                <Route path="/dashboard/settings" element={<AccountSettings />} />
                <Route path="/dashboard/login-activity" element={<LoginActivity />} />
                
                {/* Applications */}
                <Route path="/apply" element={<ApplicationForm />} />
                <Route path="/student-application" element={<StudentApplication />} />
                <Route path="/turkish-university-application" element={<TurkishUniversityApplication />} />
                <Route path="/application-status/:id" element={<ApplicationStatus />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<EnhancedDashboard />} />
                <Route path="/admin/overview" element={<AdminOverview />} />
                <Route path="/admin/students" element={<ManageStudents />} />
                <Route path="/admin/students-enhanced" element={<EnhancedStudentsManagement />} />
                <Route path="/admin/applications" element={<ManageApplications />} />
                <Route path="/admin/universities" element={<ManageUniversities />} />
                <Route path="/admin/universities/review" element={<ReviewUniversities />} />
                <Route path="/admin/programs" element={<ManagePrograms />} />
                <Route path="/admin/programs-enhanced" element={<EnhancedProgramsManagement />} />
                <Route path="/admin/agents" element={<ManageAgents />} />
                <Route path="/admin/agents-management" element={<AgentsManagement />} />
                <Route path="/admin/agents-enhanced" element={<EnhancedAgentsManagement />} />
                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
                <Route path="/admin/notifications" element={<AdminNotifications />} />
                
                {/* Agent Routes */}
                <Route path="/agent" element={<AgentDashboard />} />
                
                {/* Messages */}
                <Route path="/messages" element={<Messages />} />
                <Route path="/user-messages" element={<UserMessages />} />
                <Route path="/student-messages" element={<StudentMessages />} />
                
                {/* Profile */}
                <Route path="/profile" element={<Profile />} />
                
                {/* Utility Routes */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Toaster />
            <SonnerToaster position="top-right" />
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
