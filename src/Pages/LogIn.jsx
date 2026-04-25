import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../Context/AuthContext';
import useMyHook from '../Hooks/useMyHook';

const LogIn = () => {
    //! AuthProvider get signInUser;
    const { signInUser } = use(AuthContext)
    // ! Custom hook get data;
    const [emailValue, handleEmailChange] = useMyHook('')
    const [passwordValue, handlePasswordChange] = useMyHook('')
    //?Success & error show state hre;
    const [success, setSuccess] = useState('');
    const [error, setError] = useState(false);
    //?handler singIn user;
    const handleSignInUser = (e) => {
        e.preventDefault();
        console.log(emailValue, passwordValue);
        //! success & error message resert;
        setSuccess('')
        setError(false)
        signInUser(emailValue, passwordValue)
            .then(res => {
                console.log(res.user);
                setSuccess(res.user)
            }).catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                        {/* form code here */}
                        <form onSubmit={handleSignInUser}>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" value={emailValue} onChange={handleEmailChange} className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" value={passwordValue} onChange={handlePasswordChange} className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn btn-neutral mt-4">Login</button>
                            </fieldset>
                            {/* success & error show ui code hre */}
                            <div>
                                {success && <p className='text-xl font-bold text-blue-600'>successfully registaion done!</p>}
                                {error && <p className='text-xl font-bold text-red-600'>{error}</p>}
                            </div>
                            {/* switch register */}
                            <div>
                                <p>New to our website please <Link className='text-xl font-bold text-blue-600 underline' to={'/auth/registation'} >Registaion</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;