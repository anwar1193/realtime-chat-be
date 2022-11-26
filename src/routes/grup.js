const express = require("express");
const router = express.Router();
const { createGrup, getAllGrup } = require("../controller/grup");

router.post("/create", createGrup);
router.get("/", getAllGrup);

module.exports = router;
