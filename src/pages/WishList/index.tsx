import { useNavigate } from "react-router-dom";

import { Loading } from "../../components/Loading";
import { Alert } from "../../components/Alert";
import { WishListElement } from "../../components/WishListElement";

import { useWishlist } from "../../context/wishlist";

import { routes, wishListPage } from "../../constants/textValues";

import { Button } from "@mui/material";

export const WishList = () => {
  const { wishList, loading, error, handleCloseWishlistError } = useWishlist();
  const navigate = useNavigate();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="wishlist-page">
      {error && <Alert error={error} onClose={handleCloseWishlistError} />}
      <div className="wishlist-wrapper">
        {wishList.length ? (
          wishList.map((element) => (
            <WishListElement wishListElement={element} />
          ))
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
