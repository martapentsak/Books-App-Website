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
import { Card } from "../../components/Card";

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

  const selectedPoet = poetsList[selectedPoetIndex];

  if (authorLoading || booksLoading) {
    return <Loading />;
  }

  if (!selectedPoet) {
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
          {selectedPoet && (
            <img src={selectedPoet.image} className="selected-poet-image" />
          )}
        </div>
        <PoetsList
          poets={poetsList}
          selectedPoetIndex={selectedPoetIndex}
          onClick={(index) => setSelectedPoetIndex(index)}
        />
        <AuthorWorks
          works={selectedPoet.works}
          title={homepage.works}
          author={selectedPoet}
        />
      </div>
      <div className="authors-books-section">
        <ListSection title={homepage.popularWriter} listWrap={false}>
          {authorsList.map(({ name, genres, image, id }, index) => (
            <Card
              key={index}
              className="author-card"
              name={name}
              cardList={genres}
              image={image}
              onClick={() => navigate(`/author/${id}`)}
            />
          ))}
        </ListSection>
        <ListSection title={homepage.popularBook} listWrap>
          {booksList.map(({ author, title, genres, image, id }, index) => (
            <Card
              key={index}
              className="author-card"
              name={title}
              subtitle={author}
              cardList={genres}
              image={image}
              onClick={() => navigate(`/book/${id}`)}
            />
          ))}
        </ListSection>
      </div>
    </div>
  );
};
