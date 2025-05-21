import React, {
  createContext,
  useMemo,
  useContext,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

type SocketType = Socket | null;

const SocketContext = createContext<SocketType>(null);

export const useSocket = (): SocketType => {
  const socket = useContext(SocketContext);
  return socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = useMemo(
    () =>
      io("http://192.168.29.178:3200", {
        transports: ["websocket", "polling"],
        auth: {
          token: sessionStorage.getItem("token"),
        },
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
