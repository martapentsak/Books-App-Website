import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { authorsAPi, poetsApi } from "../constants/api";
import useAsyncEffect from "../hooks/useAsyncEffect";

type Author = {
  author: string;
  name: string;
  image: string;
  cover_image?: string;
  genre: string[];
  genres: string[];
  notable_works?: string[];
  works?: string[];
  id: string;
};

type ProviderValues = {
  authorsList: Author[];
  poetsList: Author[];
};

type Props = {
  children: ReactNode;
};
export const AuthorContext = createContext({} as ProviderValues);

export const AuthorProvider = ({ children }: Props) => {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [poetsList, setPoetsList] = useState<Author[]>([]);

  useAsyncEffect(async () => {
    try {
      const authorResponse = await axios.get(authorsAPi);
      const poetsResponse = await axios.get(poetsApi);
      Promise.all([authorResponse, poetsResponse]).then(
        ([authorResponse, poetsResponse]) => {
          const authors = authorResponse.data.map(
            ({ id, name, image, genre }: Author) => ({
              id,
              author: name,
              image,
              genres: genre,
            })
          );
          setAuthorsList(authors);
          const poets = poetsResponse.data.map(
            ({ id, name, image, genre, notable_works }: Author) => ({
              id,
              author: name,
              image,
              genres: genre,
              works: notable_works,
            })
          );
          setPoetsList(poets);
        }
      );
    } catch (err) {
      console.error("Get authors list", err);
      alert(err);
    }
  }, []);

  const providerValue: ProviderValues = {
    poetsList,
    authorsList,
  };

  return (
    <AuthorContext.Provider value={providerValue}>
      {children}
    </AuthorContext.Provider>
  );
};

export const useAuthors = () => {
  const authorContext = useContext(AuthorContext);
  if (authorContext) {
    return authorContext;
  } else {
    throw Error("No context like useHome");
  }
};
