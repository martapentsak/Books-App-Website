import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";
import { AuthorPage } from "../AuthorPage";
import { PageLayout } from "../PageLayout";

import { menuElemenets } from "../../constants/textValues";

export const AllRoutes = () => {
  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path="book/:bookId" element={<BookPage />} />
          <Route path="author/:authorId" element={<AuthorPage />} />
          <Route path={menuElemenets.links.authors} element={<PageLayout />} />
          <Route path={menuElemenets.links.poets} element={<PageLayout />} />
          <Route
            path={menuElemenets.links.bookStore}
            element={<PageLayout />}
          />
        </Routes>
      </div>
    </div>
  );
};
