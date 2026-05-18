const express = require('express');
const cors=require('cors');
const db = require('./data');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Le serveur de l'E-commerce fonctionne !");
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});
// Test visuel de la connexion
db.query("SELECT 1")
    .then(() => {
        console.log("✅ BRAVO : La connexion à MySQL (XAMPP) est établie !");
    })
    .catch((err) => {
        console.log("❌ ERREUR : Connexion impossible. Vérifie XAMPP ou ton fichier .env");
        console.error(err);
    });