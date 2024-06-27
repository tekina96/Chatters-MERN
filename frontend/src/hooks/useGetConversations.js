import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

//   useEffect immediately runs and send a fetch request and it'll only only run once so we've put an empty dependency array
  useEffect(() => {
    const getConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if(data.error) {
                throw new Error(error.message);
            }
            setConversations(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    getConversations();
  }, []);
  return {loading, conversations};
}

export default useGetConversations