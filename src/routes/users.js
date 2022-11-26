const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  getAll,
  updatePhoto,
  updateName,
  updateShortName,
  updateBio,
  updatePhone,
  getById,
  dltUser,
} = require("../controller/users");

router
  .get("/", getAll)
  .get("/:id", getById)
  .post("/edit/:id", upload, updatePhoto)
  .post("/edit-name/:id", updateName)
  .post("/edit-shortname/:id", updateShortName)
  .post("/edit-bio/:id", updateBio)
  .post("/edit-phone/:id", updatePhone)
  .delete("/:id", dltUser);

module.exports = router;
