const express = require('express');
const { createList, deleteList, getList, getLists, getListCards, modifyList } = require('../controllers/lists');

const router = express.Router();

// Une route c'est une condition. Le controller, c'est le code exécuté si la condition (la route) est remplie.
// Ici par exemple, la condition c'est d'être sur la route /list en méthode GET.
router.get("/lists", getLists);
// Ici par exemple, la condition c'est d'être sur la route /list en méthode POST.
router.post("/lists", createList);

router.get("/lists/:id", getList);
router.patch("/lists/:id", modifyList);
router.delete("/lists/:id", deleteList);

router.get("/lists/:id/cards", getListCards)

module.exports = router;