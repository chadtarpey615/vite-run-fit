const express = require("express");
const { createUser } = require("../../controllers/userController");
const router = express.Router();

router.post("/", createUser, () => console.log("routes file hit"));

module.exports = router;