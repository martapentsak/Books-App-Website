import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { booksApi } from "../constants/api";
import { sleep } from "../helpers/sleep";
import { animationDuration } from "./animationDuration";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string[];
  coverImage: string;
  cover_image?: string;
};

type ProviderValues = {
    loading: boolean,
  booksList: Book[];
};

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  const [loading, setLoading] = useState<boolean>(false)


  useEffect(() => {
    handleGetBooks();
  }, []);

  const handleGetBooks = async () => {
    setLoading(true)
    await sleep(animationDuration)
    try {
      const reponse = await axios.get(booksApi);
      const list = reponse.data.map(
        ({ id, title, author, genre, cover_image }: Book) => ({
          id,
          title,
          author,
          genre,
          coverImage: cover_image,
        })
      );
      setBooksList(list);
    } catch (err) {
      console.error("handleGetBooks", err);
      alert(err);
    } finally {
        setLoading(false)
    }
  };

  const providervalues: ProviderValues = {
    loading,
    booksList,
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
