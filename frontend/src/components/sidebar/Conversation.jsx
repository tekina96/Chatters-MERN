import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

const Conversation = ({conversation, lastIdx, emoji}) => {
	// global state
	const {selectedConversation, setSelectedConversation} = useConversation();
	// in any file we just need to call this hook and we can use any value that we'd like to have
	// So we don't really need to pass these as a props in different components
	
	const isSelected = selectedConversation?._id === conversation._id;
	// At first selectedConversation will be empty, we have to click it first to get values into it
	
	const {onlineUsers} = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id)
	
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
					${isSelected ? "bg-sky-500" : ""}
				`}
				onClick={() => setSelectedConversation(conversation)}
				// This way by clicking we enable some value into setSelectedConversation
				// Then the isSelected function will return true, and we get bg color on the selected user id
				>
				<div className={`avatar ${isOnline ? "online" : "" }`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;