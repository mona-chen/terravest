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
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(requireAuth, requireInvestor);

router.get('/dashboard', asyncHandler(getDashboard));
router.get('/profile', asyncHandler(getProfile));
router.patch('/profile', asyncHandler(updateProfile));
router.get('/portfolio', asyncHandler(getPortfolio));
router.get('/companies', asyncHandler(getCompanies));
router.get('/documents', asyncHandler(getDocuments));
router.get('/notifications', asyncHandler(getNotifications));
router.patch('/notifications/:id/read', asyncHandler(markNotificationRead));
router.get('/messages', asyncHandler(getMessages));
router.post('/messages', asyncHandler(sendMessage));
router.get('/opportunities', asyncHandler(getOpportunities));
router.get('/capital-calls', asyncHandler(getCapitalCalls));
router.get('/tax-documents', asyncHandler(getTaxDocuments));
router.get('/compliance', asyncHandler(getCompliance));
router.get('/reports', asyncHandler(getReports));
router.get('/settings', asyncHandler(getSettings));
router.patch('/settings', asyncHandler(updateSettings));

export default router;
