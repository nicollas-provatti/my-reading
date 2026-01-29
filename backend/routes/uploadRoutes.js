import { Router } from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import { uploadCover } from "../controllers/uploadController.js";

const router = Router();

router.post("/cover", upload.single("file"), uploadCover);

export default router;
