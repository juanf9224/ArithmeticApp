import React, {lazy} from 'react'
import Layout from 'components/common/Layout/Layout';
import { Navigate, Route, Routes } from 'react-router-dom';
const RecordsPage = lazy(() => import('../pages/Records'));


const PrivateRoutes = () => {
    return (
            <Routes>
                <Route element={<Layout />} path="/operation">
                    <Route element={<RecordsPage />} path="records" />
                </Route>
                <Route path="*" element={<Navigate to="/operation/records" />} />
            </Routes>
    )
}

export default PrivateRoutes