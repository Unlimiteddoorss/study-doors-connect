
import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import StudentApplication from "@/pages/StudentApplication";
import StudentApplications from "@/pages/dashboard/StudentApplications";
import ApplicationDetails from "@/pages/dashboard/ApplicationDetails";
import StudentProfile from "@/pages/dashboard/StudentProfile";
import StudentNotifications from "@/pages/dashboard/StudentNotifications";
import LoginActivity from "@/pages/dashboard/LoginActivity";
import AccountSettings from "@/pages/dashboard/AccountSettings";
import UserMessages from "@/pages/messaging/UserMessages";

export const StudentRoutes = () => {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="applications" element={<StudentApplications />} />
      <Route path="applications/:id" element={<ApplicationDetails />} />
      <Route path="profile" element={<StudentProfile />} />
      <Route path="notifications" element={<StudentNotifications />} />
      <Route path="login-activity" element={<LoginActivity />} />
      <Route path="account-settings" element={<AccountSettings />} />
      <Route path="messages" element={<UserMessages />} />
    </Routes>
  );
};
