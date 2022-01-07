import React, { useContext, useState, useEffect } from 'react';
import {auth} from '../firebase';
import { onAuthStateChanged, signOut} from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsub;
    }, [])


    const value = {     
        currentUser,
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
