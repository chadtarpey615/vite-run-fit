const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, deleteEvent, updateEvent } = require("../../controllers/eventController");

// create new event 
router.post("/", createEvent);

router.get("/all-events", getAllEvents);

router.get("/:id", deleteEvent);

router.patch("all-event/:id", updateEvent)


module.exports = router;