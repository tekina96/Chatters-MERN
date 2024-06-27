import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser} = useAuthContext();
    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
		const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});

			const data = await res.json();
            // console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}
            // storing the data into localstorage so then after refreshing we'll get to know if we are logged in or not
			localStorage.setItem("chat-user", JSON.stringify(data));
			// context - using authContext we'll navigate the user to homepage after sign in
            setAuthUser(data);
            // So when we sign up, we update this state and then from app.jsx we navigate to the home page
		} catch (error) {
            console.log(69);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

    
    return {loading, signup};
    
};

export default useSignup

function handleInputErrors({fullName, username, password, confirmPassword, gender}) {
    if(!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all the fields");
        return false;
    }

    if(password !== confirmPassword) {
        toast.error("Password not matching");
        return false;
    }

    if(password.length < 6) {
        toast.error("Password must be atleast 6 characters");
        return false;
    }

    return true;
}