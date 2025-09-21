// Role utility functions for role-based access control

export const ROLES = {
  HR: 'HR',
  ADMIN: 'Admin',
  FINANCE_MANAGER: 'Finance Manager',
  EMPLOYEE: 'Employee'
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

// Role-based dashboard mapping - all roles now use /dashboard
export const ROLE_DASHBOARD_MAP: Record<UserRole, string> = {
  [ROLES.HR]: '/dashboard',
  [ROLES.ADMIN]: '/dashboard',
  [ROLES.FINANCE_MANAGER]: '/dashboard',
  [ROLES.EMPLOYEE]: '/dashboard'
};

// Get user's primary role from user data
export const getUserRole = (user: any): UserRole => {
  if (!user) return ROLES.EMPLOYEE;
  
  // Common shapes to check in order of likelihood
  // 1) roles: string[] | { name?: string; title?: string; role?: string }[]
  if (Array.isArray(user.roles) && user.roles.length > 0) {
    const firstRole = user.roles[0];
    if (typeof firstRole === 'string') {
      return normalizeRoleName(firstRole) || (firstRole as UserRole);
    }
    if (firstRole && typeof firstRole === 'object') {
      const normalized = normalizeRoleName(firstRole.name || firstRole.title || firstRole.role);
      if (normalized) return normalized;
      // Fallback to any string-ish value inside
      const arbitrary = (firstRole.name || firstRole.title || firstRole.role) as string | undefined;
      if (arbitrary) return arbitrary as UserRole;
    }
  }
  
  // 2) role object or string on user (trust backend default here)
  if (user.role) {
    if (typeof user.role === 'string') {
      return normalizeRoleName(user.role) || (user.role as UserRole);
    }
    if (typeof user.role === 'object') {
      const normalized = normalizeRoleName(user.role.name || user.role.title || user.role.role);
      if (normalized) return normalized;
    }
  }

  // 3) alternate single-role fields often seen from APIs
  const altSingleRole = user.user_role || user.primaryRole || user.primary_role || user.group || user.group_name;
  if (altSingleRole) {
    const normalized = normalizeRoleName(altSingleRole);
    if (normalized) return normalized;
    return altSingleRole as UserRole;
  }
  
  // Default fallback: align with backend default (Finance)
  return ROLES.FINANCE_MANAGER;
};

// Get dashboard path for user role - now always returns /dashboard
export const getDashboardPath = (user: any): string => {
  return '/dashboard';
};

// Check if user has required role
export const hasRole = (user: any, requiredRoles: string[]): boolean => {
  const userRole = getUserRole(user);
  const hasAccess = requiredRoles.includes(userRole);
  return hasAccess;
};

// Check if user is HR or Admin (they have similar permissions)
export const isHRorAdmin = (user: any): boolean => {
  const userRole = getUserRole(user);
  return userRole === ROLES.HR || userRole === ROLES.ADMIN;
};

// Check if user is Finance Manager
export const isFinanceManager = (user: any): boolean => {
  const userRole = getUserRole(user);
  return userRole === ROLES.FINANCE_MANAGER;
};

// Check if user is Employee
export const isEmployee = (user: any): boolean => {
  const userRole = getUserRole(user);
  return userRole === ROLES.EMPLOYEE;
};
