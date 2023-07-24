import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Grid } from '@mui/material';
import LoanProLinear from '../Linear/LoanProLinear/LoanProLinear';

const Layout = () => (
    <Grid container>
        <Grid item xs={12} style={{ height: '10vh' }}>
            <LoanProLinear />
            <Header />
        </Grid>
        <Grid item xs={12} style={{ height: '90vh', paddingTop: 15 }} >
            <Outlet />
        </Grid>
    </Grid>
);
export default Layout;
