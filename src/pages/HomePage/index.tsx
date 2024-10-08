import { useState } from "react";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { homepage } from "../../constants/textValues";

import { Loading } from "../../components/Loading";
import { AlertWindow } from "../../components/Alert";
import { ListSection } from "../../components/ListSection";

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

  const currentPoet = poetsList.length > 0 && poetsList[selectedPoetIndex];
  const errorExist = authorListError || bookListError;

  if (authorLoading || booksLoading) {
    return <Loading />;
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
        <div className="selecled-poet-section">
          <p className="selecled-poet-title">{homepage.postContainerTitle}</p>
          {currentPoet && (
            <img src={currentPoet.image} className="selected-poet-image" />
          )}
        </div>
        <div className="flex-list">
          {poetsList.map(({ image, author }, index) => (
            <div
              key={index}
              onClick={() => setSelectedPoetIndex(index)}
              className={
                selectedPoetIndex === index
                  ? "active-poet-section"
                  : "poet-section"
              }
            >
              <img
                key={index}
                src={image}
                alt={author}
                className="poet-image"
              />
              {selectedPoetIndex === index && (
                <span style={{ color: "white" }} className="poet-name">
                  {author}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="works-section">
          <ListSection
            title={homepage.works}
            works={poetsList[selectedPoetIndex]?.works}
            isAuthorCard={false}
            isWorkslist
          />
        </div>
      </div>
      <div className="authors-books-section">
        <ListSection
          title={homepage.popularWriter}
          array={authorsList}
          isAuthorCard
          isWorkslist={false}
        />
        <ListSection
          title={homepage.popularBook}
          array={booksList}
          isAuthorCard={false}
          isWorkslist={false}
        />
      </div>
    </div>
  );
};
