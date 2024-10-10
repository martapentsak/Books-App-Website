import { useNavigate, useParams } from "react-router";

import { useWishlist } from "../../context/wishlist";

import { Button } from "@mui/material";
import { useBooks } from "../../context/books";
import { AlertWindow } from "../../components/Alert";
import { useAuthors } from "../../context/authors";
import { Loading } from "../../components/Loading";
import { NotFound } from "../../components/NotFound";

type BookProp = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  publicationYear: number;
  image: string;
  description: string;
};

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
          ? `Other works of ${author}`
          : `Other works in genres ${genres.join(", ")}`,
    };
  };

  const isBookInWishList = wishList.find((v) => v.id === bookId);

  const { data, blockTitle } = handleGetRecommendationBookList();

  const authorId = authorsList.find((a) => a.author === author)?.id;

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
            <h3 className="other-books-title">{blockTitle}</h3>
            <div className="other-books-list">
              {data.map(({ image, title, id }, index) => (
                <div
                  className="other-books-section"
                  key={index}
                  onClick={() => navigate(`/book/${id}`)}
                >
                  <img src={image} alt={title} className="other-book-image" />
                  <span className="book-name">{title}</span>
                  <div className="genres">
                    {genres.map((g, index) => (
                      <span className="book-category" key={index}>
                        {g}
                        {index < genres.length - 1 ? ", " : " "}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
