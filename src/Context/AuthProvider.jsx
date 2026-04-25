
import { auth } from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword } from "firebase/auth";
const AuthProvider = ({children}) => {
    //? singup/create account/registation user code here;
    const registationUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //?userInfo store;
    const userInfo = {
       registationUser
    }
    return <AuthContext value={userInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;