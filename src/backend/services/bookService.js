import { readFile, writeFile } from "fs/promises";
import path from "path";

const dataPath = path.resolve("data/books.json");

export async function getAllBooks() {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data = await readFile(dataPath, "utf-8");
  return JSON.parse(data);
}

export async function saveBooks(books) {
  await writeFile(dataPath, JSON.stringify(books, null, 2));
}
