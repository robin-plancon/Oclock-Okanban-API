const express = require("express");
const cors = require('cors');
const sanitizer = require('sanitizer');
// dotenv est configuré pour aller chercher automatiquement un fichier .env à la racine du projet (si on change le nom ou l'emplacement du fichier, dotenv ne fonctionnera plus).
require('dotenv').config(); // Equivalent à écrire const dotenv = require('dotenv'); dotenv.config();
// Si je require un dossier, node va automatiquement chercher un fichier avec le nom index.js.
const routers = require('./routers');

const PORT = process.env.PORT || 3000;

const app = express();

// Ici, on va configurer nos CORS policy. Pour pas me prendre la tête, je peux mettre simplment "*" en argument, ça autorisera les requêtes de n'importe quelle origine et de n'importe quelle méthode.
app.use(cors({
    origin: "*"
}));
// Permet de récupérer le body (sous forme de FormData) dans les requêtes et de le rendre disponible via req.body.
// app.use(express.urlencoded({ extended: true }));
// Permet de récupérer le body (sous forme de JSON) dans les requêtes et de le rendre disponible via req.body.
app.use(express.json());
app.use((req, res, next) => {
    if (req.body) {
        for (let propName in req.body) {
            req.body[propName] = sanitizer.escape(req.body[propName]);
        }
    }
    next();
})

app.use(routers);

app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
})