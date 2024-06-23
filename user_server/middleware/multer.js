import multer from "multer";

// Configure multer for file uploads and handle multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/users");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
