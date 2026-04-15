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
} from '../controllers/admin.controller';
import { requireAuth, requireAdmin } from '../middleware/auth';

const router = Router();

router.use(requireAuth, requireAdmin);

router.get('/dashboard', getDashboard);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/:id', updateUser);
router.get('/companies', getCompanies);
router.post('/companies', createCompany);
router.patch('/companies/:id', updateCompany);
router.delete('/companies/:id', deleteCompany);
router.get('/documents', getDocuments);
router.post('/documents', createDocument);
router.delete('/documents/:id', deleteDocument);

export default router;
