import { Router } from 'express';
import {
  getDashboard,
  getProfile,
  updateProfile,
  getPortfolio,
  getCompanies,
  getDocuments,
  getNotifications,
  markNotificationRead,
  getMessages,
  sendMessage,
} from '../controllers/portal.controller';
import { requireAuth, requireInvestor } from '../middleware/auth';

const router = Router();

router.use(requireAuth, requireInvestor);

router.get('/dashboard', getDashboard);
router.get('/profile', getProfile);
router.patch('/profile', updateProfile);
router.get('/portfolio', getPortfolio);
router.get('/companies', getCompanies);
router.get('/documents', getDocuments);
router.get('/notifications', getNotifications);
router.patch('/notifications/:id/read', markNotificationRead);
router.get('/messages', getMessages);
router.post('/messages', sendMessage);

export default router;
