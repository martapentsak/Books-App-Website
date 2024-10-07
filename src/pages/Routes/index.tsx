import { Routes, Route, useLocation } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { AuthorPage } from "../AuthorPage";

import { menuElemenets } from "../../constants/textValues";
import { Loading } from "../../components/Loading";

export const AllRoutes = () => {
  const location = useLocation();

  return (
    <div className="books-app">
      <Loading />
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path={location.pathname} element={<AuthorPage />} />
        </Routes>
      </div>
    </div>
  );
};
