const express = require("express");
const { createUser, userLogin } = require("../../controllers/userController");
const router = express.Router();

router.post("/", createUser, () => console.log("routes file hit"));


router.post("/login", userLogin);

module.exports = router;