import { Router } from 'express';
import {
  getWorkoutPlans,
  createWorkoutPlan,
  getWorkoutPlan,
  getActiveWorkoutPlan,
  createWorkoutSession,
  getWorkoutSessions,
  getExercises
} from '../controllers/workoutController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authenticate);

// Planos de treino
router.get('/plans', getWorkoutPlans);
router.post('/plans', createWorkoutPlan);
router.get('/plans/active', getActiveWorkoutPlan);
router.get('/plans/:id', getWorkoutPlan);

// Sessões de treino
router.get('/sessions', getWorkoutSessions);
router.post('/sessions', createWorkoutSession);

// Exercícios
router.get('/exercises', getExercises);

export default router; 