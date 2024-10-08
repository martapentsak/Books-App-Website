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

  const [authorLoading, setAuthorLoading] = useState<boolean>(false);

  const [authorListError, setAuthorListError] = useState<string>("");

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
        ({ author, name, ...others }: Author) => ({
          author: name,
          ...others,
        })
      );
      setAuthorsList(authors);
      const poets = poetList.data.map(
        ({ name, author, notable_works, ...others }: Author) => ({
          author: name,
          works: notable_works,
          ...others,
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
