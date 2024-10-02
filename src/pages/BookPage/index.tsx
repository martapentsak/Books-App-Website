import { useNavigate } from "react-router";

import { useWishlist } from "../../context/wishlist";

import { Button } from "@mui/material";

type BookProp = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  publicationYear: number;
  coverImage: string;
  description: string;
};

type Props = {
  book: BookProp;
  list: BookProp[] | undefined;
  blockTitle: string | undefined;
};

export const BookPage = ({ book, list, blockTitle }: Props) => {
  const { title, coverImage, author, publicationYear, description, genres } =
    book;
  const { handleAddBookToWishlist, wishList } = useWishlist();

  const navigate = useNavigate();

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
            onClick={() => handleAddBookToWishlist(book)}
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
            <h3 className="other-books-title">{blockTitle}</h3>
            <div className="other-books-list">
              {list?.map(({ coverImage, title }, index) => (
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
