
import { AxiosError } from 'axios';

// Define common error types from Django backend responses
export interface ApiErrorResponse {
  [key: string]: string[] | string;
  detail?: string;
  non_field_errors?: string[];
}

export interface ApiSuccessResponse<T = any> {
  data: T;
  message?: string;
}

/**
 * Helper function to extract a readable error message from an API error
 */
export function extractErrorMessage(error: unknown): string {
  if (!error) {
    return "An unknown error occurred";
  }
  
  // Handle Axios error responses
  if (error instanceof AxiosError && error.response?.data) {
    const errorData = error.response.data as ApiErrorResponse;
    
    // Check for various error formats from Django
    if (typeof errorData === 'string') {
      return errorData;
    }
    
    if (errorData.detail) {
      return errorData.detail as string;
    }
    
    if (errorData.non_field_errors) {
      return Array.isArray(errorData.non_field_errors) 
        ? errorData.non_field_errors[0] 
        : errorData.non_field_errors;
    }
    
    // Find the first field error
    const firstErrorKey = Object.keys(errorData)[0];
    if (firstErrorKey) {
      const firstError = errorData[firstErrorKey];
      return Array.isArray(firstError) ? firstError[0] : String(firstError);
    }
    
    return "An error occurred with your request";
  }
  
  // Handle network errors
  if (error instanceof Error) {
    return error.message;
  }
  
  return "An unexpected error occurred";
}

/**
 * Form helper to map Django API field errors to React Hook Form errors
 */
export function mapApiErrorsToFormErrors(
  apiErrors: ApiErrorResponse
): Record<string, { message: string }> {
  const formErrors: Record<string, { message: string }> = {};
  
  // Map of backend field names to frontend field names
  const fieldMapping: Record<string, string> = {
    first_name: "fname",
    last_name: "lname",
    email: "email",
    phone_number: "phone",
    password: "password",
  };
  
  // Convert API errors to form errors
  Object.entries(apiErrors).forEach(([backendField, errorMessage]) => {
    const formField = fieldMapping[backendField] || backendField;
    
    if (formField && errorMessage) {
      formErrors[formField] = {
        message: Array.isArray(errorMessage) ? errorMessage[0] : String(errorMessage),
      };
    }
  });
  
  return formErrors;
}
