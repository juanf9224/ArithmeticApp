import React, { Suspense } from 'react'
import MainNavigator from './routes'
import { Provider } from 'react-redux';
import store from './store';
import './index.css'
import { LinearProgress, ThemeProvider, createTheme } from '@mui/material';
import { AuthContextProvider } from 'context/authContext';
import { themeConfig } from 'theme/loanProTheme';
import "@fontsource/dm-sans"; // Defaults to weight 400
import "@fontsource/dm-sans/400.css"; // Specify weight
import "@fontsource/dm-sans/400-italic.css"; // Specify weight and style

const App = () => {
    const theme = createTheme(themeConfig);

    return (
        <Suspense fallback={<LinearProgress />}>
            <Provider store={store}>
            <ThemeProvider theme={theme}>
                <AuthContextProvider>
                    <MainNavigator />
                </AuthContextProvider>
            </ThemeProvider>
        </Provider>
        </Suspense>
    )
}

export default App;