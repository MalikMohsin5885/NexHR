
import { 
  Home,
  Users, 
  Briefcase, 
  DollarSign, 
  Settings,
  PanelRight,
  LifeBuoy
} from 'lucide-react';
import { SidebarMenuItem } from './types';

export const sidebarItems: SidebarMenuItem[] = [
  {
    title: 'Dashboard',
    path: '/',
    icon: Home,
  },
  {
    title: 'Teams',
    path: '/teams',
    icon: Users,
    submenu: [
      { title: 'Employees', path: '/employees' },
      { title: 'Attendance', path: '/attendance' },
      { title: 'Checklist', path: '/checklist' },
      { title: 'Time off', path: '/time-off' },
    ],
  },
  {
    title: 'Hiring',
    path: '/hiring',
    icon: Briefcase,
    submenu: [
      { title: 'Onboarding', path: '/onboarding' },
      { title: 'Hiring handbook', path: '/hiring-handbook' },
    ],
  },
  {
    title: 'Finance',
    path: '/finance',
    icon: DollarSign,
    submenu: [
      { title: 'Payroll', path: '/payroll' },
      { title: 'Expenses', path: '/expenses' },
      { title: 'Invoices', path: '/invoices' },
      { title: 'Payment information', path: '/payment-information' },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: Settings,
  },
  {
    title: 'Integrations',
    path: '/integrations',
    icon: PanelRight,
  },
  {
    title: 'Help and support',
    path: '/support',
    icon: LifeBuoy,
  },
];
