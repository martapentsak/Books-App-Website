import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type ProviderValues = {
  handleNavigate: (link: string | undefined) => void;
};

type Props = {
  children: ReactNode;
};
export const AuthorContext = createContext({} as ProviderValues);

export const AuthorProvider = ({ children }: Props) => {

  const navigate = useNavigate();

  const handleNavigate = (link: string | undefined) => link && navigate(link);

  const providerValue: ProviderValues = {
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
