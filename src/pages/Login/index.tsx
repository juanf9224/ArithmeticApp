import React, { Suspense, lazy } from 'react'
import { LinearProgress } from '@mui/material';

const Login = lazy(() => import('../../components/auth/Login/Login'));

const LoginPage = () => <Suspense fallback={<LinearProgress />}>
    <Login />
</Suspense>


export default LoginPage