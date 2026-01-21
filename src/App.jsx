import Header from "./components/Header";
import Main from "./components/Main";
import ContextFilterProvider from "./store/filter-context";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <ContextFilterProvider>
        <Main />
      </ContextFilterProvider>
      <Footer />
    </>
  );
}

export default App;
