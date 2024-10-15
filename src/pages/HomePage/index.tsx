import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { AlertWindow } from "../../components/Alert";
import { NotFound } from "../../components/NotFound";
import { PoetsList } from "../../components/PoetsList";
import { ListSection } from "../../components/ListSection";
import { AuthorWorks } from "../../components/AuthorWorks";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { homepage } from "../../constants/textValues";

export const HomePage = () => {
  const [selectedPoetIndex, setSelectedPoetIndex] = useState<number>(0);
  const {
    authorsList,
    poetsList,
    authorListError,
    handleCloseAuthorsError,
    authorLoading,
  } = useAuthors();
  const { booksList, bookListError, handleCloseBooksError, booksLoading } =
    useBooks();
  const navigate = useNavigate();

  const errorExist = authorListError || bookListError;

  if (authorLoading || booksLoading) {
    return <Loading />;
  }

  if (!poetsList[selectedPoetIndex]) {
    return <NotFound />;
  }

  return (
    <div className="home-page">
      <div className="alert-section">
        {errorExist && (
          <AlertWindow
            error={errorExist}
            onClose={() =>
              bookListError
                ? handleCloseBooksError()
                : handleCloseAuthorsError()
            }
          />
        )}
      </div>
      <div className="poets-section">
        <div className="selected-poet-section">
          <p className="selected-poet-title">{homepage.postContainerTitle}</p>
          {poetsList[selectedPoetIndex] && (
            <img
              src={poetsList[selectedPoetIndex].image}
              className="selected-poet-image"
            />
          )}
        </div>
        <PoetsList
          data={poetsList}
          selectedPoetIndex={selectedPoetIndex}
          onClick={(index) => setSelectedPoetIndex(index)}
        />
        <AuthorWorks
          works={poetsList[selectedPoetIndex].works}
          title={homepage.works}
          author={poetsList[selectedPoetIndex]}
        />
      </div>
      <div className="authors-books-section">
        <ListSection
          title={homepage.popularWriter}
          data={authorsList}
          className="author-card"
          onCardClick={(id: string) => navigate(`/author/${id}`)}
          listCardClassname="flex-list"
        />

        <ListSection
          title={homepage.popularBook}
          data={booksList}
          className="book-card"
          onCardClick={(id: string) => navigate(`/book/${id}`)}
          listCardClassname="flex-wrap-list"
        />
      </div>
    </div>
  );
};
