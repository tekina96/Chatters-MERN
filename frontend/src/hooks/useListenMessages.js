import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation';
import notificationSound from "../assets/sounds/notification.mp3";

export const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConversation();

  useEffect(() => {
    // Catches new message and shows it to frontend
    socket?.on("newMessage", (newMessage) => {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage])
    })
    
    // Clean up function, this line is important so that we don't use this for all the listeners present
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages])
  
}

export default useListenMessages;
