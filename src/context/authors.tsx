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
import { Author } from "../types/AuthorBookType";

type ProviderValues = {
  loading: boolean;
  error: string;
  authors: Author[];
  poets: Author[];
  handleCloseAuthorsError: () => void;
};

type AuthorBase = Omit<Author, "birthYear" | "deathYear" | "works">;

type AuthorResponse = AuthorBase & {
  birth_year: number;
  death_year: number;
  notable_works: string[];
};

type DataProp = {
  data: AuthorResponse[];
};

type Props = {
  children: ReactNode;
};

const formatAuthorResponse = (response: DataProp): Author[] => {
  return response.data.map(
    ({ notable_works, birth_year, death_year, ...others }) => ({
      birthYear: birth_year || 0,
      deathYear: death_year || 0,
      works: notable_works || [],
      ...others,
    })
  );
};

export const AuthorContext = createContext({} as ProviderValues);

export const AuthorProvider = ({ children }: Props) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [poets, setPoets] = useState<Author[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  useAsyncEffect(async () => {
    setLoading(true);
    await waitForAnimationFinish();
    try {
      const authorResponse = await axios.get(authorsAPi);
      const poetsResponse = await axios.get(poetsApi);
      const [authorList, poetList] = await Promise.all([
        authorResponse,
        poetsResponse,
      ]);
      setAuthors(formatAuthorResponse(authorList));
      setPoets(formatAuthorResponse(poetList));
    } catch {
      setError(errors.getauthors);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCloseAuthorsError = useCallback(() => setError(""), []);

  const providerValue: ProviderValues = {
    loading,
    error,
    poets,
    authors,
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
