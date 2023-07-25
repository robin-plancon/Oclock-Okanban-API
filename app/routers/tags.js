const express = require('express');
const { getTags, createTag, modifyTag, deleteTag } = require("../controllers/tags");

const router = express.Router();

router.get("/tags", getTags);
router.post("/tags", createTag);
router.patch("/tags/:id", modifyTag);
router.delete("/tags/:id", deleteTag);

module.exports = router;