import { Router } from 'express';
import { 
  register, 
  login, 
  getProfile, 
  createProfile, 
  updateProfile 
} from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas
router.post('/register', register);
router.post('/login', login);

// Rotas protegidas
router.get('/profile', authenticate, getProfile);
router.post('/profile', authenticate, createProfile);
router.put('/profile', authenticate, updateProfile);

export default router; 