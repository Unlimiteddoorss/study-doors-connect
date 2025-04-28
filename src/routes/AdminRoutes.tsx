
import { Route } from "react-router-dom";
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
    <>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<ManageStudents />} />
      <Route path="/admin/agents" element={<ManageAgents />} />
      <Route path="/admin/programs" element={<ManagePrograms />} />
      <Route path="/admin/applications" element={<ManageApplications />} />
      <Route path="/admin/universities" element={<ManageUniversities />} />
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
      <Route path="/admin/reports" element={<Reports />} />
    </>
  );
};
