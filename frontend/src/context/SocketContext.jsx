import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client"
const SocketContext = createContext();

// We've created a context, to consume it we use this hook
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);    // our connections
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
      if(authUser) {
        const socket = io("https://chatters-zone.onrender.com", {
            query: {
                userId: authUser._id,
            },
        });

        setSocket(socket);   // This function sets the socket state to the connection
        
        // socket.on method is used to listen to the events, can be used on both client and server side
        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        })

        return () => socket.close();  // When component is unmounted this will close the socket connection
      } else {
        if(socket) {
            socket.close();
            setSocket(null);
        }
      }
    
    }, [authUser])
    
    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
