
import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Countries from "@/pages/Countries";
import CountryDetails from "@/pages/CountryDetails";
import Programs from "@/pages/Programs";
import ProgramDetails from "@/pages/ProgramDetails";
import Scholarships from "@/pages/Scholarships";
import Universities from "@/pages/Universities";
import TurkishUniversities from "@/pages/TurkishUniversities";
import Services from "@/pages/Services";
import UniversityDetails from "@/pages/UniversityDetails";
import Login from "@/pages/Login";
import LoginPage from "@/pages/LoginPage";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import EngineeringPrograms from "@/pages/EngineeringPrograms";
import MedicalPrograms from "@/pages/MedicalPrograms";
import UnauthorizedPage from "@/pages/UnauthorizedPage";
import StudentApplication from "@/pages/StudentApplication";
import UserMessages from "@/pages/messaging/UserMessages";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/accommodation" element={<Services />} />
      <Route path="/services/support" element={<Services />} />
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/apply" element={<StudentApplication />} />
      <Route path="/messages" element={<UserMessages />} />
    </Routes>
  );
};
