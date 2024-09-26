import { BrowserRouter } from "react-router-dom";

import { AuthorProvider } from "./context/authors";
import { BooksProvider } from "./context/books";

import { composeProviders } from "./utils/composeProviders";

import "./App.css";
import "./styles/global.scss";

import { AllRoutes } from "./pages/Routes";

const providers = [BrowserRouter, AuthorProvider, BooksProvider];

const CombinedProviders = composeProviders(providers);

function App() {
  return (
    <div className="books-app">
      <CombinedProviders>
        <AllRoutes />
      </CombinedProviders>
    </div>
  );
}

export default App;
