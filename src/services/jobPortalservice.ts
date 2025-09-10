// services/job-service.ts
import { JobListing } from "@/types/jobPortal/types";
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Interfaces for job application data
export interface Skill {
  name: string;
}

export interface Experience {
  years_of_experience: number;
  previous_job_titles: string;
  company_name: string;
}

export interface Education {
  education_level: string;
  institution_name: string;
  degree_detail: string;
  grades: string;
  start_date: string;
  end_date: string;
  description: string;
}

// Updated payload structure matching backend requirements
export interface JobApplicationData {
  job: number;
  candidate_fname: string;
  candidate_lname: string;
  email: string;
  phone: string;
  status: string; // "pending" for new applications
  gender: string; // lowercase: "male", "female", "other"
  address: string;
  dob: string;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  // Note: resume_text is auto-filled by backend when resume_file is uploaded
}

class ApplicationService {
  private getAuthHeader() {
    const access_token = localStorage.getItem('access_token');
    return access_token
      ? {
          Authorization: `Bearer ${access_token}`,
        }
      : {};
  }

  async submitApplication(applicationData: FormData): Promise<{ success: boolean; message?: string; applicationId?: string }> {
    try {
      console.log('Sending FormData to:', `${API_BASE_URL}/applications/`);
      console.log('FormData contents:');
      for (let [key, value] of applicationData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(`${API_BASE_URL}/applications/`, applicationData, {
        headers: {
          ...this.getAuthHeader(),
          // Don't set Content-Type - let browser set it for multipart/form-data
        },
      });

      if (response.status === 201) {
        return {
          success: true,
          applicationId: response.data.id || response.data.application_id,
          message: 'Application submitted successfully',
        };
      }

      return {
        success: false,
        message: 'Failed to submit application',
      };
    } catch (error: any) {
      console.error('Error submitting application:', error);
      console.error('Response data:', error.response?.data);
      console.error('Response status:', error.response?.status);
      console.error('Response headers:', error.response?.headers);
      
      return {
        success: false,
        message: error.response?.data?.message || error.response?.data || 'Failed to submit application',
      };
    }
  }

  async getApplication(applicationId: string): Promise<{ success: boolean; data?: any; message?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/${applicationId}/`, {
        headers: this.getAuthHeader(),
      });

      if (response.status === 200) {
        return {
          success: true,
          data: response.data,
        };
      }

      return {
        success: false,
        message: 'Failed to fetch application',
      };
    } catch (error: any) {
      console.error('Error fetching application:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch application',
      };
    }
  }

  async getApplicationsByJob(jobId: string): Promise<{ success: boolean; data?: any[]; message?: string }> {
    try {
      const response = await axios.get(`${API_BASE_URL}/applications/?job=${jobId}`, {
        headers: this.getAuthHeader(),
      });

      if (response.status === 200) {
        return {
          success: true,
          data: response.data.results || response.data,
        };
      }

      return {
        success: false,
        message: 'Failed to fetch applications',
      };
    } catch (error: any) {
      console.error('Error fetching applications:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch applications',
      };
    }
  }
}

export const applicationService = new ApplicationService();

export interface ApiJobResponse {
    job_title: string;
    Department: string;
    experience_level: string;
    salary_from: string;
    salary_to: string;
    currency: string;
    created_at: string;
    period: string;
    city: string;
    state: string;
    country: string;
    job_deadline: string;
    company_name: string;
    
}

export interface PaginatedJobsResponse {
    results: ApiJobResponse[];
    count: number;
    next: string | null;
    previous: string | null;
}

// Function to transform API response to our JobListing format
export const transformApiJob = (apiJob: ApiJobResponse): JobListing => {
    // Calculate average salary for display
    const salaryFrom = parseFloat(apiJob.salary_from);
    const salaryTo = parseFloat(apiJob.salary_to);
    const averageSalary = ((salaryFrom + salaryTo) / 2).toFixed(2);

    // Format the date (created_at)
    const createdDate = new Date(apiJob.created_at);
    const formattedDate = `${createdDate.toLocaleString('default', { month: 'short' })} ${createdDate.getDate()}, ${createdDate.getFullYear()}`;

    // Generate a unique ID from job title and created date
    const id = `job-${apiJob.job_title.replace(/\s+/g, '-').toLowerCase()}-${createdDate.getTime()}`;

    return {
        id,
        title: apiJob.job_title,
        company: apiJob.company_name,
        date: formattedDate,
        salary: averageSalary,
        location: `${apiJob.city}, ${apiJob.state}, ${apiJob.country}`,
        salary_period: `${apiJob.period}`,
        tags: [apiJob.experience_level, `${apiJob.currency} ${apiJob.salary_from}-${apiJob.salary_to}`]
    };
};

// Function to fetch jobs with pagination
export const fetchJobs = async (page: number = 1, pageSize: number = 6): Promise<{
    jobs: JobListing[];
    totalCount: number;
}> => {
    try {
        // Use the full URL including localhost and port
        const response = await fetch(`http://localhost:8000/api/jobs/list/?page=${page}&page_size=${pageSize}`);

        if (!response.ok) {
            throw new Error(`Error fetching jobs: ${response.status}`);
        }

        const data: PaginatedJobsResponse = await response.json();

        // Transform the API response to our JobListing format
        console.log("==================kkkk===========",data)
        const jobs = data.results.map(transformApiJob);

        return {
            jobs,
            totalCount: data.count
        };
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
        return {
            jobs: [],
            totalCount: 0
        };
    }
}