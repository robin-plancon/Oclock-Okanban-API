const express = require('express');

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

const router = express.Router();

// Routes for lists
router.get('/lists', listController.getLists);
router.get('/lists/:id', listController.getList);
router.post('/lists', listController.createList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

// Routes for cards
router.get('/cards', cardController.getCards);
router.get('/cards/:id', cardController.getCard);
router.get('/lists/:id/cards', cardController.getCardsByListId);
router.post('/cards', cardController.createCard);
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

// Routes for tags
router.get('/tags', tagController.getTags);
router.post('/tags', tagController.createTag);
router.get('/tags/:id', tagController.getTag);
router.patch('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);
router.post('/cards/:id/tags/:tagId', tagController.addTagToCard);
router.delete('/cards/:id/tags/:tagId', tagController.removeTagFromCard);

module.exports = router;
