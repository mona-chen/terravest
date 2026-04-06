import { RolePermissions } from '../config/roles';
import { Role } from '../config/roles';

// Public permission constants
export const USERS_READ = 'USERS_READ';
export const USERS_CREATE = 'USERS_CREATE';
export const USERS_UPDATE = 'USERS_UPDATE';
export const USERS_DELETE = 'USERS_DELETE';

export const COMPANIES_READ = 'COMPANIES_READ';
export const COMPANIES_CREATE = 'COMPANIES_CREATE';
export const COMPANIES_UPDATE = 'COMPANIES_UPDATE';
export const COMPANIES_DELETE = 'COMPANIES_DELETE';

export const DOCUMENTS_READ = 'DOCUMENTS_READ';
export const DOCUMENTS_CREATE = 'DOCUMENTS_CREATE';
export const DOCUMENTS_UPDATE = 'DOCUMENTS_UPDATE';
export const DOCUMENTS_DELETE = 'DOCUMENTS_DELETE';

export const PORTFOLIO_READ = 'PORTFOLIO_READ';
export const PORTFOLIO_MANAGE = 'PORTFOLIO_MANAGE';

export const ADMIN_FULL_ACCESS = 'ADMIN_FULL_ACCESS';

type RequestHandler = (req: any, res: any, next: any) => void;
export function checkPermission(permission: string): RequestHandler {
  return (req, res, next) => {
    const user = req.user as { role: Role } | undefined;
    if (!user || !user.role) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const allowed = RolePermissions[user.role]?.has(permission as any);
    if (allowed) {
      return next();
    }
    return res.status(403).json({ message: 'Forbidden: insufficient permissions' });
  };
}
