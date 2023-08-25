import { FC, createContext, useContext, useState } from "react";

interface ContextProps {
  upload: boolean;
  setUpload: (upload: boolean) => void;
}

const Context = createContext<ContextProps>({
  upload: false,
  setUpload: () => null,
});

export const useUpload = () => useContext(Context);

interface Props {
  children: React.ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [upload, setUpload] = useState(false);

  const value = {
    upload,
    setUpload,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
