const express = require("express");
const router = express.Router();

const {
  loginUser,
  signUpUser,
  resetUserPass,
  createOtp,
} = require("../controllers/users");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/reset", resetUserPass);
router.post("/otp", createOtp);

module.exports = router;
