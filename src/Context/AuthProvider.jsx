
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
const AuthProvider = ({children}) => {
    //? singup/create account/registation user code here;
    const registationUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //?  signin/login user code hre;
    const signInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
    //?userInfo store;
    const userInfo = {
       registationUser,
       signInUser
       
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;