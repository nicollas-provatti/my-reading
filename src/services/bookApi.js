const API_URL = "http://localhost:3001/books";

export async function getBooks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Erro ao buscar livros");
  return response.json();
}

export async function addBook(book) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });

  if (!response.ok) throw new Error("Erro ao adicionar livro");
  return response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) throw new Error("Erro ao deletar livro");
}

export async function editBook(id, updatedBook) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) throw new Error("Erro ao editar livro");
  return response.json();
}