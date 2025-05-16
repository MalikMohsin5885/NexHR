// services/job-service.ts
import { JobListing } from "@/types/jobPortal/types";

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