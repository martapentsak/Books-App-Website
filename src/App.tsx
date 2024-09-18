import { BrowserRouter } from "react-router-dom";

import { RoutesPage } from "./pages/Routes/index.tsx";

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
            <RoutesPage />
          </BooksProvider>
        </AuthorProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
