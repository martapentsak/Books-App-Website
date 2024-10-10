import { useState } from "react";

import { Loading } from "../../components/Loading";
import { AlertWindow } from "../../components/Alert";
import { NotFound } from "../../components/NotFound";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { homepage } from "../../constants/textValues";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate()

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
        <div className="poets-list">
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
          <div className="list-section">
            <h2 className="list-section-title ">{homepage.works}</h2>
            {poetsList[selectedPoetIndex].works?.map((value, index) => (
              <div key={index} className="work-element">
                <span className="work-number">{index + 1}</span>
                <p className="work-name">{value}</p>
                <span className="author" onClick={() => navigate(`/author/${poetsList[selectedPoetIndex].id}`)}>
                  {poetsList[selectedPoetIndex].author}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="authors-books-section">
      <ListSection title={homepage.popularWriter} data={authorsList} className="author-card" onClick={(id: string) => navigate(`/author/${id}`)} blockClassname="flex-list" />
      <ListSection title={homepage.popularBook} data={booksList} className="book-card" onClick={(id: string) => navigate(`/book/${id}`)} blockClassname="flex-wrap-list"/>
        
        <div className="popular-writers">

        </div>
      </div>
    </div>
  );
};
