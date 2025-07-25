import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../lib/auth';

export interface AuthRequest extends Request {
  user?: JWTPayload;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Token de acesso requerido',
        code: 'UNAUTHORIZED' 
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    const payload = verifyToken(token);
    
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ 
      error: 'Token inválido ou expirado',
      code: 'INVALID_TOKEN' 
    });
  }
};

export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyToken(token);
      req.user = payload;
    }
    
    next();
  } catch (error) {
    // Se o token for inválido, apenas continue sem autenticação
    next();
  }
}; 