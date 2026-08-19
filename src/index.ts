import express from 'express';
import cors from 'cors';
import pool from './configuration/database';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/etudiants', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM etudiants');
    res.json(result.rows);
  } catch (err) {
    console.error('Erreur lors de la récupération des étudiants :', err);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});