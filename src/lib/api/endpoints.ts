export const ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  PORTAL: {
    DASHBOARD: '/portal/dashboard',
    PROFILE: '/portal/profile',
    PORTFOLIO: '/portal/portfolio',
    COMPANIES: '/portal/companies',
    DOCUMENTS: '/portal/documents',
    NOTIFICATIONS: '/portal/notifications',
    MESSAGES: '/portal/messages',
    OPPORTUNITIES: '/portal/opportunities',
    CAPITAL_CALLS: '/portal/capital-calls',
    PERFORMANCE: '/portal/performance',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    COMPANIES: '/admin/companies',
    DOCUMENTS: '/admin/documents',
  },
} as const;
