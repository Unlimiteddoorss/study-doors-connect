
import { Routes, Route } from "react-router-dom";
import AgentDashboard from "@/pages/agent/AgentDashboard";
import AgentApplications from "@/pages/agent/AgentApplications";
import AgentStudents from "@/pages/agent/AgentStudents";
import AgentProfile from "@/pages/agent/AgentProfile";
import AgentMessages from "@/pages/agent/AgentMessages";
import AgentReports from "@/pages/agent/AgentReports";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route index element={<AgentDashboard />} />
      <Route path="applications" element={<AgentApplications />} />
      <Route path="students" element={<AgentStudents />} />
      <Route path="profile" element={<AgentProfile />} />
      <Route path="messages" element={<AgentMessages />} />
      <Route path="reports" element={<AgentReports />} />
    </Routes>
  );
};
