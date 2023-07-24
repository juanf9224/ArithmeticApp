import React, { useEffect } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const MainNavigator = () => {
    const user = useSelector((state: any) => state.user);
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    useEffect(() => {
        console.log('auth changed', user.auth, isAuthenticated);
    }, [user])
    return (
        <BrowserRouter>
            {!user.auth?.isAuthenticated && !isAuthenticated ? <PublicRoutes /> : <PrivateRoutes />}
        </BrowserRouter>
    );
}

export default MainNavigator;