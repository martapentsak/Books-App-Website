import { useNavigate } from "react-router-dom";

import { useWishlist } from "../../context/wishlist";

import DeleteIcon from "@mui/icons-material/Delete";
import { Book } from "../../types/AuthorBookType";

type Prop = {
  wishListElement: Book;
};

export const WishListElement = ({
  wishListElement: {
    id,
    image,
    title,
    author,
    publicationYear,
    description,
    genres,
  },
}: Prop) => {
  const { handleRemoveBookFromWishlist } = useWishlist();
  const navigate = useNavigate();

  return (
    <div className="wishlist-element">
      <div
        className="wishlist-info-section"
        onClick={() => navigate(`/book/${id}`)}
      >
        <img src={image} className="wishlist-image" />
        <div className="wishlist-info">
          <h3 className="wishlist-name">{title}</h3>
          <h4 className="wishlist-author">{author}</h4>
          <h4 className="wishlist-year">{publicationYear}</h4>
          <p className="wishlist-description">{description}</p>
          {genres.map((g, index) => (
            <span className="card-list-item" key={index}>
              {g}
              {index < genres.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
      <i
        className="delete-btn"
        onClick={() => handleRemoveBookFromWishlist(id)}
      >
        <DeleteIcon />
      </i>
    </div>
  );
};
