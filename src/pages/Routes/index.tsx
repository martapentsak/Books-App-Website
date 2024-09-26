import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { LoadingPage } from "../LoadingPage";

import { menuElemenets } from "../../constants/textValues";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

export const AllRoutes = () => {
  const { loading: authorLoading } = useAuthors();
  const { loading: booksLoading } = useBooks();

  return (
    <div className="books-app">
      {authorLoading || booksLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <Menu />
          <Routes>
            <Route path={menuElemenets.links.home} element={<HomePage />} />
          </Routes>
        </div>
      )}
    </div>
  );
};
