
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ProgramsPage from '@/pages/ProgramsPage';
import ProgramDetails from '@/pages/ProgramDetails';
import Universities from '@/pages/Universities';
import UniversityDetails from '@/pages/UniversityDetails';
import Dashboard from '@/pages/Dashboard';
import ApplicationForm from '@/pages/ApplicationForm';
import ApplicationStatus from '@/pages/ApplicationStatus';
import Messages from '@/pages/Messages';
import Profile from '@/pages/Profile';
import SupportPage from '@/pages/SupportPage';
import AdminOverview from '@/pages/admin/AdminOverview';
import TurkishUniversities from '@/pages/TurkishUniversities';
import EngineeringPrograms from '@/pages/EngineeringPrograms';
import MedicalPrograms from '@/pages/MedicalPrograms';
import TurkishUniversityApplication from '@/pages/TurkishUniversityApplication';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/program/:id" element={<ProgramDetails />} />
        <Route path="/universities" element={<Universities />} />
        <Route path="/university/:id" element={<UniversityDetails />} />
        <Route path="/turkish-universities" element={<TurkishUniversities />} />
        <Route path="/engineering-programs" element={<EngineeringPrograms />} />
        <Route path="/medical-programs" element={<MedicalPrograms />} />
        <Route path="/turkish-university-application" element={<TurkishUniversityApplication />} />
        <Route path="/support" element={<SupportPage />} />
        
        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/application" element={<ApplicationForm />} />
        <Route path="/application/:id" element={<ApplicationStatus />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/*" element={<AdminOverview />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
