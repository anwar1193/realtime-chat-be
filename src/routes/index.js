const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const usersRouter = require("./users");
const messageRoute = require("./messages");
const groupRouter = require("./grup");

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/messages", messageRoute);
router.use("/group", groupRouter);

module.exports = router;
