import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Menu } from "./components/Menu";
import { HomePage } from "./pages/HomePage";

import { menuElemenets } from "./constants/textValues";

import { AuthorProvider } from "./context/authors.tsx";
import { BooksProvider } from "./context/books.tsx";

import { composeProviders } from "./utils/composeProviders.tsx";


import "./App.css";
import "./styles/global.scss";


const providers = [
  { Component: BrowserRouter },
  { Component: AuthorProvider },
  { Component: BooksProvider },
];

const CombinedProviders = composeProviders(providers);

function App() {
  return (
    <div className="books-app">
     <CombinedProviders>
      <div className="books-app">
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
        </Routes>
      </div>
    </CombinedProviders>
    </div>
  );
}

export default App;
