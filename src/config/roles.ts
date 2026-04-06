// Define available roles
export enum Role {
  ADMIN = 'ADMIN',
  INVESTOR = 'INVESTOR',
}

// Publicly used permission type
export type Permission =
  | 'USERS_READ' | 'USERS_CREATE' | 'USERS_UPDATE' | 'USERS_DELETE'
  | 'COMPANIES_READ' | 'COMPANIES_CREATE' | 'COMPANIES_UPDATE' | 'COMPANIES_DELETE'
  | 'DOCUMENTS_READ' | 'DOCUMENTS_CREATE' | 'DOCUMENTS_UPDATE' | 'DOCUMENTS_DELETE'
  | 'PORTFOLIO_READ' | 'PORTFOLIO_MANAGE'
  | 'ADMIN_FULL_ACCESS';

// Map of role -> allowed permissions
type RolePermissionsMap = {
  [K in Role]: Set<Permission>;
};

export const RolePermissions: RolePermissionsMap = {
  [Role.ADMIN]: new Set<Permission>([
    'ADMIN_FULL_ACCESS',
    'USERS_READ', 'USERS_CREATE', 'USERS_UPDATE', 'USERS_DELETE',
    'COMPANIES_READ', 'COMPANIES_CREATE', 'COMPANIES_UPDATE', 'COMPANIES_DELETE',
    'DOCUMENTS_READ', 'DOCUMENTS_CREATE', 'DOCUMENTS_UPDATE', 'DOCUMENTS_DELETE',
    'PORTFOLIO_READ', 'PORTFOLIO_MANAGE',
  ]),
  [Role.INVESTOR]: new Set<Permission>([
    // Investors can read their own data and public references
    'USERS_READ',
    'COMPANIES_READ',
    'DOCUMENTS_READ',
    'PORTFOLIO_READ',
  ]),
};

// Lightweight user payload shape expected from a verified JWT
export interface UserPayload {
  id: string;
  name?: string;
  email?: string;
  role: Role;
}
