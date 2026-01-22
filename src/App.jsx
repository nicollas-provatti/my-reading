import Header from "./components/Header";
import Main from "./components/Main";
import ContextFilterProvider from "./store/filter-context";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ContextFilterProvider>
        <Main />
      </ContextFilterProvider>
      <Footer />
    </div>
  );
}

export default App;
