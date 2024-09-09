const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.js");
const authMiddleware = require("../middleware/auth.js");

router.post("/sign-up", authController.postSignUp);
router.post("/sign-in", authController.postSignIn);
router.get("/protected", authMiddleware.verifyAuthToken, authController.getProtected);

module.exports = router;
