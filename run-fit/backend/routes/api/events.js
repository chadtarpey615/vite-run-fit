const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, deleteEvent } = require("../../controllers/eventController");

// create new event 
router.post("/", createEvent);

router.get("/all-events", getAllEvents);

router.get("/:id", deleteEvent);


module.exports = router;