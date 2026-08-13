const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let etudiants = [
    { id: 1, nom: 'Alice', age: 20 },
    { id: 2, nom: 'Bob', age: 22 }
];


app.get('/etudiants', (req, res) => {
    res.status(200).json(etudiants);
});


app.get('/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);
    
    if (!etudiant) {
        return res.status(404).json({ erreur: "Étudiant non trouvé" });
    }
    res.status(200).json(etudiant);
});


app.post('/etudiants', (req, res) => {
    const { nom, age } = req.body;
    
    if (!nom || !age) {
        return res.status(400).json({ erreur: "Le nom et l'âge sont obligatoires" });
    }

    const nouveauEtudiant = {
        id: etudiants.length > 0 ? etudiants[etudiants.length - 1].id + 1 : 1,
        nom,
        age
    };

    etudiants.push(nouveauEtudiant);
    res.status(201).json(nouveauEtudiant);
});


app.put('/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ erreur: "Étudiant non trouvé" });
    }

    const { nom, age } = req.body;
    if (!nom || !age) {
        return res.status(400).json({ erreur: "Le nom et l'âge sont obligatoires pour un PUT" });
    }

    etudiants[index] = { id, nom, age };
    res.status(200).json(etudiants[index]);
});


app.patch('/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const etudiant = etudiants.find(e => e.id === id);

    if (!etudiant) {
        return res.status(404).json({ erreur: "Étudiant non trouvé" });
    }

    const { nom, age } = req.body;
    if (nom) etudiant.nom = nom;
    if (age) etudiant.age = age;

    res.status(200).json(etudiant);
});


app.delete('/etudiants/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = etudiants.findIndex(e => e.id === id);

    if (index === -1) {
        return res.status(404).json({ erreur: "Étudiant non trouvé" });
    }

    etudiants.splice(index, 1);
    res.status(204).send(); 
});


app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});