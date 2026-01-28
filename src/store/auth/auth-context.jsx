/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import * as authService from "../../services/authService";

export const AuthContext = createContext({
  token: "",
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAuthenticated: false,
  isAuthenticating: false,
  authError: null,
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState(null);

  async function handleLogin(email, password) {
    try {
      setIsAuthenticating(true);
      setAuthError(null);

      const data = await authService.login(email, password);
      localStorage.setItem("token", data.token);
      setToken(data.token);
    } catch (error) {
      setAuthError(error.message || "Erro ao fazer login");
    } finally {
      setIsAuthenticating(false);
    }
  }

  async function handleRegister(email, password, passwordConfirm) {
    try {
      setIsAuthenticating(true);
      setAuthError(null);

      await authService.register(email, password, passwordConfirm);
    } catch (error) {
      setAuthError(error.message || "Erro ao criar conta");
    } finally {
      setIsAuthenticating(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const isAuthenticated = !!token;

  const ctxValue = {
    token,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    isAuthenticated,
    isAuthenticating,
    authError,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
