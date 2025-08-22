import axios from "axios";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

import { errors } from "../constants/textValues";

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

type Props = {
  children: ReactNode;
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
      const response = await axios.get("/db.json");
      const authorList = response.data.writers;
      const poetList = response.data.poets;
      setAuthors(authorList);
      setPoets(poetList);
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
