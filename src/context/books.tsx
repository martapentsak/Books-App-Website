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

import { waitForAnimationFinish } from "../helpers/waitForAnimationFinish";

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
  booksLoading: boolean;
  bookListError: string;
  booksList: Book[];
  handleCloseBooksError: () => void;
};

type Response = {
  id: string;
  title: string;
  author: string;
  genres: string[];
  cover_image: string;
  publication_year: number;
  description: string;
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
    await waitForAnimationFinish();
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({ cover_image, publication_year, ...others }: Response) => ({
          publicationYear: publication_year,
          coverImage: cover_image,
          ...others,
        })
      );
      setBooksList(list);
    } catch {
      setBookListError(errors.getBooksList);
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
