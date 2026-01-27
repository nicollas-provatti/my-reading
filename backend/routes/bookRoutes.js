import express from "express";
import {
  getBooksByUser,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const books = await getBooksByUser(req.userId);
    res.json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar livros" });
  }
});

router.post("/", async (req, res) => {
  try {
    const book = await createBook(req.userId, req.body); 
    console.log(book);
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao criar livro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteBook(req.userId, req.params.id);
    console.log(result);

    if (result.count === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao deletar livro" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const result = await updateBook(
      req.userId,
      req.params.id,
      req.body
    );

    if (result.count === 0) {
      return res.status(404).json({ message: "Livro não encontrado" });
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao atualizar livro" });
  }
});

export default router;
