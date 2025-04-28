
import { Routes, Route } from "react-router-dom";
import AgentDashboard from "@/pages/agent/AgentDashboard";

export const AgentRoutes = () => {
  return (
    <Routes>
      <Route index element={<AgentDashboard />} />
      {/* Add more agent routes here as they are developed */}
      <Route path="students" element={<div>Agent Students Management</div>} />
      <Route path="applications" element={<div>Agent Applications Management</div>} />
      <Route path="messages" element={<div>Agent Messages</div>} />
      <Route path="notifications" element={<div>Agent Notifications</div>} />
      <Route path="profile" element={<div>Agent Profile</div>} />
      <Route path="settings" element={<div>Agent Settings</div>} />
    </Routes>
  );
};
