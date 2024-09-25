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

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string[];
  genres: string[];
  coverImage: string;
  cover_image?: string;
};

type ProviderValues = {
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

  useAsyncEffect(async () => {
    setBookListError(errors.getBooksList);
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({ id, title, author, genre, cover_image }: Book) => ({
          id,
          title,
          author,
          genres: genre,
          coverImage: cover_image,
        })
      );
      setBooksList(list);
    } catch (err) {
      console.error("handleGetBooks", err);
      setBookListError(errors.getBooksList);
      alert(err);
    }
  }, []);

  const handleCloseBooksError = useCallback(() => {
    setBookListError("");
  }, []);

  const providervalues: ProviderValues = {
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
