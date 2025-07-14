// // src/middleware/upload.js
// import multer from "multer";
// import path from "path";

// // Storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads");
//   },
//   filename: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     const filename = `${Date.now()}-${file.fieldname}${ext}`;
//     cb(null, filename);
//   },
// });

// // File filter (optional)
// const fileFilter = function (req, file, cb) {
//   if (file.mimetype.startsWith("image/")) cb(null, true);
//   else cb(new Error("Only images are allowed"), false);
// };

// // Multer instance
// const upload = multer({ storage, fileFilter });

// export default upload;

// middleware/upload.js
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "writeflow", // Your project folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 700, crop: "limit" }],
  },
});

const upload = multer({ storage });

export default upload;
