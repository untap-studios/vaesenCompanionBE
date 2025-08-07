import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.image;

    if (!file) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "images",
    });

    return res
      .status(200)
      .json({ imageUrl: result.secure_url, fileId: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};
