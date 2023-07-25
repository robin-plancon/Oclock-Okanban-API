const express = require('express');
// path est un module natif de nodejs qui nous permet de créer des chemins (relatifs/absolus).
const path = require("path");
const CardRouter = require("./cards");
const ListRouter = require("./lists");
const TagRouter = require("./tags");

const router = express.Router();

// La route par défaut, elle sert une fichier html dans lequel on écrira toutes nos routes (à titre informatif).
router.get("/", (req, res) => {
    // Je me sers de path.join pour créer mon chemin vers le index.html. __dirname est le chemin absolu vers le dossier courant (routers), cette variable est fourni par nodejs.
    res.sendFile(path.join(__dirname, "../assets/index.html"));
})

router.use(CardRouter);
router.use(ListRouter);
router.use(TagRouter);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../assets/404.html"));
})

module.exports = router;