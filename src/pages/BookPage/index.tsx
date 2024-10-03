import { useNavigate, useLocation } from "react-router";

import { useWishlist } from "../../context/wishlist";

import { Button } from "@mui/material";
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

export const BookPage = () => {
  const { handleAddBookToWishlist, wishList } = useWishlist();
  const { booksList } = useBooks();

  const navigate = useNavigate();
  const location = useLocation();

  const currentBook =
    booksList &&
    booksList.find(
      (book) =>
        book.title.replace(/ /g, "") === location.pathname.replace("/", "")
    );
  if (!currentBook) {
    return null;
  }
  const { title, coverImage, author, publicationYear, description, genres } =
    currentBook;

  const handleGetOtherBookOfAuthor = () =>
    booksList.filter(
      (b) => b.author === currentBook.author && b.title !== currentBook.title
    );

  const handleGetOtherBooksOfEachGenre = () => {
    const currentBookGenres = currentBook.genres;
    return booksList.filter((book) => {
      return book.genres
        .filter(
          (v) =>
            currentBookGenres.includes(v) && book.title !== currentBook.title
        )
        .join("");
    });
  };

  const recommendationBookList = (): Result | undefined => {
    let result: Result = {
      data: [],
      title: "",
    };
    const otherAuthorBooks = handleGetOtherBookOfAuthor();
    const otherGenreBooks = handleGetOtherBooksOfEachGenre();
    if (otherAuthorBooks) {
      result.data = otherAuthorBooks;
      result.title = `Other works of ${currentBook.author}`;
    }
    if (otherGenreBooks) {
      result.data = otherGenreBooks;
      result.title = `Other works in genres ${currentBook.genres.join(", ")}`;
    }
    return result;
  };

  const isBookInWishList = wishList.find((v) => v.title === title);

  return (
    <div className="book-page">
      <div className="wrapper">
        <div className="book-cover-section">
          <img src={coverImage} alt={`${title} cover`} className="book-cover" />
        </div>
        <div className="book-info-section">
          <h2 className="book-name">{title}</h2>
          <div
            className="book-author"
            onClick={() => navigate(`/${author.replace(/ /g, "")}`)}
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
          <div className="book-genre">
            Genre:{" "}
            <div className="genre-list">
              {genres.map((g, index) => (
                <span className="book-category" key={index}>
                  {g}
                  {index < genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          <div className="author-works">
            <h3 className="other-books-title">{recommendationBookList()?.title}</h3>
            <div className="other-books-list">
              {recommendationBookList()?.data?.map(({ coverImage, title }, index) => (
                <div
                  className="other-books-section"
                  key={index}
                  onClick={() => navigate(`/${title.replace(/ /g, "")}`)}
                >
                  <img
                    src={coverImage}
                    alt={title}
                    className="other-book-image"
                  />
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
