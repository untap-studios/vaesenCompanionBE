import { uploadImage } from "../controllers/uploadController.mjs";
import { Router } from "express";
import formidable from "express-formidable";
import { v2 as cloudinary } from "cloudinary";

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// router.use(formidable());

router.post("/", formidable(), uploadImage);

export default router;
