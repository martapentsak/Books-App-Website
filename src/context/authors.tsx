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
import { authorsAPi, poetsApi } from "../constants/api";
import { loadingDuration } from "../constants/duration";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { sleep } from "../helpers/sleep";

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
  loading: boolean;
  authorListError: string;
  authorsList: Author[];
  poetsList: Author[];
  handleCloseAuthorsError: () => void;
};

type Props = {
  children: ReactNode;
};
export const AuthorContext = createContext({} as ProviderValues);

export const AuthorProvider = ({ children }: Props) => {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [poetsList, setPoetsList] = useState<Author[]>([]);

  const [authorListError, setAuthorListError] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  useAsyncEffect(async () => {
    setLoading(true);
    await sleep(loadingDuration);
    try {
      const authorResponse = await axios.get(authorsAPi);
      const poetsResponse = await axios.get(poetsApi);
      const [authorList, poetList] = await Promise.all([authorResponse, poetsResponse]);
      const authors = authorList.data.map(
        ({ name, image, genre }: Author) => ({
          id: uuidv4(),
          author: name,
          image,
          genres: genre,
        })
      );
      setAuthorsList(authors);
      const poets = poetList.data.map(
        ({ name, image, genre, notable_works }: Author) => ({
          id: uuidv4(),
          author: name,
          image,
          genres: genre,
          works: notable_works,
        })
      );
      setPoetsList(poets);
    } catch (err) {
      console.error("Get authors list", err);
      setAuthorListError(errors.getAuthorsList);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseAuthorsError = useCallback(() => setAuthorListError(""), []);

  const providerValue: ProviderValues = {
    loading,
    authorListError,
    poetsList,
    authorsList,
    handleCloseAuthorsError,
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
