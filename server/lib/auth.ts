import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// Schemas de validação
export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const profileSchema = z.object({
  bodyType: z.enum(['ectomorfo', 'mesomorfo', 'endomorfo']),
  currentWeight: z.number().positive('Peso deve ser positivo'),
  targetWeight: z.number().positive('Peso alvo deve ser positivo'),
  height: z.number().positive('Altura deve ser positiva'),
  age: z.number().int().min(16).max(100),
  gender: z.enum(['masculino', 'feminino', 'outro']),
  goal: z.enum(['ganhar-peso', 'perder-peso', 'definir', 'manter']),
  timeframe: z.string().min(1, 'Prazo é obrigatório'),
  budget: z.number().positive('Orçamento deve ser positivo'),
  activityLevel: z.enum(['sedentario', 'leve', 'moderado', 'intenso']),
  preferences: z.object({
    allergies: z.array(z.string()).optional(),
    dislikes: z.array(z.string()).optional(),
    vegetarian: z.boolean().optional(),
    vegan: z.boolean().optional(),
  }).optional(),
}); 