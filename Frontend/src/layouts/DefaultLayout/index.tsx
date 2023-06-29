import { Container, Box, ThemeProvider } from '@mui/material';
import { Header } from '../../components/Header';
import { GlobalStyles } from '@mui/styled-engine-sc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import DarkTheme from '../../styles/Themes/Dark';
import lightTheme from '../../styles/Themes/Light';
import { useEffect, useState } from 'react';
export function DefaultLayout() {
    const [darkTheme, setDarkTheme] = useState(() => {
        const SavcedDarkTheme = localStorage.getItem('darkTheme');
        return SavcedDarkTheme ? JSON.parse(SavcedDarkTheme) : true;
    });

    useEffect(() => {
        localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
    }, [darkTheme]);

    const handleThemeChange = () => {
        setDarkTheme(!darkTheme);
    };

    const theme = darkTheme ? DarkTheme : lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: theme.palette.primary.main }}>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />

                <GlobalStyles
                    styles={{
                        '*': {
                            boxSizing: 'border-box',
                            margin: 0,
                            padding: 0,
                            textDecoration: 'none',
                            outline: 0,
                            fontFamily: "'Marvel', sans-serif",
                        },
                        body: {},
                    }}
                />
                <Header
                    handleThemeChange={handleThemeChange}
                    darkTheme={darkTheme}
                />
                <Container
                    maxWidth={'lg'}
                    sx={{
                        backgroundColor: theme.palette.primary.light,
                        minHeight: '100vh',
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </ThemeProvider>
    );
}
