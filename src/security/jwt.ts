import jwt from 'jsonwebtoken';

// Une clé secrète (dans un vrai projet, on la mettrait dans un fichier .env)
const JWT_SECRET = 'votre_cle_secrete_super_securisee';

export const jwtUtils = {
    // Générer un token pour un utilisateur
    generateToken: (userId: number, email: string) => {
        return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '1h' });
    },

    // Vérifier un token (middleware pour protéger les routes)
    verifyToken: (token: string) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
};