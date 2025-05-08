import "./styles/app.scss";
import Header from "./components/Header/Header";
import IngredientInput from "./components/IngredientInput/IngredientInput";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <Header />
      </header>
      <main className="main-content">
        <IngredientInput />
      </main>
      <Footer />
    </div>
  );
}

export default App;
