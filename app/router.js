const express = require('express');

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

const router = express.Router();

// Routes for lists
router.get('/lists', listController.getLists);
router.post('/lists', listController.createList);
router.get('/lists/:id', listController.getList);
router.patch('/lists/:id', listController.updateList);
router.delete('/lists/:id', listController.deleteList);

// Routes for cards
router.get('/cards', cardController.getCards);
router.post('/cards', cardController.createCard);
router.get('/cards/:id', cardController.getCard);
router.patch('/cards/:id', cardController.updateCard);
router.delete('/cards/:id', cardController.deleteCard);

// Routes for tags
router.get('/tags', tagController.getTags);
router.post('/tags', tagController.createTag);
router.get('/tags/:id', tagController.getTag);
router.patch('/tags/:id', tagController.updateTag);
router.delete('/tags/:id', tagController.deleteTag);

module.exports = router;
