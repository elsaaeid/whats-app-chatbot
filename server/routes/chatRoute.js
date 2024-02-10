const express = require("express");
const { chatBot } = require("../controller/chatController");
const router = express.Router();


router.post('/whatsapp-message', chatBot);
module.exports = router;
