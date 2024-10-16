import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { wishListApi } from "../constants/api";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { waitForAnimationFinish } from "../helpers/waitForAnimationFinish";
import { errors } from "../constants/textValues";
import { Book } from "../types/AuthorBookType";

type ProviderValues = {
  wishList: Book[];
  loading: boolean;
  error: string;
  handleAddBookToWishlist: (book: Book) => void;
  handleCloseWishlistError: () => void;
};

type Props = {
  children: ReactNode;
};

export const WishlistContext = createContext({} as ProviderValues);

export const WishListProvider = ({ children }: Props) => {
  const [wishList, setWishList] = useState<Book[]>([]);

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await waitForAnimationFinish();
    try {
      const reponse = await axios.get(wishListApi);
      setWishList(reponse.data);
    } catch {
      setError(errors.getWishList);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveBookFromWishlist = useCallback(async (bookId: string) => {
    setWishList((prev) => prev.filter((v) => v.id !== bookId));
    await axios.delete(`${wishListApi}/${bookId}`);
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
      } catch {
        setError(errors.getWishList);
      }
    },
    [wishList]
  );

  const handleCloseWishlistError = () => setError("");

  const providervalues: ProviderValues = {
    error,
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
