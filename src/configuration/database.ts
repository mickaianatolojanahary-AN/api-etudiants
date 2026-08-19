import { Pool } from 'pg';

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'michaia',
  password: process.env.DB_PASSWORD || 'Voaharimandimby',
  port: Number(process.env.DB_PORT) || 5432,
});

// Test de connexion pour vérifier que tout fonctionne
pool.on('connect', () => {
  console.log('Connecté à la base de données PostgreSQL !');
});

export default pool;