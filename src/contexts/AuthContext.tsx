
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
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

      const response = await fetch('http://127.0.0.1:8000/api/auth/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
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
      // If tokens are provided directly (e.g., from login form)
      if (accessToken && refreshToken) {
        const currentUser = { email };
        setUser(currentUser);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        return { success: true };
      }

      // Fallback to local authentication method for development/testing
      const storedUsers = localStorage.getItem('registeredUsers');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const userExists = users.some(
          (user: { email: string; password: string }) =>
            user.email === email && user.password === password
        );

        if (userExists) {
          const currentUser = { email };
          setUser(currentUser);
          setIsAuthenticated(true);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          return { success: true };
        } else {
          return { 
            success: false, 
            message: "User not found or incorrect credentials. Please register or try again."
          };
        }
      } else {
        return { 
          success: false, 
          message: "No registered users found. Please register first."
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
