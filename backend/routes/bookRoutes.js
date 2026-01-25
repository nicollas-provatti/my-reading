import express from "express";
import { getAllBooks, saveBooks } from "../services/bookService.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const books = await getAllBooks();
    const userBooks = books.filter((book) => book.userId === userId);
    res.json(userBooks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar livros" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBook = {
      ...req.body,
      id: crypto.randomUUID(),
      userId: req.userId,
    };

    const books = await getAllBooks();
    books.push(newBook);

    await saveBooks(books);

    res.status(201).json(newBook);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao salvar livro" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const books = await getAllBooks();
    const filteredBooks = books.filter(
      (book) => !(book.id === id && book.userId === userId),
    );

    const bookExists = books.some(
      (book) => book.id === id && book.userId === userId,
    );

    if (!bookExists) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    await saveBooks(filteredBooks);

    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao deletar livro" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = req.body;
    const userId = req.userId;

    const books = await getAllBooks();

    const bookIndex = books.findIndex(
      (book) => book.id === id && book.userId === userId,
    );

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    books[bookIndex] = {
      ...updatedBook,
      id,
      userId,
    };

    await saveBooks(books);

    res.json(books[bookIndex]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao editar livro" });
  }
});

export default router;
