
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Projects from "./pages/Projects";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

// Create a placeholder component for routes that don't have dedicated pages yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">This page is under construction</p>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/documents" element={<Documents />} />
          
          {/* Add routes for sidebar items */}
          <Route path="/teams" element={<PlaceholderPage title="Teams" />} />
          <Route path="/employees" element={<PlaceholderPage title="Employees" />} />
          <Route path="/attendance" element={<PlaceholderPage title="Attendance" />} />
          <Route path="/checklist" element={<PlaceholderPage title="Checklist" />} />
          <Route path="/time-off" element={<PlaceholderPage title="Time Off" />} />
          
          <Route path="/hiring" element={<PlaceholderPage title="Hiring" />} />
          <Route path="/onboarding" element={<PlaceholderPage title="Onboarding" />} />
          <Route path="/hiring-handbook" element={<PlaceholderPage title="Hiring Handbook" />} />
          
          <Route path="/finance" element={<PlaceholderPage title="Finance" />} />
          <Route path="/payroll" element={<PlaceholderPage title="Payroll" />} />
          <Route path="/expenses" element={<PlaceholderPage title="Expenses" />} />
          <Route path="/invoices" element={<PlaceholderPage title="Invoices" />} />
          <Route path="/payment-information" element={<PlaceholderPage title="Payment Information" />} />
          
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/integrations" element={<PlaceholderPage title="Integrations" />} />
          <Route path="/support" element={<PlaceholderPage title="Help & Support" />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
