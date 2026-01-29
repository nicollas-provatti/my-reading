import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
