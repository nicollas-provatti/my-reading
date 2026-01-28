import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { findUserByEmail, createUser } from "../services/userService.js";

export async function register(req, res) {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (!email || !password || !passwordConfirm) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res
        .status(409)
        .json({ field: "email", message: "Usuário já existe" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ field: "password", message: "Senha muito curta" });
    }

    if (password !== passwordConfirm) {
      return res
        .status(400)
        .json({ field: "password", message: "As senhas não coincidem" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await createUser({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios" });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res
        .status(401)
        .json({ field: "email", message: "Email inválido" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ field: "password", message: "Senha inválida" });
    }

    const token = generateToken({ userId: user.id });

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
}
