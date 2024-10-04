import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

import { errors } from "../constants/textValues";
import { booksApi } from "../constants/api";

import useAsyncEffect from "../hooks/useAsyncEffect";
import { sleep } from "../helpers/sleep";
import { loadingDuration } from "../constants/duration";

import { UniversalListItem } from "../types/UniversalListItem";

type ProviderValues = {
  booksLoading: boolean;
  bookListError: string;
  booksList: UniversalListItem[];
  handleCloseBooksError: () => void;
};

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [booksList, setBooksList] = useState<UniversalListItem[]>([]);

  const [bookListError, setBookListError] = useState<string>("");

  const [booksLoading, setBooksLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setBooksLoading(true);
    await sleep(loadingDuration);
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({ title, author, genre, cover_image, publication_year }: any) => ({
          id: uuidv4(),
          title,
          author,
          genres: genre,
          image: cover_image,
          year: publication_year,
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
