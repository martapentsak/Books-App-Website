import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Menu } from "./components/Menu";
import { HomePage } from "./pages/HomePage";

import { menuElemenets } from "./constants/textValues";

import { AuthorProvider } from "./context/authors.tsx";
import { BooksProvider } from "./context/books.tsx";

import "./App.css";
import "./styles/global.scss";

function App() {
  return (
    <div className="books-app">
      <BrowserRouter>
        <AuthorProvider>
          <BooksProvider>
            <Menu />
            <Routes>
              <Route path={menuElemenets.links.home} element={<HomePage />} />
            </Routes>
          </BooksProvider>
        </AuthorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
