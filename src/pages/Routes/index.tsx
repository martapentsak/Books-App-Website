import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { PageLayout } from "../PageLayout";

import { menuElemenets } from "../../constants/textValues";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

export const AllRoutes = () => {
  const { poetsList, authorsList } = useAuthors();
  const { booksList } = useBooks();

  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route
            path={menuElemenets.links.authors}
            element={<PageLayout listArray={authorsList} isAuthorCard />}
          />
          <Route
            path={menuElemenets.links.poets}
            element={<PageLayout listArray={poetsList} isAuthorCard />}
          />
          <Route
            path={menuElemenets.links.bookStore}
            element={<PageLayout listArray={booksList} isAuthorCard={false} />}
          />
        </Routes>
      </div>
    </div>
  );
};
