
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ManageStudents from "@/pages/admin/ManageStudents";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManagePrograms from "@/pages/admin/ManagePrograms";
import ManageApplications from "@/pages/admin/ManageApplications";
import ManageUniversities from "@/pages/admin/ManageUniversities";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminMessages from "@/pages/admin/AdminMessages";
import Reports from "@/pages/admin/Reports";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="students" element={<ManageStudents />} />
      <Route path="agents" element={<ManageAgents />} />
      <Route path="programs" element={<ManagePrograms />} />
      <Route path="applications" element={<ManageApplications />} />
      <Route path="universities" element={<ManageUniversities />} />
      <Route path="notifications" element={<AdminNotifications />} />
      <Route path="messages" element={<AdminMessages />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};
