import React, { useContext, useState, useEffect } from 'react';
import {auth} from '../firebase';
import { onAuthStateChanged } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {setCurrentUser(user)});
        return unsub;
    }, [])


    const value = {     
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
