import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { errors } from "../constants/textValues";
import { authorsAPi, poetsApi } from "../constants/api";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { waitForAnimationFinish } from "../helpers/waitForAnimationFinish";
import { LoadingPage } from "../pages/LoadingPage";

type Author = {
  author: string;
  name: string;
  image: string;
  cover_image?: string;
  genres: string[];
  notable_works?: string[];
  works?: string[];
  id: string;
};

type ProviderValues = {
  authorLoading: boolean;
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

  const [authorLoading, setAuthorLoading] = useState<boolean>(false);

  console.log(authorLoading);

  useAsyncEffect(async () => {
    setAuthorLoading(true);
    await waitForAnimationFinish();
    try {
      const authorResponse = await axios.get(authorsAPi);
      const poetsResponse = await axios.get(poetsApi);
      const [authorList, poetList] = await Promise.all([
        authorResponse,
        poetsResponse,
      ]);
      const authors = authorList.data.map(
        ({ name, image, genres, id }: Author) => ({
          id,
          author: name,
          image,
          genres,
        })
      );
      setAuthorsList(authors);
      const poets = poetList.data.map(
        ({ name, image, genres, notable_works, id }: Author) => ({
          id,
          author: name,
          image,
          genres,
          works: notable_works,
        })
      );
      setPoetsList(poets);
    } catch {
      setAuthorListError(errors.getAuthorsList);
    } finally {
      setAuthorLoading(false);
    }
  }, []);

  const handleCloseAuthorsError = useCallback(() => setAuthorListError(""), []);

  const providerValue: ProviderValues = {
    authorLoading,
    authorListError,
    poetsList,
    authorsList,
    handleCloseAuthorsError,
  };

  return (
    <AuthorContext.Provider value={providerValue}>
      {authorLoading && <LoadingPage />}
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
