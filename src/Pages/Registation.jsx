import React, { use, useState } from 'react';
import { Link } from 'react-router';
import useMyHook from '../Hooks/useMyHook';
import { AuthContext } from '../Context/AuthContext';
import {updateProfile } from "firebase/auth";


const Registation = () => {
    //! AuthProvider get resistationUser;
    const {registationUser} = use(AuthContext)
    // ! Custom hook get data;
   const [nameValue,handleNameChange] = useMyHook('')
   const [emailValue,handleEmailChange] = useMyHook('')
   const [photoValue,handlePhotoChange] = useMyHook('')
   const [passwordValue,handlePasswordChange] = useMyHook('')
   //?Success & error show state hre;
   const [success,setSuccess] = useState('');
   const [error,setError] = useState(false);
   //! Registation submit handler;
   const handleRegister = (e)=>{
    e.preventDefault()
    // console.log(nameValue,emailValue,passwordValue);
    //TODO: success & error condition;
    setSuccess('')
    setError(false)
    registationUser(emailValue,passwordValue)
    .then(res=>{
        console.log(res.user);
        setSuccess(res.user)
        //ToDo: update profile;
        const newInfo = {
            displayName:nameValue,
            photoURL:photoValue
        }
        //Todo: update using firebase manage auth;
       updateProfile(res.user,newInfo)
    }).catch(error=>{
        console.log(error.message);
        setError(error.message)
    })
   }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Registation now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                       {/* form code hre */}
                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset">
                                {/* Name field */}
                                <label className="label">Name</label>
                                <input type="text" value={nameValue} onChange={handleNameChange} className="input" placeholder="Name" />
                                {/* Email field */}
                                <label className="label">Email</label>
                                <input type="email" value={emailValue} onChange={handleEmailChange} className="input" placeholder="Email" />
                                {/* Photo url */}
                                <label className="label">Photo</label>
                                <input type="text" value={photoValue} onChange={handlePhotoChange} className="input" placeholder="PhotoURL" />
                                <label className="label">Password</label>
                                <input type="password" value={passwordValue} onChange={handlePasswordChange} className="input" placeholder="Password" />
                            
                                <button className="btn btn-neutral mt-4">Registation</button>
                            </fieldset>
                            {/* success & error show ui code here */}
                            <div>
                                {success && <p className='text-xl font-bold text-blue-600'>successfully registaion done!</p>}
                                {error && <p className='text-xl font-bold text-red-600'>{error}</p>}
                            </div>
                            {/* switch register */}
                            <div>
                                <p>Already have'n accout? please <Link className='text-xl font-bold text-blue-600 underline' to={'/auth'} >LogIn</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registation;