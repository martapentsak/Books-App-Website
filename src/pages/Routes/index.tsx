import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { AuthorPage } from "../AuthorPage";

import { menuElemenets } from "../../constants/textValues";
import { Loading } from "../../components/Loading";

export const AllRoutes = () => {
  return (
    <div className="books-app">
      <Loading />
      <div>
        <Menu />
        <Routes>
          <Route path={menuElemenets.links.home} element={<HomePage />} />
          <Route path={"author/:authorId"} element={<AuthorPage />} />
        </Routes>
      </div>
    </div>
  );
};
