import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

type User = {
  id: string;
  email: string;
  passwordHash: string;
};

const users: User[] = [
  {
    id: 'u1',
    email: 'admin@example.com',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
];

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '15m',
  });
  res.json({ accessToken: token, user: { id: user.id, email: user.email } });
});

router.post('/signup', async (req: Request, res: Response) => {
  const { email, password } = req.body as { email?: string; password?: string };
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = { id: `u${users.length + 1}`, email, passwordHash };
  users.push(newUser);
  res.status(201).json({ id: newUser.id, email: newUser.email });
});

export default router;
