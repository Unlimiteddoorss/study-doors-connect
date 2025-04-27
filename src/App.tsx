
import { Routes, Route, Navigate } from "react-router-dom";
import { useRole } from "./hooks/useRole";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RoleSwitcher from "./components/auth/RoleSwitcher";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import ApplicationDetails from "./pages/dashboard/ApplicationDetails";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Import missing components
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import LoginPage from "./pages/LoginPage";
import MedicalPrograms from "./pages/MedicalPrograms";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";

// Create temporary placeholder components for development
// These components will be replaced with actual implementations later
const About = () => <div className="p-8">About Page (Coming Soon)</div>;
const Contact = () => <div className="p-8">Contact Page (Coming Soon)</div>;
const Services = () => <div className="p-8">Services Page (Coming Soon)</div>;
const Countries = () => <div className="p-8">Countries Page (Coming Soon)</div>;
const CountryDetails = () => <div className="p-8">Country Details Page (Coming Soon)</div>;
const EngineeringPrograms = () => <div className="p-8">Engineering Programs Page (Coming Soon)</div>;
const Scholarships = () => <div className="p-8">Scholarships Page (Coming Soon)</div>;
const Universities = () => <div className="p-8">Universities Page (Coming Soon)</div>;
const TurkishUniversities = () => <div className="p-8">Turkish Universities Page (Coming Soon)</div>;
const UniversityDetails = () => <div className="p-8">University Details Page (Coming Soon)</div>;
const Register = () => <div className="p-8">Register Page (Coming Soon)</div>;

// Dashboard components
const Dashboard = () => <div className="p-8">Dashboard (Coming Soon)</div>;
const StudentApplication = () => <div className="p-8">Student Application Form (Coming Soon)</div>;
const StudentApplications = () => <div className="p-8">Student Applications List (Coming Soon)</div>;
const StudentProfile = () => <div className="p-8">Student Profile (Coming Soon)</div>;
const StudentNotifications = () => <div className="p-8">Student Notifications (Coming Soon)</div>;
const LoginActivity = () => <div className="p-8">Login Activity (Coming Soon)</div>;
const AccountSettings = () => <div className="p-8">Account Settings (Coming Soon)</div>;

// Admin components
const AdminDashboard = () => <div className="p-8">Admin Dashboard (Coming Soon)</div>;
const ManageStudents = () => <div className="p-8">Manage Students (Coming Soon)</div>;
const ManageAgents = () => <div className="p-8">Manage Agents (Coming Soon)</div>;
const ManagePrograms = () => <div className="p-8">Manage Programs (Coming Soon)</div>;
const ManageApplications = () => <div className="p-8">Manage Applications (Coming Soon)</div>;
const ManageUniversities = () => <div className="p-8">Manage Universities (Coming Soon)</div>;
const AdminNotifications = () => <div className="p-8">Admin Notifications (Coming Soon)</div>;
const AdminMessages = () => <div className="p-8">Admin Messages (Coming Soon)</div>;
const Reports = () => <div className="p-8">Reports (Coming Soon)</div>;

// Agent components
const AgentDashboard = () => <div className="p-8">Agent Dashboard (Coming Soon)</div>;
const UserMessages = () => <div className="p-8">User Messages (Coming Soon)</div>;

function App() {
  const { userRole, updateRole } = useRole();

  return (
    <>
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

        <Route path="/dashboard" element={
          userRole === 'admin' ? <Navigate to="/admin" replace /> : (
            <ProtectedRoute allowedRoles={['student', 'agent']} userRole={userRole}>
              <Dashboard />
            </ProtectedRoute>
          )
        } />

        <Route path="/apply" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentApplication />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentApplications />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/applications/:id" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <ApplicationDetails />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/profile" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentProfile />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/notifications" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <StudentNotifications />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/login-activity" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <LoginActivity />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/account-settings" element={
          <ProtectedRoute allowedRoles={['student']} userRole={userRole}>
            <AccountSettings />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']} userRole={userRole}>
            <Routes>
              <Route path="students" element={<ManageStudents />} />
              <Route path="agents" element={<ManageAgents />} />
              <Route path="programs" element={<ManagePrograms />} />
              <Route path="applications" element={<ManageApplications />} />
              <Route path="universities" element={<ManageUniversities />} />
              <Route path="notifications" element={<AdminNotifications />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </ProtectedRoute>
        } />

        <Route path="/agent" element={
          <ProtectedRoute allowedRoles={['agent']} userRole={userRole}>
            <AgentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/agent/*" element={
          <ProtectedRoute allowedRoles={['agent']} userRole={userRole}>
            <Routes>
              <Route path="students" element={<AgentDashboard />} />
              <Route path="applications" element={<AgentDashboard />} />
              <Route path="messages" element={<UserMessages />} />
              <Route path="notifications" element={<StudentNotifications />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="settings" element={<AccountSettings />} />
            </Routes>
          </ProtectedRoute>
        } />

        <Route path="/messages" element={
          <ProtectedRoute allowedRoles={['student', 'agent']} userRole={userRole}>
            <UserMessages />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
      <RoleSwitcher currentRole={userRole} onRoleChange={updateRole} />
    </>
  );
}

export default App;
