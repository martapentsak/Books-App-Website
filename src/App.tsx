import { BrowserRouter } from "react-router-dom";

import { AllRoutes } from "./pages/Routes";

import { AuthorProvider } from "./context/authors";
import { BooksProvider } from "./context/books";
import { WishListProvider } from "./context/wishlist";

import { composeProviders } from "./utils/composeProviders";

import "./App.css";
import "./styles/global.scss";


const providers = [BrowserRouter, AuthorProvider, BooksProvider, WishListProvider];

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
