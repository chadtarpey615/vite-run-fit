const express = require("express");
const { createUser, userLogin, getAllUsers } = require("../../controllers/userController");
const router = express.Router();

router.post("/", createUser, () => console.log("routes file hit"));


router.post("/login", userLogin);

router.get("/allUsers", getAllUsers)

module.exports = router;