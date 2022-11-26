const multer = require("multer");
const maxSize = 1 * 2024 * 2024;
const path = require("path");
const { failed } = require('../helper/response');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Unsupported Media Type, only jpg, jpeg or png"));
    }
  },
  limits: { fileSize: maxSize },
})


// verify image
const upload = (req, res, next) => {
  const multerSingle = multerUpload.single('photo');
  multerSingle(req, res, (err) => {
    if (err) {
      failed(res, {
        code: 500,
        status: 'error',
        message: err.message,
        error: [],
      });
    } else {
      next();
    }
  });
}

module.exports = upload;
