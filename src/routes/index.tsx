import React, { useContext } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from 'context/authContext';

const MainNavigator = () => {
    const { user } = useContext(AuthContext);
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return (
        <BrowserRouter>
            {!user.auth?.isAuthenticated && !isAuthenticated ? <PublicRoutes /> : <PrivateRoutes />}
        </BrowserRouter>
    );
}

export default MainNavigator;