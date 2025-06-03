import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from '@/components/layout/MainLayout';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import SupportPage from '@/pages/SupportPage';
import FAQ from '@/pages/FAQ';
import ProgramsPage from '@/pages/ProgramsPage';
import ProgramDetails from '@/pages/ProgramDetails';
import Universities from '@/pages/Universities';
import UniversityDetails from '@/pages/UniversityDetails';
import Countries from '@/pages/Countries';
import CountryDetails from '@/pages/CountryDetails';
import Testimonials from '@/pages/Testimonials';
import Services from '@/pages/Services';
import Scholarships from '@/pages/Scholarships';
import TurkishUniversities from '@/pages/TurkishUniversities';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/students/Dashboard';
import StudentMessages from '@/pages/students/StudentMessages';
import Profile from '@/pages/students/Profile';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import EnhancedDashboard from '@/pages/admin/EnhancedDashboard';
import SystemSettings from '@/pages/admin/SystemSettings';
import AdminOverview from '@/pages/admin/AdminOverview';
import EnhancedStudentsManagement from '@/pages/admin/EnhancedStudentsManagement';
import ManageApplications from '@/pages/admin/ManageApplications';
import ApplicationDetails from '@/pages/admin/ApplicationDetails';
import ManageUniversities from '@/pages/admin/ManageUniversities';
import ReviewUniversities from '@/pages/admin/ReviewUniversities';
import EnhancedProgramsManagement from '@/pages/admin/EnhancedProgramsManagement';
import EnhancedAgentsManagement from '@/pages/admin/EnhancedAgentsManagement';
import AdminMessages from '@/pages/admin/AdminMessages';
import AdminNotifications from '@/pages/admin/AdminNotifications';
import Reports from '@/pages/admin/Reports';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import UnauthorizedPage from '@/pages/UnauthorizedPage';
import HomePage from '@/pages/HomePage';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import SecureLoginForm from '@/components/auth/SecureLoginForm';
import SecureRegisterForm from '@/components/auth/SecureRegisterForm';
import EnhancedStudentDashboard from '@/pages/students/EnhancedStudentDashboard';
import ApplicationForm from '@/pages/ApplicationForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:country" element={<CountryDetails />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/services" element={<Services />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/turkish-universities" element={<TurkishUniversities />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Application Form Route */}
        <Route path="/apply" element={<ApplicationForm />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={
          <MainLayout>
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
                </div>
                <SecureLoginForm />
              </div>
            </div>
          </MainLayout>
        } />
        <Route path="/register" element={
          <MainLayout>
            <div className="container mx-auto px-4 py-12">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
                </div>
                <SecureRegisterForm />
              </div>
            </div>
          </MainLayout>
        } />
        
        {/* Protected student routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/student-dashboard" element={
          <ProtectedRoute allowedRoles={['student']}>
            <EnhancedStudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentApplications />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/profile" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/student-messages" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentMessages />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* Protected admin routes */}
        <Route path="/admin/*" element={
          <ProtectedRoute requiredRole="admin">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="dashboard" element={<EnhancedDashboard />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="overview" element={<AdminOverview />} />
              <Route path="students" element={<EnhancedStudentsManagement />} />
              <Route path="applications" element={<ManageApplications />} />
              <Route path="applications/:id" element={<ApplicationDetails />} />
              <Route path="universities" element={<ManageUniversities />} />
              <Route path="universities/review" element={<ReviewUniversities />} />
              <Route path="programs" element={<EnhancedProgramsManagement />} />
              <Route path="agents" element={<EnhancedAgentsManagement />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </ProtectedRoute>
        } />
        
        {/* Protected agent routes */}
        <Route path="/agent" element={
          <ProtectedRoute requiredRole="agent">
            <AgentDashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
