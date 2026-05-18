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
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json(rows); 
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération des produits" });
    }
});

app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        await db.query(query, [username, email, password]);
        res.status(201).json({ message: "Utilisateur créé avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
});
app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});
// Test visuel de la connexion
db.query("SELECT 1")
    .then(() => {
        console.log(" BRAVO : La connexion à MySQL (XAMPP) est établie !");
    })
    .catch((err) => {
        console.log(" ERREUR : Connexion impossible. Vérifie XAMPP ou ton fichier .env");
        console.error(err);
    });