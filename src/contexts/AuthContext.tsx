
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

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

      // If no tokens were provided, attempt to login with the API
      try {
        // Use direct fetch for login to avoid circular dependencies with API instance
        const response = await fetch('http://127.0.0.1:8000/api/auth/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Extract user information from token if available
          let userInfo: User = { email };
          try {
            const payload = JSON.parse(atob(data.access_token.split('.')[1]));
            if (payload.fname) userInfo.firstName = payload.fname;
            if (payload.lname) userInfo.lastName = payload.lname;
          } catch (e) {
            console.log("Could not extract user data from token");
          }
          
          // Store tokens and user info
          setUser(userInfo);
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
          setIsAuthenticated(true);
          
          localStorage.setItem('currentUser', JSON.stringify(userInfo));
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          
          return { success: true };
        } else {
          const errorData = await response.json();
          return { 
            success: false, 
            message: errorData.detail || "Invalid credentials. Please try again."
          };
        }
      } catch (error) {
        console.error("API login error:", error);
        return { 
          success: false, 
          message: "Network error. Please check your connection and try again."
        };
      }
    } catch (error) {
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
