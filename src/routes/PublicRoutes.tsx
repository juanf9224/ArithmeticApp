import React, { FC, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
const LoginPage = lazy(() => import('../pages/Login'));

const PublicRoutes: FC = () => {

    return (
            <Routes>
                <Route element={<LoginPage />} path="/login" />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
    )
}

export default PublicRoutes;