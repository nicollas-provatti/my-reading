import { useEffect, useRef } from "react";
import { useAuth } from "../store/auth/use-auth";
import { useNavigate, Link } from "react-router-dom";
import ButtonSpinner from "../components/UI/ButtonSpinner";
import AuthErrorMessage from "../components/UI/AuthErrorMessage";
import EmailInput from "../components/UI/daisyUI/EmailInput";
import PasswordInput from "../components/UI/daisyUI/PasswordInput";

export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login, isAuthenticating, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthError();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      await login(email, password);
      navigate("/dashboard");
    } catch {}
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 bg-zinc-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-semibold text-zinc-800 text-center">
          Login
        </h1>

        <div>
          <EmailInput ref={emailRef} />

          {authError?.field === "email" && (
            <AuthErrorMessage text={authError.message} />
          )}
        </div>

        <div>
          <PasswordInput placeholder="Senha" ref={passwordRef} />

          {authError?.field === "password" && (
            <AuthErrorMessage text={authError.message} />
          )}
        </div>

        <button
          type="submit"
          disabled={isAuthenticating}
          className="flex justify-center items-center gap-3 bg-blue-600 text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-blue-700 transition-colors disabled:opacity-60"
        >
          {isAuthenticating ? (
            <>
              <ButtonSpinner />
              Entrando...
            </>
          ) : (
            "Entrar"
          )}
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
