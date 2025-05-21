import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextProps {
  screenOtp: boolean;
  setScreenOtp: (error: boolean) => void;
  userName: string;
  setUserName: (error: string) => void;
  userPassword: string;
  setUserPassword: (error: string) => void;
  userEmail: string;
  setUserEmail: (error: string) => void;
}
export const UserContext = createContext<UserContextProps | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [screenOtp, setScreenOtp] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const contextValue: UserContextProps = {
    screenOtp,
    setScreenOtp,
    userName,
    setUserName,
    userPassword,
    setUserPassword,
    userEmail,
    setUserEmail,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
