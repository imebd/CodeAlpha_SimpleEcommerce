const express = require('express');
const cors=require('cors');

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
