import { useRecoilState } from "recoil";
import { useSocket } from "../context/SocketContext"
import { message } from "../recoil/conversationAtom";
import { useEffect } from "react";

const useListenMessages = () => {
 const {socket} = useSocket();
 const [messages,setMessages] = useRecoilState(message)

 useEffect(() => {
  socket?.on("newMessage",(newMessage) => {
    newMessage.shouldShake = true;
    setMessages([...messages,newMessage])
  })

  return () => socket?.off("newMessage")
 },[socket,setMessages,messages]);

}

export default useListenMessages