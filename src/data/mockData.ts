
import { Users, User, Clock, Calendar, FileText, DollarSign } from 'lucide-react';

export const workHoursDistribution = [
  { name: 'Monday', value: 8 },
  { name: 'Tuesday', value: 10 },
  { name: 'Wednesday', value: 7 },
  { name: 'Thursday', value: 9 },
  { name: 'Friday', value: 6 },
];

export const employeeStatusData = [
  { status: 'Present', percentage: 80, color: '#42a5e1' },
  { status: 'Remote', percentage: 20, color: '#0fcbf1' },
];

export const teamMembers = [
  { name: 'Alex Morgan', role: 'Designer', status: 'active', count: 48, color: '#42a5e1' },
  { name: 'Taylor Swift', role: 'Developer', status: 'meeting', count: 27, color: '#0fcbf1' },
  { name: 'Jamie Foxx', role: 'Product Manager', status: 'offline', count: 18, color: '#9B57FC' },
  { name: 'Emma Watson', role: 'Designer', status: 'active', count: 10, color: '#42a5e1' },
];

export const salaryData = [
  { id: 1, employeeName: 'Sophia can', amount: 2540, date: 'Today', status: 'waiting', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 2, employeeName: 'Devon Lane', amount: 2540, date: 'Today', status: 'done', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 3, employeeName: 'Marvin McKinney', amount: 2540, date: 'Yesterday', status: 'done', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 4, employeeName: 'Devon Lane', amount: 2540, date: 'Yesterday', status: 'done', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 5, employeeName: 'Eleanor Pena', amount: 2540, date: 'Yesterday', status: 'failed', avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
];

export const projectTasks = [
  { id: 1, title: 'UI Design Review', completed: true },
  { id: 2, title: 'API Integration', completed: false },
  { id: 3, title: 'Database Optimization', completed: false },
  { id: 4, title: 'Mobile Responsiveness', completed: true },
  { id: 5, title: 'Deployment Pipeline', completed: false },
];

export const teamData = {
  totalMembers: 120,
  breakdown: [
    { role: 'Designer', count: 48, color: '#42a5e1' },
    { role: 'Developer', count: 27, color: '#0fcbf1' },
    { role: 'Project manager', count: 18, color: '#9B57FC' },
  ]
};

export const recruitmentData = [
  { label: 'QA Team', matched: 7, notMatched: 5 },
  { label: 'RD Team', matched: 4, notMatched: 8 },
];

// Add the missing exports
export const employees = [
  {
    name: 'Chris Jonathan',
    position: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    workHours: 46
  }
];

export const talentData = [
  { label: 'Total', candidates: 182 },
  { label: 'Hired', candidates: 48 },
  { label: 'Interviewing', candidates: 26 },
  { label: 'Rejected', candidates: 108 }
];

export const salaryReviews = [
  { id: 1, name: 'Marketing', employeeName: 'Marketing Team', status: 'pending', date: 'Due Oct 25', amount: 2540, avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 2, name: 'Development', employeeName: 'Development Team', status: 'done', date: 'Oct 18', amount: 2340, avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' },
  { id: 3, name: 'Design', employeeName: 'Design Team', status: 'failed', date: 'Due Oct 30', amount: 2180, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80' }
];
