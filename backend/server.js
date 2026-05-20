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

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE email = ? AND password = ?";
        const [rows] = await db.query(query, [email, password]);

        if (rows.length > 0) {
            res.json({ message: "Connexion réussie !", user: rows[0] });
        } else {
            res.status(401).json({ error: "Email ou mot de passe incorrect" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});
// 1. Récupérer un produit spécifique par son ID (Pour la page détails)
app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [productId]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: "Produit non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération du produit" });
    }
});

// 2. Traitement des commandes (Enregistrer une commande en base de données)
app.post('/api/orders', async (req, res) => {
    const { user_id, total_price, items } = req.body; // items est un tableau ou une chaîne contenant les produits commandés
    try {
        const query = "INSERT INTO orders (user_id, total_price, items) VALUES (?, ?, ?)";
        // On stocke les items sous forme de chaîne de caractères (JSON) dans MySQL
        await db.query(query, [user_id, total_price, JSON.stringify(items)]);
        res.status(201).json({ message: "Commande enregistrée avec succès !" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur lors du traitement de la commande" });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});

db.query("SELECT 1")
    .then(() => {
        console.log(" BRAVO : La connexion à MySQL (XAMPP) est établie !");
    })
    .catch((err) => {
        console.log(" ERREUR : Connexion impossible. Vérifie XAMPP ou ton fichier .env");
        console.error(err);
    });