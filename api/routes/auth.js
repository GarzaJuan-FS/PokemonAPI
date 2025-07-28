const express = require("express");
const passport = require("passport");
const passportService = require("../services/passport");

const requireLogin = passport.authenticate("local", { session: false });

const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/register", authenticationController.signup); // Changed from /signup to /register
router.post("/login", requireLogin, authenticationController.signin); // Changed from /signin to /login

module.exports = router;
