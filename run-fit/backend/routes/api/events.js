const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents } = require("../../controllers/eventController");

// create new event 
router.post("/", createEvent);

module.exports = router;