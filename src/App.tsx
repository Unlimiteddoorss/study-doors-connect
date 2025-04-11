
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import TurkishUniversities from './pages/TurkishUniversities';
import UniversityDetails from './pages/UniversityDetails';
import ProgramDetails from './pages/ProgramDetails';
import ApplicationForm from './pages/ApplicationForm';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminDashboard from './pages/admin/Dashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageApplications from './pages/admin/ManageApplications';
import ManagePrograms from './pages/admin/ManagePrograms';
import Faq from './pages/Faq';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:id" element={<CountryDetails />} />
        <Route path="/turkish-universities" element={<TurkishUniversities />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        <Route path="/programs/:id" element={<ProgramDetails />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/faq" element={<Faq />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/applications" element={<ManageApplications />} />
        <Route path="/admin/programs" element={<ManagePrograms />} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
