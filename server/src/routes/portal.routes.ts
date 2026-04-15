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
  getOpportunities,
  getCapitalCalls,
  getTaxDocuments,
  getCompliance,
  getReports,
  getSettings,
  updateSettings,
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
router.get('/opportunities', getOpportunities);
router.get('/capital-calls', getCapitalCalls);
router.get('/tax-documents', getTaxDocuments);
router.get('/compliance', getCompliance);
router.get('/reports', getReports);
router.get('/settings', getSettings);
router.patch('/settings', updateSettings);

export default router;
