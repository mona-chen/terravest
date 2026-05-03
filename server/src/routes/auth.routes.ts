import { Router } from 'express';
import { register, login, logout, getMe, refresh, changePassword } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { asyncHandler } from '../middleware/asyncHandler';
import { registerSchema, loginSchema, refreshSchema, changePasswordSchema } from '../validations/auth.validation';

const router = Router();

router.post('/register', validate(registerSchema), asyncHandler(register));
router.post('/login', validate(loginSchema), asyncHandler(login));
router.post('/refresh', validate(refreshSchema), asyncHandler(refresh));
router.post('/logout', asyncHandler(logout));
router.get('/me', requireAuth, asyncHandler(getMe));
router.post('/change-password', requireAuth, validate(changePasswordSchema), asyncHandler(changePassword));

export default router;
