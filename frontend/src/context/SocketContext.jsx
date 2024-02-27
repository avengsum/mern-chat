import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

export const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) =>{
  const [socket,setSocket] = useState(null);
  const [onlineUsers , setOnlineUsers] = useState(null);
  const {auth} = useAuthContext();

  useEffect(() => {
    if(auth){
      console.log("pahuch")
      const socket = io("http://localhost:5000",{
        query:{
          userId:auth._id
        },
      });

      setSocket(socket)

      socket.on("getOnlineUsers",(users) => {
        setOnlineUsers(users);
      })

      return () =>{ 
        console.log("Closing socket connection");
        socket.close();
      }
    }else{
      if(socket){
        socket.close();
        setSocket(null)
      }
    }
  },[auth])


 return <SocketContext.Provider value={{socket,onlineUsers}}>
    {children}
  </SocketContext.Provider>
}