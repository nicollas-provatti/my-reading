import { useState } from "react";
import { useAuth } from "../store/auth/use-auth";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-zinc-800 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
        <p className="text-sm text-center text-zinc-600">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
        </p>
      </form>
    </div>
  );
}

/*     
    
async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert("Credenciais inválidas");
      return;
    }

    const data = await response.json(); 
    login(data.token);
    navigate("/");
  }
    */
