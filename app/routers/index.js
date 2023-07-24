const express = require('express');
// path est un module natif de nodejs qui nous permet de créer des chemins (relatifs/absolus).
const path = require("path");
const { createList, deleteList, getList, getLists, modifyList } = require('../controllers/lists');

const router = express.Router();

// La route par défaut, elle sert une fichier html dans lequel on écrira toutes nos routes (à titre informatif).
router.get("/", (req, res) => {
    // Je me sers de path.join pour créer mon chemin vers le index.html. __dirname est le chemin absolu vers le dossier courant (routers), cette variable est fourni par nodejs.
    res.sendFile(path.join(__dirname, "../assets/index.html"));
})

// Une route c'est une condition. Le controller, c'est le code exécuté si la condition (la route) est remplie.
// Ici par exemple, la condition c'est d'être sur la route /list en méthode GET.
router.get("/lists", getLists);
// Ici par exemple, la condition c'est d'être sur la route /list en méthode POST.
router.post("/lists", createList);

router.get("/lists/:id", getList);
router.patch("/lists/:id", modifyList);
router.delete("/lists/:id", deleteList);

router.use((req, res) => {
    res.sendFile(path.join(__dirname, "../assets/404.html"));
})

module.exports = router;