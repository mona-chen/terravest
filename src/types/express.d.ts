import { Role } from '../config/roles';

declare global {
  namespace Express {
  interface Request {
      user?: {
        id: string;
        name?: string;
        email?: string;
        role: Role;
        [key: string]: any;
      };
    }
  }
}

export {};
