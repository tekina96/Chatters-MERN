import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const {messages, setMessages, selectedConversation} = useConversation();

    // When we call this hook, this should immediately run, so we use useEffect hook
    useEffect(() => {
        const getMessage = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if(data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false)
            }
        }
        if(selectedConversation?._id) getMessage();
    }, [selectedConversation?._id, setMessages]);
    // It means whenever selected conversation id changes we run this useEfeect hook.
    // we use '?' mark because the selected conversation field might be null, so we make sure our code doesn't fails in such cases
    return {messages, loading};
};

export default useGetMessages;