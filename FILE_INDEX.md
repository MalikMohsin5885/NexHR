# NexHR Frontend - File Index

## Project Overview
A comprehensive HR Management System built with React, TypeScript, Vite, and Tailwind CSS. The application features role-based access control, job portal functionality, and various HR management modules.

## Configuration Files

### Build & Development
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite build configuration with React SWC
- `tsconfig.json` - TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node-specific TypeScript config
- `tailwind.config.ts` - Tailwind CSS configuration with custom theme
- `postcss.config.js` - PostCSS configuration
- `postcss.config.mjs` - PostCSS configuration (ES modules)
- `eslint.config.js` - ESLint configuration
- `eslint.config.mjs` - ESLint configuration (ES modules)
- `components.json` - Shadcn/ui components configuration

### Static Assets
- `index.html` - Main HTML entry point
- `public/` - Static assets directory
  - `favicon.ico` - Site favicon
  - `fonts/nura/` - Custom Nura font family (8 variants)
  - `images/` - Company logos and banners
  - `lottieFiles/` - Lottie animation files for UI

## Source Code Structure

### Entry Points
- `src/main.tsx` - React application entry point
- `src/App.tsx` - Main application component with providers
- `src/index.css` - Global styles and CSS variables
- `src/App.css` - Application-specific styles

### Routing
- `src/routes/index.tsx` - Main routing configuration with role-based access

## Pages (src/pages/)

### Authentication Pages
- `Login.tsx` - User login page
- `Register.tsx` - User registration page
- `ForgotPassword.tsx` - Password reset request page
- `ResetPassword.tsx` - Password reset form page
- `LinkedInAuth.tsx` - LinkedIn OAuth callback handler

### Public Pages
- `Index.tsx` - Landing page
- `JobPortal.tsx` - Public job portal
- `JobApplicationForm.tsx` - Job application form
- `NotFound.tsx` - 404 error page

### Dashboard Pages
- `Dasboard.tsx` - Main HR/Admin dashboard (Note: typo in filename)
- `EmployeeDashboard.tsx` - Employee-specific dashboard
- `FinanceDashboard.tsx` - Finance manager dashboard

### HR Management Pages
- `Employees.tsx` - Employee management
- `Team.tsx` - Team management
- `Calendar.tsx` - Calendar view
- `Projects.tsx` - Project management
- `Documents.tsx` - Document management
- `Payroll.tsx` - Payroll management
- `HiringHandbook.tsx` - Hiring process management

### Job Management Pages
- `JobPostForm.tsx` - Job posting form
- `JobPostingForm.tsx` - Alternative job posting form
- `CompanyInfo.tsx` - Company information form

### Utility Pages
- `TestModal.tsx` - Modal testing page

## Components (src/components/)

### Authentication Components
- `auth/GoogleLoginButton.tsx` - Google OAuth login button
- `auth/RegisterForm.tsx` - Registration form component

### Route Protection
- `ProtectedRoute.tsx` - Authentication guard
- `PublicRoute.tsx` - Public route wrapper
- `RoleBasedRoute.tsx` - Role-based access control
- `RoleBasedDashboard.tsx` - Role-based dashboard router
- `CompanyRegistrationGuard.tsx` - Company registration guard

### Dashboard Components
- `Dashboard/` - HR/Admin dashboard components
  - `ChartCard.tsx` - Chart display card
  - `EmployeeCard.tsx` - Employee information card
  - `GreetingHeader.tsx` - Dashboard greeting header
  - `RecruitmentCard.tsx` - Recruitment statistics card
  - `SalaryCard.tsx` - Salary information card
  - `StatsCard.tsx` - General statistics card
  - `TeamTracker.tsx` - Team tracking component

### Employee Dashboard Components
- `employeeDashboard/` - Employee-specific components
  - `AttendanceStatusCard.tsx` - Attendance status display
  - `LeaveBalanceCard.tsx` - Leave balance information
  - `MonthlyAttendanceCard.tsx` - Monthly attendance chart
  - `PayrollSummaryCard.tsx` - Payroll summary
  - `QuickActionsCard.tsx` - Quick action buttons
  - `RecentActivitiesCard.tsx` - Recent activities feed
  - `WeeklyHoursCard.tsx` - Weekly hours tracking
  - `index.ts` - Component exports

### Finance Dashboard Components
- `financeDashboard/` - Finance management components
  - `ActiveEmployeesCard.tsx` - Active employee count
  - `PayrollTrendsChart.tsx` - Payroll trends visualization
  - `PendingDisbursementsCard.tsx` - Pending payments
  - `RecentDisbursementsCard.tsx` - Recent payments
  - `TaxComplianceCard.tsx` - Tax compliance status
  - `TaxComplianceChart.tsx` - Tax compliance visualization
  - `TotalPayrollCard.tsx` - Total payroll summary
  - `index.ts` - Component exports

### Hiring Handbook Components
- `hiringHandbook/` - Hiring process components
  - `CandidateDetailDrawer.tsx` - Candidate details panel
  - `CurrentCandidates.tsx` - Current candidates list
  - `Reports.tsx` - Hiring reports
  - `Screening.tsx` - Candidate screening interface
  - `Templates.tsx` - Hiring templates
  - `index.ts` - Component exports

### Job Portal Components
- `jobPortal/` - Job portal specific components
  - `company-logos.tsx` - Company logo display
  - `header.tsx` - Job portal header
  - `job-card.tsx` - Individual job listing card
  - `job-detail.tsx` - Job detail view
  - `job-listings.tsx` - Job listings container
  - `navbar.tsx` - Job portal navigation
  - `search-filters.tsx` - Job search filters

### Job Posting Components
- `job-post/` - Job posting form components
  - `ApplicationFormTab.tsx` - Application form configuration
  - `CustomFormBuilder.tsx` - Custom form builder
  - `GeneralInfoTab.tsx` - General job information
  - `ReviewTab.tsx` - Job posting review
  - `StepProgressBar.tsx` - Multi-step form progress

### Modal Components
- `modals/` - Modal dialogs
  - `CompanyInfoModal.tsx` - Company information modal
  - `JobPostedModal.tsx` - Job posting confirmation modal

### Sidebar Components
- `sidebar/` - Navigation sidebar
  - `Sidebar.tsx` - Main sidebar component
  - `SidebarFooter.tsx` - Sidebar footer
  - `SidebarHeader.tsx` - Sidebar header
  - `SidebarItem.tsx` - Individual sidebar item
  - `sidebarItems.ts` - Sidebar navigation configuration
  - `SidebarSearch.tsx` - Sidebar search functionality
  - `SidebarSubmenuItem.tsx` - Submenu item component

### UI Components (Shadcn/ui)
- `ui/` - Reusable UI components (50+ components)
  - Form components: `button.tsx`, `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`
  - Layout components: `card.tsx`, `sheet.tsx`, `dialog.tsx`, `drawer.tsx`, `sidebar.tsx`
  - Navigation components: `tabs.tsx`, `breadcrumb.tsx`, `pagination.tsx`, `navigation-menu.tsx`
  - Data display: `table.tsx`, `badge.tsx`, `avatar.tsx`, `progress.tsx`, `chart.tsx`
  - Feedback components: `alert.tsx`, `toast.tsx`, `sonner.tsx`, `skeleton.tsx`
  - Utility components: `separator.tsx`, `scroll-area.tsx`, `resizable.tsx`, `command.tsx`

## Services (src/services/)

### API Services
- `auth.ts` - Authentication API calls
- `companyService.ts` - Company management API
- `employeeService.ts` - Employee management API
- `JobService.ts` - Job management API
- `jobPortalservice.ts` - Job portal API
- `linkedinService.ts` - LinkedIn integration API
- `googleAuth.ts` - Google authentication service

## Contexts (src/contexts/)

### State Management
- `AuthContext.tsx` - Authentication state management
- `RedirectContext.tsx` - Redirect state management

## Store (src/store/)

### Redux Store
- `index.ts` - Redux store configuration
- `authSlice.ts` - Authentication Redux slice

## Data (src/data/)

### Mock Data & Configuration
- `formData.ts` - Form configuration data
- `hiringHandbookData.ts` - Hiring handbook content
- `job-data.ts` - Job-related mock data
- `mockData.ts` - General mock data

## Hooks (src/hooks/)

### Custom Hooks
- `use-mobile.tsx` - Mobile device detection hook
- `use-toast.ts` - Toast notification hook
- `useLinkedInConnection.ts` - LinkedIn connection hook

## Utilities (src/lib/)

### Helper Functions
- `api.ts` - API configuration and helpers
- `apiHelpers.ts` - API utility functions
- `auth.js` - Authentication utilities (JavaScript)
- `utils.ts` - General utility functions

## Types (src/types/)

### TypeScript Definitions
- `jobPortal/types.ts` - Job portal type definitions
- `sidebar/types.ts` - Sidebar component types

## Additional Utilities

### Role Management
- `src/utils/roleUtils.ts` - Role-based access utilities

## Layouts (src/layouts/)

### Page Layouts
- `DashboardLayout.tsx` - Main dashboard layout
- `JobPortalLayout.tsx` - Job portal specific layout

## Key Features

### Authentication & Authorization
- Multi-provider authentication (Email/Password, Google, LinkedIn)
- Role-based access control (HR, Admin, Finance Manager, Employee)
- Protected routes and public routes
- Company registration guard

### Dashboard System
- Role-specific dashboards
- HR/Admin dashboard with comprehensive metrics
- Employee dashboard with personal information
- Finance dashboard with payroll and compliance data

### Job Management
- Job posting and management system
- Public job portal
- Application form builder
- LinkedIn integration for job posting

### HR Management
- Employee management
- Team organization
- Calendar integration
- Document management
- Payroll processing
- Hiring handbook and process management

### UI/UX
- Modern, responsive design with Tailwind CSS
- Shadcn/ui component library
- Custom animations and transitions
- Mobile-first approach
- Dark mode support

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite with SWC
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Shadcn/ui + Radix UI primitives
- **State Management**: Redux Toolkit + React Context
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Animations**: Framer Motion + Lottie
- **Icons**: Lucide React + React Icons

## File Organization Notes

- Components are organized by feature/domain
- Each major feature has its own directory with sub-components
- UI components are centralized in the `ui/` directory
- Services are organized by API domain
- Types are co-located with their respective features
- Mock data is centralized for development purposes
