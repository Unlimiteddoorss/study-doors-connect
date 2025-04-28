
import { Route } from "react-router-dom";
import AgentDashboard from "@/pages/agent/AgentDashboard";

export const AgentRoutes = () => {
  return (
    <Route path="/agent" element={<AgentDashboard />} />
  );
};
