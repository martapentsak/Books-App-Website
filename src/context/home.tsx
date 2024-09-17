import { ReactNode, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

type ProviderValues = {
  handleNavigate: (link: string | undefined) => void;
};

type Props = {
  children: ReactNode;
};
export const HomeContext = createContext({} as ProviderValues);

export const HomeProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (link: string | undefined) => link && navigate(link);

  const providerValue: ProviderValues = {
    handleNavigate,
  };

  return (
    <HomeContext.Provider value={providerValue}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const homeContext = useContext(HomeContext);
  if (homeContext) {
    return homeContext;
  } else {
    throw Error("No context like useHome");
  }
};
