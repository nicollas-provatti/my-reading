import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth/use-auth";
import ButtonSpinner from "../components/UI/ButtonSpinner";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const { register, isAuthenticating } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(email, password, passwordConfirm);
      alert("Conta criada com sucesso! Faça login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-zinc-800 text-center">
          Criar conta
        </h1>

        <input
          type="email"
          placeholder="Email"
          required
          autoComplete="username"
          className="px-4 py-2 border rounded-lg"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          required
          autoComplete="username"
          className="px-4 py-2 border rounded-lg"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirme sua senha"
          required
          autoComplete="current-password"
          className="px-4 py-2 border rounded-lg"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <button
          type="submit"
          className="flex justify-center items-center gap-3 mt-2 bg-green-600 text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-green-700 transition-colors"
        >
          {isAuthenticating ? (
            <>
              <ButtonSpinner />
              Criando conta...
            </>
          ) : (
            "Criar conta"
          )}
        </button>

        <p className="text-sm text-center text-zinc-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}
