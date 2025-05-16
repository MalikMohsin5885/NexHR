import { RouteObject } from "react-router-dom";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dasboard";
import JobPostForm from "@/pages/JobPostForm";
import Calendar from "@/pages/Calendar";
import Team from "@/pages/Team";
import Projects from "@/pages/Projects";
import Documents from "@/pages/Documents";
import NotFound from "@/pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";
import JobPortal from "@/pages/JobPortal";
import JobDetail from "@/components/jobPortal/job-detail";
import TestModal from "@/pages/TestModal";
import LinkedInAuth from '@/pages/LinkedInAuth';

// Create a placeholder component for routes that don't have dedicated pages yet
// eslint-disable-next-line react-refresh/only-export-components
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">This page is under construction</p>
  </div>
);

export const routes: RouteObject[] = [
  {
    path: "",
    element: <Index />,
  },
  {
    path: "/job-portal",
    element: <JobPortal />,
  },
  {
    path: "/job-detail",
    element: <JobDetail />,
  },
  {
    path: "/application",
    element: <JobDetail />,
  },
  {
    path: "/modals",
    element: <TestModal />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },

  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "/jobs/create",
        element: <JobPostForm />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "teams",
        element: <PlaceholderPage title="Teams" />,
      },
      {
        path: "employees",
        element: <PlaceholderPage title="Employees" />,
      },
      {
        path: "attendance",
        element: <PlaceholderPage title="Attendance" />,
      },
      {
        path: "checklist",
        element: <PlaceholderPage title="Checklist" />,
      },
      {
        path: "time-off",
        element: <PlaceholderPage title="Time Off" />,
      },
      {
        path: "hiring",
        element: <PlaceholderPage title="Hiring" />,
      },
      {
        path: "onboarding",
        element: <PlaceholderPage title="Onboarding" />,
      },
      {
        path: "hiring-handbook",
        element: <PlaceholderPage title="Hiring Handbook" />,
      },
      {
        path: "finance",
        element: <PlaceholderPage title="Finance" />,
      },
      {
        path: "payroll",
        element: <PlaceholderPage title="Payroll" />,
      },
      {
        path: "expenses",
        element: <PlaceholderPage title="Expenses" />,
      },
      {
        path: "invoices",
        element: <PlaceholderPage title="Invoices" />,
      },
      {
        path: "payment-information",
        element: <PlaceholderPage title="Payment Information" />,
      },
      {
        path: "settings",
        element: <PlaceholderPage title="Settings" />,
      },
      {
        path: "integrations",
        element: <PlaceholderPage title="Integrations" />,
      },
      {
        path: "support",
        element: <PlaceholderPage title="Help & Support" />,
      },
      {
        path: 'linkedin-auth/callback',
        element: <LinkedInAuth />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
