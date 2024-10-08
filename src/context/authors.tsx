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
import { loadingDuration } from "../constants/duration";

import useAsyncEffect from "../hooks/useAsyncEffect";

import { sleep } from "../helpers/sleep";

type Author = {
  author: string;
  image: string;
  cover_image?: string;
  genres: string[];
  works: string[];
  id: string;
  birth: number;
  death: number;
  biography: string;
  nationality: string;
  award: string;
};

type Response = {
  name: string;
  image: string;
  genres: string[];
  id: string;
  birth_year: number;
  death_year: number;
  biography: string;
  nationality: string;
  award: string;
  notable_works: string[];
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

  const [authorLoading, setAuthorsLoading] = useState<boolean>(false);

  const mapResponse = (data: Response[]): Author[] => {
    return data.map(
      ({
        name,
        birth_year,
        death_year,
        notable_works,
        ...others
      }: Response) => ({
        author: name,
        birth: birth_year,
        death: death_year,
        works: notable_works,
        ...others,
      })
    );
  };

  useAsyncEffect(async () => {
    setAuthorsLoading(true);
    await sleep(loadingDuration);
    try {
      const authorResponse = await axios.get(authorsAPi);
      const poetsResponse = await axios.get(poetsApi);
      const [authorList, poetList] = await Promise.all([
        authorResponse,
        poetsResponse,
      ]);
      setAuthorsList(mapResponse(authorList.data));
      setPoetsList(mapResponse(poetList.data));
    } catch (err) {
      setAuthorListError(errors.getAuthorsList);
    } finally {
      setAuthorsLoading(false);
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
