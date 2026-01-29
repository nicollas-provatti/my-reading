import cloudinary from "../config/cloudinary.js";

export async function uploadCover(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Arquivo não enviado" });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "covers",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      ).end(req.file.buffer);
    });

    return res.status(201).json({
      url: result.secure_url,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      message: "Erro ao fazer upload da imagem",
    });
  }
}
