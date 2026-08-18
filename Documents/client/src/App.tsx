import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Chargement...');

  useEffect(() => {
    fetch('http://localhost:3000/etudiants')
      .then((res) => res.json())
      .then((data) => {
        console.log("Données reçues :", data);
        setMessage("Connexion avec l'API réussie ! Regardez la console (F12).");
      })
      .catch((err) => {
        console.error("Erreur :", err);
        setMessage("Erreur de connexion au serveur.");
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Mon Application React & Express</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;