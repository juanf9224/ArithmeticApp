import React, { Suspense } from 'react'
import MainNavigator from './routes'
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import { LinearProgress, ThemeProvider, createTheme } from '@mui/material';

const App = () => {
    const theme = createTheme();

    return (
        <Suspense fallback={<LinearProgress />}>
            <Provider store={store}>
            <ThemeProvider theme={theme}>
                <MainNavigator />
            </ThemeProvider>
        </Provider>
        </Suspense>
    )
}

export default App;