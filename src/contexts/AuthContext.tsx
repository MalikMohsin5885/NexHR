import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { toast } from "@/components/ui/use-toast";

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, accessToken?: string, refreshToken?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  refreshAccessToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility to check token expiration
const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true; // Assume expired if token is malformed
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedAccessToken = localStorage.getItem('access_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    
    if (storedUser && storedAccessToken) {
      // Check if token is expired
      if (storedAccessToken && !isTokenExpired(storedAccessToken)) {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setIsAuthenticated(true);
      } else if (storedRefreshToken) {
        // Try to refresh the token
        refreshAccessToken();
      } else {
        // If refresh token is also expired or missing, logout
        handleLogout();
      }
    }
  }, []);

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) return false;

      // Use the API instance for consistent error handling
      const response = await api.post('/auth/token/refresh/', { refresh: refreshToken });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('access_token', data.access);
        setAccessToken(data.access);
        setIsAuthenticated(true);
        return true;
      } else {
        // If refresh failed, logout the user
        handleLogout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleLogout();
      return false;
    }
  };

  const login = async (email: string, password: string, accessToken?: string, refreshToken?: string) => {
    try {
      console.log("Login attempt with email:", email);
      
      // If tokens are provided directly (e.g., for testing)
      if (accessToken && refreshToken) {
        const currentUser = { email };
        setUser(currentUser);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        return { success: true };
      }

      const TEST_EMAIL = "admin@admin.com";
      const TEST_PASSWORD = "admin";
      
      // If using test credentials, use the hardcoded tokens
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        const testAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ0MzA1NjczLCJpYXQiOjE3NDQyMTkyNzMsImp0aSI6ImQ0ZjM4MmJkOTk0YTQzMzdiNmFhNjdjZWQwNzA3YmY2IiwidXNlcl9pZCI6NCwiZm5hbWUiOiJTYWlyYSIsImxuYW1lIjoiTmFzaXIiLCJlbWFpbCI6InNhaXJhbmFzaXIxMDAxNEBnbWFpbC5jb20ifQ.TEpncQ2Hyp7LEglCl1wNLe4JahRpWTkrcNkTbPZkeFs";
        const testRefreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc0NDgyNDA3MywiaWF0IjoxNzQ0MjE5MjczLCJqdGkiOiIwNWM3ZjU5Nzk1YmM0NTdkOTdkNTYyMzQ2Y2FmMGQzMiIsInVzZXJfaWQiOjQsImZuYW1lIjoiU2FpcmEiLCJsbmFtZSI6Ik5hc2lyIiwiZW1haWwiOiJzYWlyYW5hc2lyMTAwMTRAZ21haWwuY29tIn0.2ByayaMlNWwR7ZMh3-v_qcatZbPBXBAZZKcGZqjvxlU";
        
        const currentUser = { email };
        setUser(currentUser);
        setAccessToken(testAccessToken);
        setRefreshToken(testRefreshToken);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('access_token', testAccessToken);
        localStorage.setItem('refresh_token', testRefreshToken);
        
        return { success: true };
      }

      // Check if the email is from a recently registered user
      try {
        console.log("Attempting API login with:", email);
        
        // Use the API instance for consistent handling
        const response = await api.post('/auth/login/', {
          email,
          password
        });
        
        console.log("Login API response:", response);
        
        if (response.status === 200) {
          const data = response.data;
          
          // Extract user information from token if available
          let userInfo: User = { email };
          try {
            const payload = JSON.parse(atob(data.access.split('.')[1]));
            console.log("Token payload:", payload);
            if (payload.fname) userInfo.firstName = payload.fname;
            if (payload.lname) userInfo.lastName = payload.lname;
          } catch (e) {
            console.log("Could not extract user data from token:", e);
          }
          
          // Store tokens and user info
          setUser(userInfo);
          setAccessToken(data.access);
          setRefreshToken(data.refresh);
          setIsAuthenticated(true);
          
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
          
          console.log("Login successful, user info stored:", userInfo);
          return { success: true };
        } else {
          const errorData = await response.data;
          console.log("Login failed with status:", response.status, errorData);
          return { 
            success: false, 
            message: errorData.detail || "Invalid credentials. Please try again."
          };
        }
      } catch (apiError: any) {
        console.error("API login error:", apiError);
        
        // Special handling for registered users that might be in localStorage
        // This helps when the API might not be fully working but users still need to log in
        const storedUsers = localStorage.getItem("registeredUsers");
        if (storedUsers) {
          console.log("Checking local registered users as fallback");
          const users = JSON.parse(storedUsers);
          const userExists = users.some(
            (user: { email: string; password: string }) =>
              user.email === email && user.password === password
          );
          
          if (userExists) {
            console.log("User found in local storage, creating session");
            // Create a mock session for the user
            const mockUserInfo = { email };
            const mockAccessToken = "mock-access-token-" + Date.now();
            const mockRefreshToken = "mock-refresh-token-" + Date.now();
            
            setUser(mockUserInfo);
            setAccessToken(mockAccessToken);
            setRefreshToken(mockRefreshToken);
            setIsAuthenticated(true);
            
            localStorage.setItem('currentUser', JSON.stringify(mockUserInfo));
            localStorage.setItem('access_token', mockAccessToken);
            localStorage.setItem('refresh_token', mockRefreshToken);
            
            return { success: true };
          }
        }
        
        return { 
          success: false, 
          message: apiError.response?.data?.detail || 
            "Network error. Please check your connection and try again."
        };
      }
    } catch (error: any) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: "An error occurred during login. Please try again."
      };
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const logout = () => {
    handleLogout();
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    accessToken,
    refreshToken,
    refreshAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
