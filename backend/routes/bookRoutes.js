import express from "express";
import { getAllBooks, saveBooks } from "../services/bookService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.json(books);
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

    const books = await getAllBooks();
    const filteredBooks = books.filter((book) => book.id !== id);

    if (books.length === filteredBooks.length) {
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

    const books = await getAllBooks();

    const bookIndex = books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      return res.status(404).json({ error: "Livro não encontrado" });
    }

    books[bookIndex] = {
      ...updatedBook,
      id,
    };

    await saveBooks(books);

    res.json(books[bookIndex]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao editar livro" });
  }
});

export default router;
