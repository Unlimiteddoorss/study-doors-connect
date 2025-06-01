
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme/ThemeProvider"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

// Import pages - using existing pages
import HomePage from '@/pages/HomePage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Programs from '@/pages/Programs';
import ProgramDetails from '@/pages/ProgramDetails';
import Universities from '@/pages/Universities';
import UniversityDetails from '@/pages/UniversityDetails';
import Countries from '@/pages/Countries';
import CountryDetails from '@/pages/CountryDetails';
import StudentApplication from '@/pages/StudentApplication';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import ApplicationStatus from '@/pages/ApplicationStatus';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageStudents from '@/pages/admin/ManageStudents';
import ManageAgents from '@/pages/admin/ManageAgents';
import ManageUniversities from '@/pages/admin/ManageUniversities';
import ManagePrograms from '@/pages/admin/ManagePrograms';
import ManageApplications from '@/pages/admin/ManageApplications';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import Support from '@/pages/Support';
import NotFound from '@/pages/NotFound';
import EngineeringPrograms from '@/pages/EngineeringPrograms';
import MedicalPrograms from '@/pages/MedicalPrograms';
import TurkishUniversities from '@/pages/TurkishUniversities';

// Import components
import ScrollToTop from '@/components/shared/ScrollToTop';
import PWAInstaller from '@/components/shared/PWAInstaller';
import DarkModeToggle from '@/components/shared/DarkModeToggle';
import ErrorBoundary from '@/components/shared/ErrorBoundary';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light">
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <div className="App">
              <ErrorBoundary>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Programs Routes */}
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/programs/:id" element={<ProgramDetails />} />
                  <Route path="/programs/engineering" element={<EngineeringPrograms />} />
                  <Route path="/programs/medical" element={<MedicalPrograms />} />
                  
                  {/* Universities Routes */}
                  <Route path="/universities" element={<Universities />} />
                  <Route path="/universities/:id" element={<UniversityDetails />} />
                  <Route path="/universities/turkey" element={<TurkishUniversities />} />
                  
                  {/* Countries Routes */}
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/countries/:country" element={<CountryDetails />} />
                  
                  {/* Application Routes */}
                  <Route path="/apply" element={<StudentApplication />} />
                  
                  {/* Student Dashboard Routes */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/profile" element={<Profile />} />
                  <Route path="/dashboard/applications" element={<ApplicationStatus />} />
                  
                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<ManageStudents />} />
                  <Route path="/admin/agents" element={<ManageAgents />} />
                  <Route path="/admin/universities" element={<ManageUniversities />} />
                  <Route path="/admin/programs" element={<ManagePrograms />} />
                  <Route path="/admin/applications" element={<ManageApplications />} />
                  
                  {/* Agent Dashboard Routes */}
                  <Route path="/agent" element={<AgentDashboard />} />
                  
                  {/* Support Routes */}
                  <Route path="/support" element={<Support />} />
                  
                  {/* Fallback Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
              <ScrollToTop />
              <PWAInstaller />
              <DarkModeToggle />
              <Toaster />
            </div>
          </QueryClientProvider>
        </HelmetProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
