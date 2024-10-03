import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import useAsyncEffect from "../hooks/useAsyncEffect";
import { sleep } from "../helpers/sleep";
import { loadingDuration } from "../constants/duration";
import { wishListApi } from "../constants/api";

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
  handleAddBookToWishlist: (book: Book) => void;
};

type Props = {
  children: ReactNode;
};

export const WishlistContext = createContext({} as ProviderValues);

export const WishListProvider = ({ children }: Props) => {
  const [wishList, setWishList] = useState<Book[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await sleep(loadingDuration);
    try {
      const reponse = await axios.get(wishListApi);
      setWishList(reponse.data);
    } catch (err) {
      console.error("handleGetWishList", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRemoveBookFromWishlist = useCallback(
    async (bookId: string) => {
      try {
        setWishList((prev) => prev.filter((v) => v.id !== bookId));
        await axios.delete(`${wishListApi}/${bookId}`);
      } catch (err) {
        console.error(handleRemoveBookFromWishlist, err);
      } 
    },
    []
  );

  const handleAddBookToWishlist = useCallback(
    async (book: Book) => {
      try {
        if (!wishList.find((v) => v.title === book.title)) {
          setWishList((prev) => [...prev, book]);
          await axios.post(wishListApi, book);
        } else {
          handleRemoveBookFromWishlist(book.id);
        }
      } catch (err) {
        console.error("handleAddBookToWishlist", err);
      }
    },
    [wishList]
  );

  const providervalues: ProviderValues = {
    wishList,
    loading,
    handleAddBookToWishlist,
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
