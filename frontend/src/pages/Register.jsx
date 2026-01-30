import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../store/auth/use-auth";
import ButtonSpinner from "../components/UI/ButtonSpinner";
import AuthErrorMessage from "../components/UI/AuthErrorMessage";
import EmailInput from "../components/UI/daisyUI/EmailInput";
import PasswordInput from "../components/UI/daisyUI/PasswordInput";
import Toast from "../components/UI/Toast";

export default function Register() {
  const [toast, setToast] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { register, isAuthenticating, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    clearAuthError();
  }, []);

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfirmRef.current.value;

      await register(email, password, passwordConfirm);

      setToast({
        message: "Conta criada com sucesso! Faça login.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch {}
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex-1 flex items-center justify-center px-6 bg-zinc-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
        >
          <h1 className="text-2xl font-semibold text-zinc-800 text-center">
            Crie a sua conta
          </h1>

          <div>
            <EmailInput ref={emailRef} />

            {authError?.field === "email" && (
              <AuthErrorMessage text={authError.message} />
            )}
          </div>

          <div>
            <div className="flex flex-col gap-4">
              <PasswordInput placeholder="Senha" ref={passwordRef} />

              <PasswordInput
                placeholder="Confirma sua senha"
                ref={passwordConfirmRef}
              />
            </div>

            {authError?.field === "password" && (
              <AuthErrorMessage text={authError.message} />
            )}
          </div>

          <button
            type="submit"
            disabled={isAuthenticating}
            className="flex justify-center items-center gap-3 bg-green-600 text-white py-2 rounded-lg font-medium cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-60"
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
            <Link to="/" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
