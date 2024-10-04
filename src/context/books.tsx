import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { errors } from "../constants/textValues";
import { booksApi } from "../constants/api";

import useAsyncEffect from "../hooks/useAsyncEffect";
import { sleep } from "../helpers/sleep";
import { loadingDuration } from "../constants/duration";

type Book = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  coverImage: string;
  cover_image?: string;
};

type ProviderValues = {
  booksLoading: boolean;
  bookListError: string;
  booksList: Book[];
  handleCloseBooksError: () => void;
};

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  const [bookListError, setBookListError] = useState<string>("");

  const [booksLoading, setBooksLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setBooksLoading(true);
    await sleep(loadingDuration);
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({ title, author, genres, cover_image, id }: Book) => ({
          id: id,
          title,
          author,
          genres,
          coverImage: cover_image,
        })
      );
      setBooksList(list);
    } catch (err) {
      console.error("handleGetBooks", err);
      setBookListError(errors.getBooksList);
      alert(err);
    } finally {
      setBooksLoading(false);
    }
  }, []);

  const handleCloseBooksError = useCallback(() => setBookListError(""), []);

  const providervalues: ProviderValues = {
    booksLoading,
    bookListError,
    booksList,
    handleCloseBooksError,
  };
  return (
    <BooksContext.Provider value={providervalues}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const booksContext = useContext(BooksContext);
  if (booksContext) {
    return booksContext;
  } else {
    throw Error("No booksContext");
  }
};
