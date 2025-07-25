import { Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/database';
import { AuthRequest } from '../middleware/auth';

// Schemas de validação
const workoutPlanSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  duration: z.string().min(1, 'Duração é obrigatória'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
});

const workoutSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  day: z.string().min(1, 'Dia é obrigatório'),
  dayOfWeek: z.number().int().min(1).max(7),
  duration: z.string().min(1, 'Duração é obrigatória'),
  muscleGroups: z.array(z.string()).min(1, 'Pelo menos um grupo muscular é obrigatório'),
});

const workoutSessionSchema = z.object({
  workoutPlanId: z.string().optional(),
  workoutId: z.string().optional(),
  date: z.string().datetime(),
  duration: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const getWorkoutPlans = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const workoutPlans = await prisma.workoutPlan.findMany({
      where: { userId },
      include: {
        workouts: {
          include: {
            exercises: {
              include: {
                exercise: true
              },
              orderBy: { order: 'asc' }
            }
          }
        },
        _count: {
          select: {
            workouts: true,
            sessions: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({
      success: true,
      data: workoutPlans
    });
    
  } catch (error) {
    console.error('Erro ao buscar planos de treino:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const createWorkoutPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const validatedData = workoutPlanSchema.parse(req.body);
    
    // Desativar outros planos se este for ativo
    if (req.body.isActive) {
      await prisma.workoutPlan.updateMany({
        where: { userId, isActive: true },
        data: { isActive: false }
      });
    }
    
    const workoutPlan = await prisma.workoutPlan.create({
      data: {
        userId,
        ...validatedData,
        isActive: req.body.isActive || false
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Plano de treino criado com sucesso',
      data: workoutPlan
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro ao criar plano de treino:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const getWorkoutPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { id } = req.params;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const workoutPlan = await prisma.workoutPlan.findFirst({
      where: { id, userId },
      include: {
        workouts: {
          include: {
            exercises: {
              include: {
                exercise: true
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { dayOfWeek: 'asc' }
        }
      }
    });
    
    if (!workoutPlan) {
      return res.status(404).json({
        error: 'Plano de treino não encontrado',
        code: 'WORKOUT_PLAN_NOT_FOUND'
      });
    }
    
    res.json({
      success: true,
      data: workoutPlan
    });
    
  } catch (error) {
    console.error('Erro ao buscar plano de treino:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const getActiveWorkoutPlan = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const workoutPlan = await prisma.workoutPlan.findFirst({
      where: { userId, isActive: true },
      include: {
        workouts: {
          include: {
            exercises: {
              include: {
                exercise: true
              },
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { dayOfWeek: 'asc' }
        }
      }
    });
    
    if (!workoutPlan) {
      return res.status(404).json({
        error: 'Nenhum plano ativo encontrado',
        code: 'NO_ACTIVE_PLAN'
      });
    }
    
    res.json({
      success: true,
      data: workoutPlan
    });
    
  } catch (error) {
    console.error('Erro ao buscar plano ativo:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const createWorkoutSession = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const validatedData = workoutSessionSchema.parse(req.body);
    
    const session = await prisma.workoutSession.create({
      data: {
        userId,
        date: new Date(validatedData.date),
        workoutPlanId: validatedData.workoutPlanId,
        workoutId: validatedData.workoutId,
        duration: validatedData.duration,
        notes: validatedData.notes,
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Sessão de treino criada com sucesso',
      data: session
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro ao criar sessão de treino:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const getWorkoutSessions = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const { startDate, endDate, limit = '10' } = req.query;
    
    const where: any = { userId };
    
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }
    
    const sessions = await prisma.workoutSession.findMany({
      where,
      include: {
        workoutPlan: {
          select: { name: true }
        },
        sets: {
          include: {
            exercise: {
              select: { name: true, muscle: true }
            }
          }
        }
      },
      orderBy: { date: 'desc' },
      take: parseInt(limit as string)
    });
    
    res.json({
      success: true,
      data: sessions
    });
    
  } catch (error) {
    console.error('Erro ao buscar sessões de treino:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const getExercises = async (req: AuthRequest, res: Response) => {
  try {
    const { category, muscle, difficulty } = req.query;
    
    const where: any = {};
    
    if (category) where.category = category;
    if (muscle) where.muscle = muscle;
    if (difficulty) where.difficulty = difficulty;
    
    const exercises = await prisma.exercise.findMany({
      where,
      orderBy: { name: 'asc' }
    });
    
    res.json({
      success: true,
      data: exercises
    });
    
  } catch (error) {
    console.error('Erro ao buscar exercícios:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
}; 