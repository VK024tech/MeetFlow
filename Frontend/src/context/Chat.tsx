import { createContext, useContext, useState, type ReactNode } from "react";

interface ChatContextProps {
  shareError: string;
  friendId: number | null;
  setFileShareError: (error: string) => void;
  setFriendId: (error: number) => void;
}
export const ChatContext = createContext<ChatContextProps | null>(null);

interface ChatContextProviderProps {
  children: ReactNode;
}

export const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
}) => {
  const [shareError, setFileShareError] = useState<string>("");
  const [friendId, setFriendId] = useState<number | null>(null);

  const contextValue: ChatContextProps = {
    shareError,
    setFileShareError,
    friendId,
    setFriendId,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatContextProvider");
  }
  return context;
};
