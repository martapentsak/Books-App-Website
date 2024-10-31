import { useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";

import { useWishlist } from "../../context/wishlist";

import { routes, wishListPage } from "../../constants/textValues";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";

export const WishList = () => {
  const {
    wishList,
    handleRemoveBookFromWishlist,
    loading,
    error,
    handleCloseWishlistError,
  } = useWishlist();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wishlist-page">
      {error && <Alert error={error} onClose={handleCloseWishlistError} />}
      <div className="wishlist-wrapper">
        {wishList.length ? (
          wishList.map(
            ({
              image,
              title,
              author,
              genres,
              description,
              publicationYear,
              id,
            }) => (
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
            )
          )
        ) : (
          <div className="empty-wishlist-section">
            <span className="empty-wishlist">{wishListPage.message}</span>
            <Button
              className="navigate-bookstore-btn"
              onClick={() => navigate(routes.bookStore)}
            >
              {wishListPage.btn}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
