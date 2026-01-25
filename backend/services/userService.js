import { readFile, writeFile } from "fs/promises";
import path from "path";

const usersFilePath = path.resolve("data/users.json");

export async function getUsers() {
  const data = await readFile(usersFilePath, "utf-8");
  return JSON.parse(data);
}

export async function saveUsers(users) {
  await writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

export async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((user) => user.email === email);
}