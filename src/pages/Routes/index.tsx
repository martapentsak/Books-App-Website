import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";

import { menuElemenets } from "../../constants/textValues";

export const AllRoutes = () => {
  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path="book/:bookId" element={<BookPage />} />
        </Routes>
      </div>
    </div>
  );
};
