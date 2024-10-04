import { Routes, Route, useLocation } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";

import { menuElemenets } from "../../constants/textValues";

export const AllRoutes = () => {
  const location = useLocation();

  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path={location.pathname} element={<BookPage />} />
        </Routes>
      </div>
    </div>
  );
};
