
import { useEffect, useState } from 'react';
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
const AuthProvider = ({ children }) => {
    //!user state;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    //? singup/create account/registation user code here;
    const registationUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //?  signin/login user code hre;
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }
    //? LogOut/signOut user code hre;
    const logOutUser = () => {
        return signOut(auth)
    }
    //?  OnAuth state change here;
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => unsubscribe()

    }, [])
    //? singOut + onAthState change;
    //?userInfo store;
    const userInfo = {
        registationUser,
        signInUser,
        logOutUser,
        user,
        loading

    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;