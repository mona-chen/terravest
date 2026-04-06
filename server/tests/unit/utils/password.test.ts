import bcrypt from 'bcryptjs';
import { hashPassword, verifyPassword } from '../../src/utils/password';

describe('Password Utils', () => {
  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'test-password';
      const hash = await hashPassword(password);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).not.toBe(password);
    });

    it('should produce different hashes for same password', async () => {
      const password = 'test-password';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password', async () => {
      const password = 'test-password';
      const hash = await bcrypt.hash(password, 10);
      
      const result = await verifyPassword(password, hash);
      expect(result).toBe(true);
    });

    it('should return false for incorrect password', async () => {
      const password = 'test-password';
      const hash = await bcrypt.hash(password, 10);
      
      const result = await verifyPassword('wrong-password', hash);
      expect(result).toBe(false);
    });
  });
});
