import Header from "./components/Header";
import Main from "./components/Main";
import ContextProvider from "./store/filter-context";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <ContextProvider>
        <Main />
      </ContextProvider>
      <Footer />
    </>
  );
}

export default App;
