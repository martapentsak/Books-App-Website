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

import { Book } from "../types/AuthorBookType";

type ProviderValues = {
  loading: boolean;
  error: string;
  books: Book[];
  handleCloseBooksError: () => void;
};

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [books, setBooks] = useState<Book[]>([]);

  const [error, setError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
 
  useAsyncEffect(async () => {
    setLoading(true);
    await waitForAnimationFinish();
    try {
      const response = await axios.get(booksApi);

      setBooks((response.data));
    } catch {
      setError(errors.getbooks);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseBooksError = useCallback(() => setError(""), []);

  const providervalues: ProviderValues = {
    loading,
    error,
    books,
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
