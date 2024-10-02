import { Routes, Route, useLocation } from "react-router-dom";

import { Menu } from "../../components/Menu";

import { HomePage } from "../HomePage";
import { LoadingPage } from "../LoadingPage";
import { BookPage } from "../BookPage";

import { menuElemenets } from "../../constants/textValues";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

type BookProp = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  publicationYear: number;
  coverImage: string;
  description: string;
};

type Result = {
  data: BookProp[];
  title: string;
};

export const AllRoutes = () => {
  const { loading: authorLoading } = useAuthors();
  const { loading: booksLoading, booksList } = useBooks();
  const location = useLocation();

  const currentBook =
    booksList &&
    booksList.find(
      (book) =>
        book.title.replace(/ /g, "") === location.pathname.replace("/", "")
    );

  const otherBooksList = (): Result | undefined => {
    let result: Result = {
      data: [],
      title: "",
    };
    let array: BookProp[] = [];
    if (currentBook && booksList) {
      const currentAuthorBooks = booksList.filter(
        (b) => b.author === currentBook.author && b.title !== currentBook.title
      );
      const currentBookGenres = currentBook.genres;

      array = booksList.filter((book) => {
        return book.genres
          .filter(
            (v) =>
              currentBookGenres.includes(v) && book.title !== currentBook.title
          )
          .join("");
      });
      if (currentAuthorBooks.length > 0) {
        result.data = currentAuthorBooks;
        result.title = `Other works of ${currentBook.author}`;
      } else {
        result.data = array;
        result.title = `Other works in genres ${currentBook.genres.join(", ")}`;
      }
      return result;
    }
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
            {currentBook && booksList && (
              <Route
                path={location.pathname}
                element={
                  <BookPage
                    book={currentBook}
                    list={otherBooksList()?.data}
                    blockTitle={otherBooksList()?.title}
                  />
                }
              />
            )}
          </Routes>
        </div>
      )}
    </div>
  );
};
