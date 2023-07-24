import React from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const MainNavigator = () => {
    const user = useSelector((state: any) => state.user);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return (
        <BrowserRouter>
            {!user.auth?.isAuthenticated && !isAuthenticated ? <PublicRoutes /> : <PrivateRoutes />}
        </BrowserRouter>
    );
}

export default MainNavigator;