/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import * as authService from "../../services/authService";

export const AuthContext = createContext({
  token: "",
  login: async () => {},
  logout: () => {},
  register: async () => {},
  isAuthenticated: false,
});

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  async function handleLogin(email, password) {
    const data = await authService.login(email, password);
    localStorage.setItem("token", data.token);
    setToken(data.token);
  }

  async function handleRegister(email, password, passwordConfirm) {
    await authService.register(email, password, passwordConfirm);
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
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
