const express = require("express");
const { generateTopic, getTopics } = require("../controllers/topicController");

const router = express.Router();

router.post("/generate", generateTopic);
router.get("/", getTopics);

module.exports = router;