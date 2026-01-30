import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FilterContextProvider from "./store/filter-context";
import AuthContextProvider from "./store/auth/auth-context";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-screen flex flex-col">
        <FilterContextProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Header />
                  <Main />
                </PrivateRoute>
              }
            ></Route>
          </Routes>
        </FilterContextProvider>

        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default App;
