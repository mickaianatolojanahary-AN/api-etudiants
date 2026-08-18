import express from 'express';
import cors from 'cors';
import { verifyJWT } from './security/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Autorise les requêtes de React
app.use(express.json());

// 1. Lister tous les étudiants (GET /etudiants)
app.get('/etudiants', verifyJWT, (req, res) => {
  res.status(200).json({ message: 'Liste de tous les étudiants' });
});

// 2. Lire un étudiant par son ID (GET /etudiants/:id)
app.get('/etudiants/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Affichage de l'étudiant numéro ${id}` });
});

// 3. Créer un étudiant (POST /etudiants)
app.post('/etudiants', (req, res) => {
  res.status(201).json({ message: 'Étudiant créé avec succès' });
});

// 4. Modifier complètement un étudiant (PUT /etudiants/:id)
app.put('/etudiants/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Étudiant ${id} mis à jour complètement` });
});

// 5. Modifier partiellement un étudiant (PATCH /etudiants/:id)
app.patch('/etudiants/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Étudiant ${id} mis à jour partiellement` });
});

// 6. Supprimer un étudiant (DELETE /etudiants/:id)
app.delete('/etudiants/:id', (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: `Étudiant ${id} supprimé avec succès` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});