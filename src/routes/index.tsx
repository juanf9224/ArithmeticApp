import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RequireAuth from  'components/auth/RequireAuth/RequireAuth';
import Layout from 'components/common/Layout/Layout';
import LoginPage from 'pages/Login';
import RecordsPage from 'pages/Records';
import RequireNoAuth from 'components/auth/RequireNoAuth/RequireNoAuth';

const MainNavigator = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RequireNoAuth />} path="/auth">
                    <Route element={<LoginPage />} path="login" />
                    <Route path="/auth" element={<Navigate to="login" />} />
                </Route>
                <Route element={<RequireAuth><Layout /></RequireAuth>} path="/operation">
                    <Route element={<RecordsPage />} path="records" />
                    <Route path="/operation" element={<Navigate to="records" />} />
                </Route>
                <Route path="*" element={<Navigate to="/auth/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default MainNavigator;