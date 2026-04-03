const express = require("express");
const router = express.Router();
const { chat } = require("../controllers/chatbotController");

// POST /api/chatbot/message
router.post("/message", chat);

module.exports = router;