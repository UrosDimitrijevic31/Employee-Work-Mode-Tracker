import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { authenticateJWT, requireRole } from '../middleware/auth';
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../controllers/employees.controller';
import {
  listWorkStatus,
  createWorkStatus,
  updateWorkStatus
} from '../controllers/workstatus.controller';

const router = Router();

// Auth
router.post('/auth/login', login);

// Employees (manager only for create/update/delete)
router.get('/employees', authenticateJWT, listEmployees);
router.post('/employees', authenticateJWT, requireRole('manager'), createEmployee);
router.put('/employees/:id', authenticateJWT, requireRole('manager'), updateEmployee);
router.delete('/employees/:id', authenticateJWT, requireRole('manager'), deleteEmployee);

// Work Status (employees manage own, managers can view all)
router.get('/work-status', authenticateJWT, listWorkStatus);
router.post('/work-status', authenticateJWT, createWorkStatus);
router.put('/work-status/:id', authenticateJWT, updateWorkStatus);

export default router;
