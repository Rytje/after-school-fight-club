import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase-config';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        auth.createUserWithEmailAndPassword(email, password);
    }

    function signIn(email, password){
        return auth.signInWithEmailAndPassword(email, password);
    }

    function signOut(){
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);



    const value = {
        currentUser,
        signUp,
        signIn,
        signOut
    };


    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
