
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


import { errors } from "../constants/textValues";
import { Book } from "../types/AuthorBookType";

type ProviderValues = {
  wishList: Book[];
  loading: boolean;
  error: string;
  handleAddBookToWishlist: (book: Book) => void;
  handleCloseWishlistError: () => void;
  handleRemoveBookFromWishlist: (bookId: string) => void;
};

type Props = {
  children: ReactNode;
};

export const WishlistContext = createContext({} as ProviderValues);

export const WishListProvider = ({ children }: Props) => {
  const [wishList, setWishList] = useState<Book[]>([]);

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    try {
      const wishList = localStorage.getItem("wishlist");
      wishList ? JSON.parse(wishList) : [];
      setWishList(wishList ? JSON.parse(wishList) : []);
    } catch {
      setError(errors.getWishList);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveBookFromWishlist = (bookId: string) => {
    setWishList((prev) => {
      const updated = prev.filter((v) => v.id !== bookId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleAddBookToWishlist = (book: Book) => {
    setWishList((prev) => {
      const exists = prev.find((v) => v.title === book.title);
      let updated: Book[];
      if (exists) {
        updated = prev.filter((v) => v.id !== exists.id);
      } else {
        updated = [...prev, book];
      }
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  const handleCloseWishlistError = () => setError("");

  const providervalues: ProviderValues = {
    error,
    wishList,
    loading,
    handleAddBookToWishlist,
    handleCloseWishlistError,
    handleRemoveBookFromWishlist,
  };
  return (
    <WishlistContext.Provider value={providervalues}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const wishlistContext = useContext(WishlistContext);
  if (wishlistContext) {
    return wishlistContext;
  } else {
    throw Error("No wishlist Context");
  }
};
