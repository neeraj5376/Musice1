const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    let uploadPath;

    if (file.fieldname === "image") {
      uploadPath = path.join(__dirname, "../uploads/images");
    } else {
      uploadPath = path.join(__dirname, "../uploads/songs");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },

  fileFilter: (req, file, cb) => {

    if (file.fieldname === "image") {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"));
      }
    }

    if (file.fieldname === "audio") {
      if (!file.mimetype.startsWith("audio/")) {
        return cb(new Error("Only audio files are allowed"));
      }
    }

    cb(null, true);
  },
});

module.exports = upload;