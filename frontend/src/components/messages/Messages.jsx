import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

// Same as conversation
const Messages = () => {
	const {messages, loading} = useGetMessages();
	
	// Listen for any incoming messages from socket
	useListenMessages();
	const lastMessageRef = useRef();
	// console.log("messages: ", messages);

	useEffect(() => {
	  setTimeout(() => {
		lastMessageRef.current?.scrollIntoView({behavior: "smooth"});
	  }, 100);
	}, [messages]);
	// So via using this useEffect hook, whenever we open a chat the ui scrolls to the latest chat for us
	// The latest chat is pointed with the help of lastmessageRef variable
	

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id} ref={lastMessageRef} >
					<Message message={message} />
				</div>
			))}
			
			{loading && [...Array(4)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Shoot a message to start the conversation</p>
			)}
		</div>
	);
};
export default Messages;