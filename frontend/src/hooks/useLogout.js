import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {"Content-Type": "application/json"} 
        });
        const data = await res.json();
        if(data.error) {
            throw new Error(data.error);
        }
        // So after clicking on logout our local storage values from user signup will be cleared up
        // And authUser values will be null so from app.jsx we'll navigate to the login page
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };
  return {loading, logout};
};

export default useLogout