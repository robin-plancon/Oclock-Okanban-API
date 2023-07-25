const express = require('express');
const { addTagToCard, createCard, deleteCard, getCard, getCards, modifyCard, removeTagToCard } = require("../controllers/cards");

const router = express.Router();

router.get("/cards", getCards);
router.post("/cards", createCard);

router.get("/cards/:id", getCard);
router.patch("/cards/:id", modifyCard);
router.delete("/cards/:id", deleteCard);

router.post("/cards/:card_id/tags", addTagToCard);
router.delete("/cards/:card_id/tags/:tag_id", removeTagToCard);

module.exports = router;