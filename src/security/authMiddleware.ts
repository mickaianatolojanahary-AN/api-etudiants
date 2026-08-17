import { Request, Response, NextFunction } from 'express';
import { jwtUtils } from './jwt';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer TOKEN

    if (!token) {
        return res.status(401).json({ erreur: "Accès refusé, token manquant" });
    }

    const decoded = jwtUtils.verifyToken(token);
    if (!decoded) {
        return res.status(403).json({ erreur: "Token invalide ou expiré" });
    }

    
    next();
};