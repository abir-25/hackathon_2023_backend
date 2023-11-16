const multer = require("multer");
module.exports.files = {
  storage: function () {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./public/images/business");
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      },
    });

    return storage;
  },
  allowedImages: function (req, file, cb) {
    if (
      !file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|pdf|PDF)$/)
    ) {
      req.fileValidationError =
        "Only jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file types are allowed!";
      return cb(
        new Error(
          "Only jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file types are allowed!"
        )
      );
    }
    cb(null, true);
  },
  maxFileSize: 2 * 1000 * 1000,
};
