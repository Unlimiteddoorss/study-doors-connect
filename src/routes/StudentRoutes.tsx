
import { Route } from "react-router-dom";
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
    <>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/apply" element={<StudentApplication />} />
      <Route path="/dashboard/applications" element={<StudentApplications />} />
      <Route path="/dashboard/applications/:id" element={<ApplicationDetails />} />
      <Route path="/dashboard/profile" element={<StudentProfile />} />
      <Route path="/dashboard/notifications" element={<StudentNotifications />} />
      <Route path="/dashboard/login-activity" element={<LoginActivity />} />
      <Route path="/dashboard/account-settings" element={<AccountSettings />} />
      <Route path="/messages" element={<UserMessages />} />
    </>
  );
};
