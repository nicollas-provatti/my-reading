import express from "express";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
