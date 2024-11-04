import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";
import { AuthorPoetPage } from "../AuthorPoetPage";
import { WishList } from "../WishList";
import { AuthorsPoetsListPage } from "../AuthorsListPage";
import { BookListPage } from "../BookListPage";

import { routes } from "../../constants/textValues";

export const AllRoutes = () => {
  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.curentBook} element={<BookPage />} />
          <Route path={routes.currentAuthor} element={<AuthorPoetPage />} />
          <Route
            path={routes.currentPoet}
            element={<AuthorPoetPage isPoetPage />}
          />
          <Route path={routes.authors} element={<AuthorsPoetsListPage />} />
          <Route
            path={routes.poets}
            element={<AuthorsPoetsListPage isPoetPage />}
          />
          <Route path={routes.bookStore} element={<BookListPage />} />
          <Route path={routes.wishList} element={<WishList />} />
        </Routes>
      </div>
    </div>
  );
};
