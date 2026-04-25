import React from 'react';
import { Link } from 'react-router';

const Registation = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Registation now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <div className="card-body">
                       {/* form code hre */}
                        <form>
                            <fieldset className="fieldset">
                                <label className="label">Email</label>
                                <input type="email" className="input" placeholder="Email" />
                                <label className="label">Password</label>
                                <input type="password" className="input" placeholder="Password" />
                            
                                <button className="btn btn-neutral mt-4">Registation</button>
                            </fieldset>

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