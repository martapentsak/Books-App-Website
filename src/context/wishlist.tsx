import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { loadingDuration } from "../constants/duration";
import { wishListApi } from "../constants/api";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { sleep } from "../helpers/sleep";

type Book = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  publicationYear: number;
  coverImage: string;
  description: string;
};

type ProviderValues = {
  wishList: Book[];
  loading: boolean;
  wishlistError: string;
  handleAddBookToWishlist: (book: Book) => void;
  handleCloseWishlistError: () => void;
};

type Props = {
  children: ReactNode;
};

export const WishlistContext = createContext({} as ProviderValues);

export const WishListProvider = ({ children }: Props) => {
  const [wishList, setWishList] = useState<Book[]>([]);
  const [wishlistError, setWishlistError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await sleep(loadingDuration);
    try {
      const reponse = await axios.get(wishListApi);
      setWishList(reponse.data);
    } catch (err) {
      setWishlistError("Error! Can`t show wishlist");
      console.error("handleGetWishList", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveBookFromWishlist = useCallback(async (bookId: string) => {
    try {
      setWishList((prev) => prev.filter((v) => v.id !== bookId));
      await axios.delete(`${wishListApi}/${bookId}`);
    } catch (err) {
      setWishlistError("Error! Can`t delete book from wishlist");
      console.error("handleRemoveBookFromWishlist", err);
    }
  }, []);

  const handleAddBookToWishlist = useCallback(
    async (book: Book) => {
      try {
        const bookAlreadyExist = wishList.find((v) => v.title === book.title);
        if (bookAlreadyExist) {
          await handleRemoveBookFromWishlist(bookAlreadyExist.id);
        } else {
          setWishList((prev) => [...prev, book]);
          await axios.post(wishListApi, book);
        }
      } catch (err) {
        setWishlistError("Error! Can`t add book to wishlist");
        console.error("handleAddBookToWishlist", err);
      }
    },
    [wishList]
  );

  const handleCloseWishlistError = () => setWishlistError("");

  const providervalues: ProviderValues = {
    wishlistError,
    wishList,
    loading,
    handleAddBookToWishlist,
    handleCloseWishlistError,
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
