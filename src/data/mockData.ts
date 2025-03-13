
import { StaticImageData } from "next/image";

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar: string;
  salary: number;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActive: string;
  contact: {
    email: string;
    phone: string;
  };
  performance?: number;
}

export interface SalaryReview {
  id: string;
  employeeId: string;
  employeeName: string;
  avatar: string;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'failed' | 'done';
}

export interface TeamMember {
  role: string;
  count: number;
  color: string;
}

export interface TalentData {
  label: string;
  matched: number;
  notMatched: number;
}

export const employees: Employee[] = [
  {
    id: '1',
    name: 'Chris Jonathan',
    position: 'General manager',
    department: 'Management',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    salary: 120000,
    status: 'online',
    lastActive: 'Now',
    contact: {
      email: 'chris.j@example.com',
      phone: '+1 (555) 123-4567',
    },
    performance: 96,
  },
  {
    id: '2',
    name: 'Syaoran Ian',
    position: 'UX Designer',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    salary: 82540,
    status: 'online',
    lastActive: 'Today',
    contact: {
      email: 'syaoran.i@example.com',
      phone: '+1 (555) 234-5678',
    },
  },
  {
    id: '3',
    name: 'Devon Lane',
    position: 'Frontend Developer',
    department: 'Development',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    salary: 67500,
    status: 'online',
    lastActive: 'Today',
    contact: {
      email: 'devon.l@example.com',
      phone: '+1 (555) 345-6789',
    },
  },
  {
    id: '4',
    name: 'Marvin McKinney',
    position: 'Backend Developer',
    department: 'Development',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    salary: 72540,
    status: 'away',
    lastActive: 'Yesterday',
    contact: {
      email: 'marvin.m@example.com',
      phone: '+1 (555) 456-7890',
    },
  },
  {
    id: '5',
    name: 'Eleanor Ring',
    position: 'Product Manager',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    salary: 95670,
    status: 'offline',
    lastActive: 'Yesterday',
    contact: {
      email: 'eleanor.r@example.com',
      phone: '+1 (555) 567-8901',
    },
  },
];

export const salaryReviews: SalaryReview[] = [
  {
    id: '1',
    employeeId: '2',
    employeeName: 'Syaoran Ian',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    amount: 82540,
    date: 'Today',
    status: 'pending',
  },
  {
    id: '2',
    employeeId: '3',
    employeeName: 'Devon Lane',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    amount: 67500,
    date: 'Today',
    status: 'done',
  },
  {
    id: '3',
    employeeId: '4',
    employeeName: 'Marvin McKinney',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    amount: 72540,
    date: 'Yesterday',
    status: 'done',
  },
  {
    id: '4',
    employeeId: '3',
    employeeName: 'Devon Lane',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    amount: 65870,
    date: 'Yesterday',
    status: 'done',
  },
  {
    id: '5',
    employeeId: '5',
    employeeName: 'Eleanor Ring',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    amount: 95670,
    date: 'Yesterday',
    status: 'failed',
  },
];

export const teamMembers: TeamMember[] = [
  { role: 'Designer', count: 48, color: '#57d54e' },
  { role: 'Developer', count: 27, color: '#42a5e1' },
  { role: 'Project manager', count: 18, color: '#0fcbf1' },
];

export const weeklyHours = [
  { day: 'Mon', hours: 8.2 },
  { day: 'Tue', hours: 8.5 },
  { day: 'Wed', hours: 9.2 },
  { day: 'Thu', hours: 7.8 },
  { day: 'Fri', hours: 8.3 },
];

export const talentData: TalentData[] = [
  { label: 'Q1', matched: 15, notMatched: 5 },
  { label: 'Q2', matched: 18, notMatched: 7 },
  { label: 'Q3', matched: 25, notMatched: 3 },
  { label: 'Q4', matched: 22, notMatched: 4 },
];

export const attendanceData = {
  present: 92,
  absent: 3,
  late: 5,
};

export const recruitmentStats = {
  applications: 125,
  interviews: 42,
  hired: 18,
  rejected: 65,
};

export const workHoursDistribution = [
  { status: 'Present', percentage: 80 },
  { status: 'Remote', percentage: 20 },
];

export const performanceRatings = {
  excellent: 25,
  good: 45,
  average: 22,
  needsImprovement: 8,
};
