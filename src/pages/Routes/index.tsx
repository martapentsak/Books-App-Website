import { Routes, Route } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { LoadingPage } from "../LoadingPage";
import { PageLayout } from "../PageLayout";

import { menuElemenets } from "../../constants/textValues";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { handleGetGenres } from "../../utils/handleGetGenres";
import { handleGetNationality } from "../../utils/handleGetNationality";
import { handleGetCentuary } from "../../utils/handleGetCentury";

export const AllRoutes = () => {
  const { loading: authorLoading, authorsList, poetsList } = useAuthors();
  const { loading: booksLoading, booksList } = useBooks();

  const selectors = {
    authorPage: [
      {
        label: "Genres",
        name: "genres",
        options: handleGetGenres(authorsList),
      },
      {
        label: "Nationality",
        name: "nationality",
        options: handleGetNationality(authorsList),
      },
    ],
    poetPage: [
      {
        label: "Genres",
        name: "genres",
        options: handleGetGenres(poetsList),
      },
      {
        label: "Nationality",
        name: "nationality",
        options: handleGetNationality(poetsList),
      },
    ],
    booksPage: [
      {
        label: "Genres",
        name: "genres",
        options: handleGetGenres(booksList),
      },
      {
        label: "Century",
        name: "century",
        options: handleGetCentuary(booksList),
      },
    ],
  };

  return (
    <div className="books-app">
      {authorLoading || booksLoading ? (
        <LoadingPage />
      ) : (
        <div>
          <Menu />
          <Routes>
            <Route path={menuElemenets.links.home} element={<HomePage />} />
            <Route
              path={menuElemenets.links.authors}
              element={
                <PageLayout
                  selectorsArray={selectors.authorPage}
                  listArray={authorsList}
                  isAuthorCard={true}
                />
              }
            />
            <Route
              path={menuElemenets.links.poets}
              element={
                <PageLayout
                  selectorsArray={selectors.authorPage}
                  listArray={poetsList}
                  isAuthorCard={true}
                />
              }
            />
            <Route
              path={menuElemenets.links.bookStore}
              element={
                <PageLayout
                  selectorsArray={selectors.booksPage}
                  listArray={booksList}
                  isAuthorCard={false}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  );
};
