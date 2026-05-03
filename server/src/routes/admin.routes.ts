import { Router } from 'express';
import {
  getDashboard,
  getUsers,
  getUser,
  updateUser,
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
  getDocuments,
  createDocument,
  deleteDocument,
  getPortfolios,
  getOpportunities,
  getAnalytics,
} from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', asyncHandler(getDashboard));
router.get('/users', asyncHandler(getUsers));
router.get('/users/:id', asyncHandler(getUser));
router.patch('/users/:id', asyncHandler(updateUser));
router.get('/companies', asyncHandler(getCompanies));
router.post('/companies', asyncHandler(createCompany));
router.patch('/companies/:id', asyncHandler(updateCompany));
router.delete('/companies/:id', asyncHandler(deleteCompany));
router.get('/documents', asyncHandler(getDocuments));
router.post('/documents', asyncHandler(createDocument));
router.delete('/documents/:id', asyncHandler(deleteDocument));
router.get('/portfolios', asyncHandler(getPortfolios));
router.get('/opportunities', asyncHandler(getOpportunities));
router.get('/analytics', asyncHandler(getAnalytics));

export default router;
