
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
  { name: 'Alex Morgan', role: 'Designer', status: 'active' },
  { name: 'Taylor Swift', role: 'Developer', status: 'meeting' },
  { name: 'Jamie Foxx', role: 'Product Manager', status: 'offline' },
  { name: 'Emma Watson', role: 'Designer', status: 'active' },
];

export const salaryData = [
  { name: 'Sophia can', salary: '$2,540.00', date: 'Today', status: 'waiting' },
  { name: 'Devon Lane', salary: '$2,540.00', date: 'Today', status: 'done' },
  { name: 'Marvin McKinney', salary: '$2,540.00', date: 'Yesterday', status: 'done' },
  { name: 'Devon Lane', salary: '$2,540.00', date: 'Yesterday', status: 'done' },
  { name: 'Eleanor Pena', salary: '$2,540.00', date: 'Yesterday', status: 'failed' },
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

export const recruitmentData = {
  qaTeam: { matched: [1, 2, 3, 4, 6, 8, 9], notMatched: [5, 7, 10, 11, 12] },
  rdTeam: { matched: [1, 3, 5, 7], notMatched: [2, 4, 6, 8, 9, 10, 11, 12] },
};

// Add the missing exports
export const employees = [
  {
    name: 'Chris Jonathan',
    position: 'UI/UX Designer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    workHours: 46
  }
];

export const talentData = {
  totalCandidates: 182,
  hired: 48,
  interviewing: 26,
  rejected: 108
};

export const salaryReviews = [
  { name: 'Marketing', status: 'In progress', date: 'Due Oct 25' },
  { name: 'Development', status: 'Completed', date: 'Oct 18' },
  { name: 'Design', status: 'Pending', date: 'Due Oct 30' }
];
