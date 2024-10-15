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
  wishlistLoading: boolean;
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
  const [wishlistLoading, setWishlistLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setWishlistLoading(true);
    await waitForAnimationFinish();
    try {
      const reponse = await axios.get(wishListApi);
      setWishList(reponse.data);
    } catch {
      setWishlistError("Error! Can`t show wishlist");
    } finally {
      setWishlistLoading(false);
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
        setWishlistError(errors.getWishList);
      }
    },
    [wishList]
  );

  const handleCloseWishlistError = () => setWishlistError("");

  const providervalues: ProviderValues = {
    wishlistError,
    wishList,
    wishlistLoading,
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
