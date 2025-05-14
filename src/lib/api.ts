import axios from 'axios';
import { toast } from "@/components/ui/use-toast";

// Use environment variable or fallback with full URL for development
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: any): string => {
  console.error('API Error:', error);
  
  // Network error handling
  if (!error.response) {
    return "Cannot connect to the server. Please check your connection.";
  }
  
  // Handle specific status codes
  if (error.response?.status === 401) {
    // Handle unauthorized (token expired)
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    return "Session expired. Please login again.";
  } else if (error.response?.status === 403) {
    return "You don't have permission to access this resource.";
  } else if (error.response?.status >= 500) {
    return "The server encountered an error. Please try again later.";
  }
  
  // Return error message from API if available
  if (error.response?.data?.detail) {
    return error.response.data.detail;
  }
  
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  
  // Field-specific errors
  if (error.response?.data && typeof error.response.data === 'object') {
    const firstErrorField = Object.keys(error.response.data)[0];
    if (firstErrorField) {
      const fieldError = error.response.data[firstErrorField];
      return Array.isArray(fieldError) ? fieldError[0] : String(fieldError);
    }
  }
  
  return "An unexpected error occurred. Please try again.";
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`API Request to ${config.url}:`, { 
      method: config.method, 
      data: config.data,
      headers: config.headers,
      baseURL: config.baseURL
    });
    
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response from ${response.config.url}:`, {
      status: response.status,
      data: response.data
    });
    
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Network error handling
    if (!error.response) {
      toast({
        title: "Network Error",
        description: "Cannot connect to the server. Please check your connection.",
        variant: "destructive",
      });
      return Promise.reject(error);
    }
    
    // Handle specific error codes
    if (error.response?.status === 401) {
      // Handle unauthorized (token expired)
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this resource.",
        variant: "destructive",
      });
    } else if (error.response?.status >= 500) {
      toast({
        title: "Server Error",
        description: "The server encountered an error. Please try again later.",
        variant: "destructive",
      });
    }
    
    return Promise.reject(error);
  }
);

export default api;
