import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/database';
import { 
  generateToken, 
  hashPassword, 
  comparePassword, 
  registerSchema, 
  loginSchema,
  profileSchema 
} from '../lib/auth';
import { AuthRequest } from '../middleware/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingUser) {
      return res.status(400).json({
        error: 'Email já está em uso',
        code: 'EMAIL_EXISTS'
      });
    }
    
    // Criar usuário
    const hashedPassword = await hashPassword(validatedData.password);
    
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true
      }
    });
    
    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email
    });
    
    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: {
        user,
        token
      }
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro no registro:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
      include: {
        profile: true
      }
    });
    
    if (!user) {
      return res.status(401).json({
        error: 'Email ou senha incorretos',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Verificar senha
    const isValidPassword = await comparePassword(validatedData.password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Email ou senha incorretos',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    // Gerar token
    const token = generateToken({
      userId: user.id,
      email: user.email
    });
    
    const { password, ...userWithoutPassword } = user;
    
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: userWithoutPassword,
        token
      }
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        profile: true
      }
    });
    
    if (!user) {
      return res.status(404).json({
        error: 'Usuário não encontrado',
        code: 'USER_NOT_FOUND'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
    
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const createProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const validatedData = profileSchema.parse(req.body);
    
    // Verificar se já tem perfil
    const existingProfile = await prisma.userProfile.findUnique({
      where: { userId }
    });
    
    if (existingProfile) {
      return res.status(400).json({
        error: 'Usuário já possui perfil',
        code: 'PROFILE_EXISTS'
      });
    }
    
    // Criar perfil
    const profile = await prisma.userProfile.create({
      data: {
        userId,
        ...validatedData
      }
    });
    
    res.status(201).json({
      success: true,
      message: 'Perfil criado com sucesso',
      data: profile
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro ao criar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return res.status(401).json({
        error: 'Usuário não autenticado',
        code: 'UNAUTHORIZED'
      });
    }
    
    const validatedData = profileSchema.partial().parse(req.body);
    
    // Atualizar perfil
    const profile = await prisma.userProfile.update({
      where: { userId },
      data: validatedData
    });
    
    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      data: profile
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: error.errors,
        code: 'VALIDATION_ERROR'
      });
    }
    
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      code: 'INTERNAL_ERROR'
    });
  }
}; 