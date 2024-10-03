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
  loading: boolean;
  bookListError: string;
  booksList: Book[];
  handleCloseBooksError: () => void;
};

type Response = {
  title: string,
  author: string,
  genre: string[],
  cover_image: string,
  publication_year: number,
  description: string
}

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  const [bookListError, setBookListError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await sleep(loadingDuration);
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({
          title,
          author,
          genre,
          cover_image,
          publication_year,
          description,
        }: Response) => ({
          id: uuidv4(),
          title,
          author,
          publicationYear: publication_year,
          genres: genre, // On server he have genre: []
          description,
          coverImage: cover_image,
        })
      );
      setBooksList(list);
    } catch (err) {
      console.error("handleGetBooks", err);
      setBookListError(errors.getBooksList);
      alert(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseBooksError = useCallback(() => setBookListError(""), []);

  const providervalues: ProviderValues = {
    loading,
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
