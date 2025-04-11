
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import Countries from "./pages/Countries";
import CountryDetails from "./pages/CountryDetails";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import StudentApplication from "./pages/StudentApplication";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageStudents from "./pages/admin/ManageStudents";
import ManageAgents from "./pages/admin/ManageAgents";
import ManageUniversities from "./pages/admin/ManageUniversities";
import ManageApplications from "./pages/admin/ManageApplications";
import ManagePrograms from "./pages/admin/ManagePrograms";
import AgentDashboard from "./pages/agent/AgentDashboard";
import UserMessages from "./pages/messaging/UserMessages";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminNotifications from "./pages/admin/AdminNotifications";
import StudentMessages from "./pages/students/StudentMessages";

// Dashboard pages
import StudentApplications from "./pages/dashboard/StudentApplications";
import StudentProfile from "./pages/dashboard/StudentProfile";
import StudentNotifications from "./pages/dashboard/StudentNotifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<CountryDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/apply" element={<StudentApplication />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<UserMessages />} />
          <Route path="/student/messages" element={<StudentMessages />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/dashboard/applications" element={<StudentApplications />} />
          <Route path="/dashboard/profile" element={<StudentProfile />} />
          <Route path="/dashboard/notifications" element={<StudentNotifications />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<ManageStudents />} />
          <Route path="/admin/agents" element={<ManageAgents />} />
          <Route path="/admin/universities" element={<ManageUniversities />} />
          <Route path="/admin/applications" element={<ManageApplications />} />
          <Route path="/admin/programs" element={<ManagePrograms />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          
          {/* Agent routes */}
          <Route path="/agent" element={<AgentDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
