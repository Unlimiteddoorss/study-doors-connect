
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Universities from './pages/Universities';
import UniversityDetails from './pages/UniversityDetails';
import TurkishUniversities from './pages/TurkishUniversities';
import Programs from './pages/Programs';
import ProgramDetails from './pages/ProgramDetails';
import EngineeringPrograms from './pages/EngineeringPrograms';
import MedicalPrograms from './pages/MedicalPrograms';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Scholarships from './pages/Scholarships';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import StudentApplication from './pages/StudentApplication';
import Dashboard from './pages/Dashboard'; // Fixed import path
import StudentApplications from './pages/dashboard/StudentApplications';
import StudentNotifications from './pages/dashboard/StudentNotifications';
import StudentProfile from './pages/dashboard/StudentProfile';
import UserMessages from './pages/messaging/UserMessages'; // Fixed import path
import AgentDashboard from './pages/agent/AgentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUniversities from './pages/admin/ManageUniversities';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageApplications from './pages/admin/ManageApplications';
import ManageStudents from './pages/admin/ManageStudents';
import ManageAgents from './pages/admin/ManageAgents';
import Reports from './pages/admin/Reports';
import AdminMessages from './pages/admin/AdminMessages';
import AdminNotifications from './pages/admin/AdminNotifications';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster"
import ApplicationDetails from './pages/dashboard/ApplicationDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        <Route path="/turkish-universities" element={<TurkishUniversities />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/engineering-programs" element={<EngineeringPrograms />} />
        <Route path="/medical-programs" element={<MedicalPrograms />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="/scholarships" element={<Scholarships />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/application" element={<StudentApplication />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/applications" element={<StudentApplications />} />
        <Route path="/dashboard/applications/:id" element={<ApplicationDetails />} />
        <Route path="/dashboard/notifications" element={<StudentNotifications />} />
        <Route path="/dashboard/profile" element={<StudentProfile />} />
        <Route path="/dashboard/messages" element={<UserMessages />} />

        {/* Agent Routes */}
        <Route path="/agent" element={<AgentDashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/universities" element={<ManageUniversities />} />
        <Route path="/admin/programs" element={<ManagePrograms />} />
        <Route path="/admin/applications" element={<ManageApplications />} />
        <Route path="/admin/students" element={<ManageStudents />} />
        <Route path="/admin/agents" element={<ManageAgents />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />
        
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
