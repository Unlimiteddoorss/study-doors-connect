
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Scholarships from "./pages/Scholarships";
import Universities from "./pages/Universities";
import TurkishUniversities from "./pages/TurkishUniversities";
import MedicalPrograms from "./pages/MedicalPrograms";
import EngineeringPrograms from "./pages/EngineeringPrograms";
import UniversityDetails from "./pages/UniversityDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import StudentApplication from "./pages/StudentApplication";
import Services from "./pages/Services";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageAgents from "./pages/admin/ManageAgents";
import ManagePrograms from "./pages/admin/ManagePrograms";
import ManageApplications from "./pages/admin/ManageApplications";
import ManageUniversities from "./pages/admin/ManageUniversities";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminMessages from "./pages/admin/AdminMessages";
import AgentDashboard from "./pages/agent/AgentDashboard";
import StudentApplications from "./pages/dashboard/StudentApplications";
import StudentProfile from "./pages/dashboard/StudentProfile";
import StudentNotifications from "./pages/dashboard/StudentNotifications";
import UserMessages from "./pages/messaging/UserMessages";
import Reports from "./pages/admin/Reports";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/countries/:id" element={<CountryDetails />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/:id" element={<ProgramDetails />} />
      <Route path="/medical-programs" element={<MedicalPrograms />} />
      <Route path="/engineering-programs" element={<EngineeringPrograms />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/universities" element={<Universities />} />
      <Route path="/turkish-universities" element={<TurkishUniversities />} />
      <Route path="/universities/:id" element={<UniversityDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apply" element={<StudentApplication />} />
      <Route path="/dashboard/applications" element={<StudentApplications />} />
      <Route path="/dashboard/profile" element={<StudentProfile />} />
      <Route path="/dashboard/notifications" element={<StudentNotifications />} />
      <Route path="/messages" element={<UserMessages />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<ManageStudents />} />
      <Route path="/admin/agents" element={<ManageAgents />} />
      <Route path="/admin/programs" element={<ManagePrograms />} />
      <Route path="/admin/applications" element={<ManageApplications />} />
      <Route path="/admin/universities" element={<ManageUniversities />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
      <Route path="/admin/reports" element={<Reports />} />

      <Route path="/agent" element={<AgentDashboard />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
