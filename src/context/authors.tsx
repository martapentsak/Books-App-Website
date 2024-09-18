import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { authorsAPi, poetsApi } from "../constants/api";

type Author = {
  name: string;
  image: string;
  cover_image?: string;
  genre: string[];
  notable_works?: string[];
  works?: string[];
  id: string;
};

type ProviderValues = {
  authorsList: Author[];
  poetsList: Author[];
  handleNavigate: (link: string | undefined) => void;
};

type Props = {
  children: ReactNode;
};
export const AuthorContext = createContext({} as ProviderValues);

export const AuthorProvider = ({ children }: Props) => {
  const [authorsList, setAuthorsList] = useState<Author[]>([]);
  const [poetsList, setPoetsList] = useState<Author[]>([]);

  useEffect(() => {
    handleGetAuthorList();
    handleGetPoetsList();
  }, []);

  const handleGetAuthorList = async () => {
    try {
      const response = await axios.get(authorsAPi);
      const list = response.data.map(({ id, name, image, genre }: Author) => ({
        id,
        name,
        image,
        genre,
      }));
      setAuthorsList(list);
    } catch (err) {
      console.error("handleGetAuthorList", err);
      alert(err);
    }
  };

  const handleGetPoetsList = async () => {
    try {
      const response = await axios.get(poetsApi);
      const list = response.data.map(
        ({ id, name, image, genre, notable_works }: Author) => ({
          id,
          name,
          image,
          genre,
          works: notable_works,
        })
      );
      setPoetsList(list);
    } catch (err) {
      console.error("handleGetPoetsList", err);
      alert(err);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = (link: string | undefined) => link && navigate(link);

  const providerValue: ProviderValues = {
    poetsList,
    authorsList,
    handleNavigate,
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
