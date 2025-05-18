import api from '@/lib/api';

export interface Employee {
    id: number;
    fname: string;
    lname: string;
    email: string;
    phone: string;
    company: string;
    branch: string;
}

export const employeeService = {
    async getEmployees(): Promise<Employee[]> {
        try {
            const response = await api.get('/company-users/');
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    },

    async importEmployees(file: File): Promise<{ success: boolean; message?: string }> {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await api.post('/import-employees/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return {
                success: true,
                message: 'Employees imported successfully'
            };
        } catch (error: any) {
            console.error('Error importing employees:', error);
            return {
                success: false,
                message: error.response?.data?.detail || 'Failed to import employees'
            };
        }
    }
}; 