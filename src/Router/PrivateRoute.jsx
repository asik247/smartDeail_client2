import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation()
    if (loading) {
        return <p>Loding..</p>
    }
    console.log(location);
    if (user) {
        return children;
    }
    return <Navigate state={location?.pathname} to={'/auth'}></Navigate>
};

export default PrivateRoute;