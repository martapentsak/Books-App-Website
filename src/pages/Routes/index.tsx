import { Routes, Route, useLocation } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { AuthorPage } from "../AuthorPage";
import { LoadingPage } from "../LoadingPage";

import { menuElemenets } from "../../constants/textValues";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

export const AllRoutes = () => {
  const { loading: authorLoading, authorsList } = useAuthors();
  const { loading: booksLoading } = useBooks();

  const location = useLocation();
  const currentAuthor =
    authorsList &&
    authorsList.find(
      (v) => v.author.replace(/ /g, "") === location.pathname.replace("/", "")
    );

  return (
    <div className="books-app">
      {authorLoading || booksLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <Menu />
          <Routes>
            <Route path={menuElemenets.links.home} element={<HomePage />} />
            {currentAuthor && (
              <Route
                path={location.pathname}
                element={<AuthorPage authorInfo={currentAuthor} />}
              />
            )}
          </Routes>
        </div>
      )}
    </div>
  );
};
