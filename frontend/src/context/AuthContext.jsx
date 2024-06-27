import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
}
// We use this hook to consume the values into authUser and setAuthUSer

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
    // So we'll wrap the whole application into authcontext so we can use some values in it
    // There are other alternative approaches as well to do this like global state ( Zustand )
    return <AuthContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
}