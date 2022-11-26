const express = require("express");
const router = express.Router();
const { register, login, verifyEmail } = require("../controller/auth");

router
  .post("/register", register)
  .post("/login", login)
  .get("/verify-email", verifyEmail);
module.exports = router;
