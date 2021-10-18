import { createContext, FC, ReactNode, useContext, useState } from 'react';

interface IContextType {
  flag: boolean;
  toggleFlag?: () => void;
}

export const defaultState = {
  flag: false,
};

const FlagContext = createContext<IContextType>(defaultState);

export const FlagContextProvider: FC<ReactNode> = ({ children }) => {
  const [flag, setFlag] = useState(defaultState.flag);
  const toggleFlag = () => {
    setFlag(!flag);
  };

  return <FlagContext.Provider value={{ flag, toggleFlag }}>{children}</FlagContext.Provider>;
};

export const useFlagContext = () => useContext(FlagContext);
export default FlagContextProvider;
