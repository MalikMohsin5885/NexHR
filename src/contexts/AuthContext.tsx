import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { toast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from '../store/authSlice';
import { RootState } from '../store';
import { ROLES } from '@/utils/roleUtils';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshAccessToken: () => Promise<boolean>;
  loginWithGoogle: (accessToken: string) => Promise<{ success: boolean; data?: GoogleAuthResponse; message?: string }>;
}


interface GoogleAuthResponse {
  access: string;
  refresh: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenExpired = (token: string) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (e) {
    return true;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const devBypass = false;

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('access_token');
    if (storedAccessToken) {
      if (!isTokenExpired(storedAccessToken)) {
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
        fetchUserData(storedAccessToken);
      } else {
        refreshAccessToken();
      }
    }
  }, [dispatch]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await api.get('/auth/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        console.log('API User Data:', response.data);
        const profile = response.data;
        // Try to fetch roles/permissions if endpoint exists to ensure role is accurate
        let enriched = profile;
        try {
          if (profile?.id) {
            const rp = await api.get(`/user/${profile.id}/roles-permissions/`);
            if (rp?.status === 200 && rp.data) {
              console.log('Roles/Permissions payload:', rp.data);
              // Normalize roles into clean string names
              const rawRoles = rp.data.roles;
              const normalizedRoles: string[] = Array.isArray(rawRoles)
                ? rawRoles
                    .map((role: unknown) => {
                      if (typeof role === 'string') return role.trim();
                      if (role && typeof role === 'object' && 'name' in (role as any)) {
                        const name = (role as any).name;
                        return typeof name === 'string' ? name.trim() : undefined;
                      }
                      return undefined;
                    })
                    .filter((v): v is string => Boolean(v))
                : [];

              console.log('Normalized roles:', normalizedRoles);

              if (normalizedRoles.length > 0) {
                // Prefer the first role as primary
                enriched = { ...profile, role: normalizedRoles[0], roles: normalizedRoles };
              } else {
                // No roles returned from roles-permissions. Prefer backend profile.role if present.
                let resolved = profile?.role;
                if (!resolved) {
                  // Soft inference only if backend didn't provide a role
                  console.log('No roles found; backend profile.role missing. Inferring from user data...');
                  let inferredRole = 'Employee';
                  if (profile.is_staff || profile.is_admin || profile.is_superuser) {
                    inferredRole = 'Admin';
                  } else if (profile.department) {
                    const dept = String(profile.department).toLowerCase();
                    if (dept.includes('hr') || dept.includes('human')) inferredRole = 'HR';
                    else if (dept.includes('finance') || dept.includes('accounting')) inferredRole = 'Finance Manager';
                  }
                  resolved = inferredRole;
                }
                enriched = { ...profile, role: resolved, roles: [resolved] };
              }
            }
          }
        } catch (e) {
          // Ignore if endpoint not present
        }
        const mappedUser = mapApiUserToAppUser(enriched);
        dispatch(setUser(mappedUser as any));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        handleLogout();
        return false;
      }
      const response = await api.post('/auth/refresh/', { refresh: refreshToken });
      if (response.status === 200) {
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        setAccessToken(access);
        setIsAuthenticated(true);
        await fetchUserData(access);
        return true;
      } else {
        handleLogout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleLogout();
      return false;
    }
  };


  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login/', { email, password });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setAccessToken(access);
        setIsAuthenticated(true);
        console.log("is authenticated set to true in auth context")
        await fetchUserData(access);
        return { success: true };
      }
      return {
        success: false, 
        message: "Invalid credentials"
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false, 
        message: error.response?.data?.detail || "An error occurred during login"
      };
    }
  };


  const loginWithGoogle = async (accessToken: string) => {
    try {
      const response = await api.post<GoogleAuthResponse>('/auth/google/', { access_token: accessToken });
      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        setAccessToken(access);
        setIsAuthenticated(true);
        await fetchUserData(access);
        return { success: true };
      }
      // return { success: false, message: "Failed to authenticate with Google" };
    } catch (error: any) {
      console.error("Google authentication failed:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Failed to authenticate with Google"
      };
    }
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
    setAccessToken(null);
    dispatch(clearUser());
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const logout = () => {
    // Backend does not expose /auth/logout/, so just clear locally
    handleLogout();
    navigate('/login');
  };

  const value = {
    login,
    logout,
    isAuthenticated,
    accessToken,
    refreshAccessToken,
    loginWithGoogle
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

// Map API user payload into app's expected user shape, ensuring role fields exist
const mapApiUserToAppUser = (apiUser: any) => {
  const normalize = (raw?: string | null): string | undefined => {
    if (!raw) return undefined;
    const v = String(raw).trim();
    console.log('Normalizing role:', v);
    
    // Exact matches first (case sensitive)
    if (v === 'HR') return ROLES.HR;
    if (v === 'Admin') return ROLES.ADMIN;
    if (v === 'Finance Manager') return ROLES.FINANCE_MANAGER;
    if (v === 'Employee') return ROLES.EMPLOYEE;
    
    // Case insensitive matches
    const lower = v.toLowerCase();
    if (lower === 'hr' || lower === 'human resources' || lower === 'hr manager' || lower === 'hr admin') return ROLES.HR;
    if (lower === 'admin' || lower === 'administrator' || lower === 'superadmin' || lower === 'super admin') return ROLES.ADMIN;
    if (lower === 'finance manager' || lower === 'finance' || lower === 'accounting' || lower === 'accounts') return ROLES.FINANCE_MANAGER;
    if (lower === 'employee' || lower === 'staff' || lower === 'user' || lower === 'member') return ROLES.EMPLOYEE;
    
    console.log('No role match found for:', v);
    return undefined;
  };

  const roleFromArray = (arr: any[]): string | undefined => {
    if (!Array.isArray(arr) || arr.length === 0) return undefined;
    const first = arr[0];
    if (typeof first === 'string') return normalize(first) || first;
    if (first && typeof first === 'object') {
      const candidate = first.name || first.title || first.role || first.code || first.label;
      return normalize(candidate) || candidate;
    }
    return undefined;
  };

  const candidates: Array<string | undefined> = [
    apiUser.role,
    apiUser.user_role,
    apiUser.primaryRole,
    apiUser.primary_role,
    apiUser.group_name,
    apiUser.group?.name,
    roleFromArray(apiUser.roles),
    roleFromArray(apiUser.groups),
  ];

  console.log('Role candidates from API user:', candidates);
  
  let resolvedRole: string | undefined = candidates
    .map(r => {
      const normalized = r ? normalize(r) || String(r) : undefined;
      console.log(`Candidate "${r}" -> normalized: "${normalized}"`);
      return normalized;
    })
    .find(Boolean) as string | undefined;

  if (!resolvedRole) {
    // Backend might provide boolean flags
    if (apiUser.is_admin || apiUser.is_staff || apiUser.is_superuser) resolvedRole = ROLES.ADMIN;
    else if (apiUser.is_finance || apiUser.finance_manager) resolvedRole = ROLES.FINANCE_MANAGER;
    else resolvedRole = ROLES.EMPLOYEE;
  }

  const mapped = {
    ...apiUser,
    role: resolvedRole,
    roles: [resolvedRole],
  };

  console.log('Final mapped user:', mapped);

  // Ensure company is either null or an object
  if (mapped.company === undefined) {
    mapped.company = null;
  }

  return mapped;
};
