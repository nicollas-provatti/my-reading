import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import {
  getUsers,
  saveUsers,
  findUserByEmail,
} from "../services/userService.js";

export async function register(req, res) {
  const { email, password, passwordConfirm } = req.body;

  if (!email || !password || !passwordConfirm) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const userExists = await findUserByEmail(email);
  if (userExists) {
    return res.status(409).json({ message: "Usuário já existe" });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({ message: "As senhas não coincidem" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await getUsers();

  const newUser = {
    id: crypto.randomUUID(),
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  await saveUsers(users);

  return res.status(201).json({ message: "Usuário criado com sucesso" });
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = generateToken({ userId: user.id });

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
