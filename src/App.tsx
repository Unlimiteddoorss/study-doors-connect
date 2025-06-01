import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';

// Import pages
import Home from '@/pages/Home';
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
import StudentDashboard from '@/pages/student/StudentDashboard';
import StudentProfile from '@/pages/student/StudentProfile';
import StudentApplications from '@/pages/student/StudentApplications';
import StudentDocuments from '@/pages/student/StudentDocuments';
import StudentNotifications from '@/pages/student/StudentNotifications';
import StudentSettings from '@/pages/student/StudentSettings';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ManageStudents from '@/pages/admin/ManageStudents';
import ManageAgents from '@/pages/admin/ManageAgents';
import ManageUniversities from '@/pages/admin/ManageUniversities';
import AdminReports from '@/pages/admin/AdminReports';
import AdminSettings from '@/pages/admin/AdminSettings';
import AgentDashboard from '@/pages/agent/AgentDashboard';
import AgentStudents from '@/pages/agent/AgentStudents';
import AgentApplications from '@/pages/agent/AgentApplications';
import AgentProfile from '@/pages/agent/AgentProfile';
import AgentSettings from '@/pages/agent/AgentSettings';
import Support from '@/pages/Support';
import FAQ from '@/pages/FAQ';
import NotFound from '@/pages/NotFound';
import EngineeringPrograms from '@/pages/EngineeringPrograms';
import MedicalPrograms from '@/pages/MedicalPrograms';
import TurkishUniversities from '@/pages/TurkishUniversities';

// Import components
import ScrollToTop from '@/components/shared/ScrollToTop';
import PWAInstaller from '@/components/shared/PWAInstaller';
import DarkModeToggle from '@/components/shared/DarkModeToggle';
import ManagePrograms from './pages/admin/ManagePrograms';
import ManageApplications from './pages/admin/ManageApplications';

const queryClient = new QueryClient();

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Caught error: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong.</h1>
          <p className="text-gray-700">We're sorry, an error occurred. Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <div className="App">
              <ErrorBoundary>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
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
                  <Route path="/dashboard" element={<StudentDashboard />} />
                  <Route path="/dashboard/profile" element={<StudentProfile />} />
                  <Route path="/dashboard/applications" element={<StudentApplications />} />
                  <Route path="/dashboard/documents" element={<StudentDocuments />} />
                  <Route path="/dashboard/notifications" element={<StudentNotifications />} />
                  <Route path="/dashboard/settings" element={<StudentSettings />} />
                  
                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/students" element={<ManageStudents />} />
                  <Route path="/admin/agents" element={<ManageAgents />} />
                  <Route path="/admin/universities" element={<ManageUniversities />} />
                  <Route path="/admin/programs" element={<ManagePrograms />} />
                  <Route path="/admin/applications" element={<ManageApplications />} />
                  <Route path="/admin/reports" element={<AdminReports />} />
                  <Route path="/admin/settings" element={<AdminSettings />} />
                  
                  {/* Agent Dashboard Routes */}
                  <Route path="/agent" element={<AgentDashboard />} />
                  <Route path="/agent/students" element={<AgentStudents />} />
                  <Route path="/agent/applications" element={<AgentApplications />} />
                  <Route path="/agent/profile" element={<AgentProfile />} />
                  <Route path="/agent/settings" element={<AgentSettings />} />
                  
                  {/* Support Routes */}
                  <Route path="/support" element={<Support />} />
                  <Route path="/faq" element={<FAQ />} />
                  
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
