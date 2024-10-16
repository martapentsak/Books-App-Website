import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { NotFound } from "../../components/NotFound";
import { ListSection } from "../../components/ListSection";
import { AuthorWorks } from "../../components/AuthorWorks";

import { useAuthors } from "../../context/authors";
import { useBooks } from "../../context/books";

import { homepage } from "../../constants/textValues";
import { Card } from "../../components/Card";
import { PoetList } from "../../components/PoetsList";

export const HomePage = () => {
  const [selectedPoetIndex, setSelectedPoetIndex] = useState<number>(0);
  const {
    authors,
    poets,
    error: authorListError,
    handleCloseAuthorsError,
    loading: authorLoading,
  } = useAuthors();
  const {
    books,
    error: bookListError,
    handleCloseBooksError,
    loading: booksLoading,
  } = useBooks();
  const navigate = useNavigate();

  const errorExist = authorListError || bookListError;

  const selectedPoet = poets[selectedPoetIndex];

  if (authorLoading || booksLoading) {
    return <Loading />;
  }

  if (!selectedPoet) {
    return <NotFound />;
  }

  return (
    <div className="home-page">
      {errorExist && (
        <Alert
          error={errorExist}
          onClose={() =>
            bookListError ? handleCloseBooksError() : handleCloseAuthorsError()
          }
        />
      )}

      <div className="poets-section">
        <div className="selected-poet-section">
          <p className="selected-poet-title">{homepage.postContainerTitle}</p>

          <img src={selectedPoet.image} className="selected-poet-image" />
        </div>
        <PoetList
          poets={poets}
          selectedPoetIndex={selectedPoetIndex}
          onClick={setSelectedPoetIndex}
        />
        <AuthorWorks title={homepage.works} author={selectedPoet} />
      </div>
      <div className="authors-books-section">
        <ListSection title={homepage.popularWriter} wrap={false}>
          {authors.map(({ name, genres, image, id }, index) => (
            <Card
              key={index}
              className="author-card"
              title={name}
              items={genres}
              image={image}
              onClick={() => navigate(`/author/${id}`)}
            />
          ))}
        </ListSection>
        <ListSection title={homepage.popularBook} wrap>
          {books.map(({ author, genres, id, ...others }, index) => (
            <Card
              key={index}
              className="book-card"
              subtitle={author}
              items={genres}
              {...others}
              onClick={() => navigate(`/book/${id}`)}
            />
          ))}
        </ListSection>
      </div>
    </div>
  );
};
