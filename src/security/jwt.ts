import jwt from 'jsonwebtoken';


const JWT_SECRET = 'votre_cle_secrete_super_securisee';

export const jwtUtils = {
    
    generateToken: (userId: number, email: string) => {
        return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
    },

    verifyToken: (token: string) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
};