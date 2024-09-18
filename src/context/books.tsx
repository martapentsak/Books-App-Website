import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { booksApi } from "../constants/api";

type Book = {
  id: number;
  title: string;
  author: string;
  genre: string[];
  coverImage: string;
  cover_image?: string;
};

type ProviderValues = {
  booksList: Book[];
};

type Props = {
  children: ReactNode;
};

export const BooksContext = createContext({} as ProviderValues);

export const BooksProvider = ({ children }: Props) => {
  const [booksList, setBooksList] = useState<Book[]>([]);

  useEffect(() => {
    handleGetBooks();
  }, []);

  const handleGetBooks = async () => {
    try {
      const reponse = await axios.get(booksApi);
      console.log(reponse.data);
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
    }
  };

  const providervalues: ProviderValues = {
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
