
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { employeeStatusData, teamMembers, employees, salaryReviews } from '@/data/mockData';

// Employee profile data
export const useEmployeeProfile = () => {
  return useQuery({
    queryKey: ['employeeProfile'],
    queryFn: async () => {
      try {
        const response = await api.get('/employees/profile');
        return response.data;
      } catch (error) {
        console.error('Error fetching employee profile:', error);
        // Fallback to mock data
        return {
          id: 1,
          name: 'Chris Jonathan',
          position: 'Senior UI/UX Designer',
          avatar: employees[0].avatar,
          experience: '6+ years experience',
          workTime: {
            hours: 46,
            trend: 0.5
          },
          weeklyHours: [4, 6, 8, 7, 6, 9, 8]
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Team members data
export const useTeamData = () => {
  return useQuery({
    queryKey: ['teamMembers'],
    queryFn: async () => {
      try {
        const response = await api.get('/team/members');
        return response.data;
      } catch (error) {
        console.error('Error fetching team members:', error);
        // Fallback to mock data
        return teamMembers;
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Recruitment data
export const useRecruitmentData = () => {
  return useQuery({
    queryKey: ['recruitmentData'],
    queryFn: async () => {
      try {
        const response = await api.get('/recruitment/overview');
        return response.data;
      } catch (error) {
        console.error('Error fetching recruitment data:', error);
        // Fallback to mock data
        return {
          talents: [
            { name: 'John D.', image: '/images/avatars/avatar-1.jpg' },
            { name: 'Sarah M.', image: '/images/avatars/avatar-2.jpg' },
            { name: 'Alex K.', image: '/images/avatars/avatar-3.jpg' },
          ],
          recruitmentData: [
            { label: 'Jan', matched: 5, notMatched: 3 },
            { label: 'Feb', matched: 8, notMatched: 2 },
            { label: 'Mar', matched: 6, notMatched: 4 },
            { label: 'Apr', matched: 9, notMatched: 1 },
            { label: 'May', matched: 7, notMatched: 3 },
            { label: 'Jun', matched: 10, notMatched: 0 },
          ]
        };
      }
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// New hires data
export const useNewHiresData = () => {
  return useQuery({
    queryKey: ['newHires'],
    queryFn: async () => {
      try {
        const response = await api.get('/hr/onboarding');
        return response.data;
      } catch (error) {
        console.error('Error fetching new hires data:', error);
        // Fallback to mock data
        return {
          title: 'New hires onboarding',
          value: '18',
          change: -5,
          subtitle: 'Last 30 days',
          variant: 'warning'
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Status card data (employee presence, etc.)
export const useEmployeeStatusData = () => {
  return useQuery({
    queryKey: ['employeeStatus'],
    queryFn: async () => {
      try {
        const response = await api.get('/employees/status');
        return response.data;
      } catch (error) {
        console.error('Error fetching employee status data:', error);
        // Fallback to mock data
        return employeeStatusData;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Salary data
export const useSalaryData = () => {
  return useQuery({
    queryKey: ['salaryData'],
    queryFn: async () => {
      try {
        const response = await api.get('/finance/salaries');
        return response.data;
      } catch (error) {
        console.error('Error fetching salary data:', error);
        // Fallback to mock data
        return {
          reviews: salaryReviews,
          summary: {
            totalPayment: 2540,
            paymentPercentage: 100
          }
        };
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};