import { getToken } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function getBooks() {
  const token = getToken();

  const response = await fetch(`${API_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) throw new Error("Erro ao consultar livros.");

  return response.json();
}

export async function addBook(book) {
  const token = getToken();

  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) throw new Error("Erro ao adicionar livro");
  return response.json();
}

export async function deleteBook(id) {
  const token = getToken();

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) throw new Error("Erro ao deletar livro");
}

export async function editBook(id, updatedBook) {
  const token = getToken();

  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (response.status === 401) {
    throw new Error("Não autorizado");
  }

  if (!response.ok) throw new Error("Erro ao editar livro");
  return response.json();
}
