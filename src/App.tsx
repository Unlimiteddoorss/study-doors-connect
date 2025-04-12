
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Countries from './pages/Countries';
import CountryDetails from './pages/CountryDetails';
import NotFound from './pages/NotFound';
import TurkishUniversities from './pages/TurkishUniversities';
import UniversityDetails from './pages/UniversityDetails';
import ProgramDetails from './pages/ProgramDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Programs from './pages/Programs';
import Universities from './pages/Universities';
import Apply from './pages/Apply';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import StudentApplications from './pages/dashboard/StudentApplications';
import StudentMessages from './pages/dashboard/StudentMessages';
import StudentNotifications from './pages/dashboard/StudentNotifications';
import StudentProfile from './pages/dashboard/StudentProfile';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:id" element={<CountryDetails />} />
      <Route path="/turkish-universities" element={<TurkishUniversities />} />
      <Route path="/universities" element={<Universities />} />
      <Route path="/universities/:id" element={<UniversityDetails />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/:id" element={<ProgramDetails />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route path="/dashboard/applications" element={<StudentApplications />} />
      <Route path="/dashboard/messages" element={<StudentMessages />} />
      <Route path="/dashboard/notifications" element={<StudentNotifications />} />
      <Route path="/dashboard/profile" element={<StudentProfile />} />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
