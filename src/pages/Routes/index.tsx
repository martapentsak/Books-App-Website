import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";
import { HomePage } from "../HomePage";
import { BookPage } from "../BookPage";
import { AuthorPoetPage } from "../AuthorPoetPage";
import { WishList } from "../WishList";
import { AuthorsPoetsListPage } from "../AuthorsListPage";

import { BookListPage } from "../BookListPage";

import { link } from "../../constants/textValues";

export const AllRoutes = () => {
  return (
    <div className="books-app">
      <div>
        <Menu />
        <Routes>
          <Route path={link.home} element={<HomePage />} />
          <Route path={link.curentBook} element={<BookPage />} />
          <Route
            path={link.currentAuthor}
            element={<AuthorPoetPage isPoetPage={false} />}
          />
          <Route
            path={link.currentPoet}
            element={<AuthorPoetPage isPoetPage />}
          />
          <Route
            path={link.authors}
            element={<AuthorsPoetsListPage isPoetPage={false} />}
          />
          <Route
            path={link.poets}
            element={<AuthorsPoetsListPage isPoetPage />}
          />
          <Route path={link.bookStore} element={<BookListPage />} />
          <Route path={link.wishList} element={<WishList />} />
        </Routes>
      </div>
    </div>
  );
};
