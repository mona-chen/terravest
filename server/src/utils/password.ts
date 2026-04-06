import bcrypt from 'bcryptjs';

/**
 * Hash a password using bcrypt
 * Uses 10 salt rounds for security/performance balance
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Verify a password against a hash
 * Returns true if password matches, false otherwise
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
