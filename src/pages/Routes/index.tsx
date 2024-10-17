import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";

import { menuElemenets } from "../../constants/textValues";
import { AuthorPage } from "../AuthorPage";

export const AllRoutes = () => {
  return (
    <div className="books-app">
     <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path="book/:bookId" element={<BookPage />} />
          <Route path="author/:authorId" element={<AuthorPage />} />


        </Routes>
      </div>
    </div>
  );
};
