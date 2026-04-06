import jwt from 'jsonwebtoken';
import { Role } from '../config/roles';

type Request = any;
type Response = any;
type NextFunction = any;

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

interface UserPayloadBackEnd {
  id: string;
  name?: string;
  email?: string;
  role: Role;
  [key: string]: any;
}

// Require authentication: verify JWT and attach user to req.user
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers?.authorization || '';
    const match = authHeader.match(/^Bearer\s+(.*)$/i);
    const token = match ? match[1] : null;
    if (!token) {
      return res?.status?.(401).json({ message: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // Normalize user object from decoded JWT payload
    const user: UserPayloadBackEnd = {
      id: decoded?.sub ?? decoded?.id ?? '',
      name: decoded?.name,
      email: decoded?.email,
      role: (decoded?.role ?? decoded?.userRole ?? Role.INVESTOR) as Role,
      ...(decoded || {}),
    };

    req.user = user;
    return next();
  } catch (err) {
    return res?.status?.(401).json({ message: 'Invalid authentication token' });
  }
};

// Require specific role(s)
export const requireRole = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as UserPayloadBackEnd | undefined;
    if (!user || !user.role) {
      return res?.status?.(401).json({ message: 'Not authenticated' });
    }
    if (allowedRoles.includes(user.role)) {
      return next();
    }
    return res?.status?.(403).json({ message: 'Forbidden: insufficient role' });
  };
};

// Convenience shortcuts
export const requireAdmin = requireRole(Role.ADMIN);
export const requireInvestor = requireRole(Role.INVESTOR);
