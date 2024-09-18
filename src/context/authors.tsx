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
import { sleep } from "../helpers/sleep";
import { animationDuration } from "./animationDuration";

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
  loading: boolean,
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

  const [loading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate();

  const handleNavigate = (link: string | undefined) => link && navigate(link);

  console.log(loading)

  useEffect(() => {
    handleGetAuthorList();
    handleGetPoetsList();
  }, []);

  const handleGetAuthorList = async () => {
    setLoading(true)
    await sleep(animationDuration)
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
    } finally {
    setLoading(false)

    }
  };


  const handleGetPoetsList = async () => {
    setLoading(true)
    await sleep(animationDuration)
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
    } finally {
    setLoading(false)
    }
  };



  const providerValue: ProviderValues = {
    loading,
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
