import { useNavigate, useParams } from "react-router";

import { Loading } from "../../components/Loading";
import { AlertWindow } from "../../components/Alert";

import { useWishlist } from "../../context/wishlist";
import { useBooks } from "../../context/books";
import { useAuthors } from "../../context/authors";

import { Button } from "@mui/material";
import { NotFound } from "../../components/NotFound";
import { BookProp } from "../../types/AuthorBookType";
import { ListSection } from "../../components/ListSection";
import { Card } from "../../components/Card";

type Result = {
  data: BookProp[];
  blockTitle: string;
};

export const BookPage = () => {
  const {
    handleAddBookToWishlist,
    wishList,
    wishlistError,
    handleCloseWishlistError,
  } = useWishlist();
  const { booksList, bookListError, handleCloseBooksError, booksLoading } =
    useBooks();
  const { authorsList } = useAuthors();

  const navigate = useNavigate();
  const { bookId } = useParams();

  const currentBook = booksList.find((book) => book.id === bookId);

  if (booksLoading) {
    return <Loading />;
  }

  if (!currentBook) {
    return <NotFound />;
  }

  const { title, image, author, publicationYear, description, genres } =
    currentBook;

  const handleGetRecommendationBookList = (): Result => {
    const otherAuthorBooks = booksList.filter(
      (b) => b.author === author && b.title !== title
    );
    const othergenresBooks = booksList.filter((book) =>
      book.genres.some((genre) => genres.includes(genre) && book.id !== bookId)
    );
    return {
      data: otherAuthorBooks.length > 0 ? otherAuthorBooks : othergenresBooks,
      blockTitle:
        otherAuthorBooks.length > 0
          ? `Other works of ${name}`
          : `Other works in genres ${genres.join(", ")}`,
    };
  };

  const isBookInWishList = wishList.find((v) => v.id === bookId);

  const { data, blockTitle } = handleGetRecommendationBookList();

  const authorId = authorsList.find((a) => a.name === author)?.id;

  return (
    <div className="book-page">
      {bookListError ||
        (wishlistError && (
          <AlertWindow
            error={bookListError || wishlistError}
            onClose={
              bookListError ? handleCloseBooksError : handleCloseWishlistError
            }
          />
        ))}
      <div className="wrapper">
        <div className="book-cover-section">
          <img src={image} alt={`${title} cover`} className="book-cover" />
        </div>
        <div className="book-info-section">
          <h2 className="book-name">{title}</h2>
          <div
            className="book-author"
            onClick={() => navigate(`/author/${authorId}`)}
          >
            {author}
          </div>
          <Button
            className="add-to-wishlist-btn"
            onClick={() => handleAddBookToWishlist(currentBook)}
          >
            {isBookInWishList ? "Remove from wishlist" : "Want to read"}
          </Button>
          <div className="book-describtion">{description}</div>
          <div className="book-publication">
            Publication year:{" "}
            <span className="publication-year">{publicationYear}</span>
          </div>
          <div className="book-genres">
            genres:{" "}
            <div className="genres-list">
              {genres.map((g, index) => (
                <span className="book-category" key={index}>
                  {g}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="author-works">
            <ListSection title={blockTitle} listWrap={false}>
              {data.map(({ title, genres, image, id }, index) => (
                <Card
                  key={index}
                  className="recommendation-item"
                  name={title}
                  cardList={genres}
                  image={image}
                  onClick={() => navigate(`/book/${id}`)}
                />
              ))}
            </ListSection>
          </div>
        </div>
      </div>
    </div>
  );
};
