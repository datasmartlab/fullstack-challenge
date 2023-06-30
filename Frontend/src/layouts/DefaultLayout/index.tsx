import { Container, Box, ThemeProvider } from '@mui/material';
import { Header } from '../../components/Header';
import { GlobalStyles } from '@mui/styled-engine-sc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import lightTheme from '../../styles/Themes/Light';
export function DefaultLayout() {
    return (
        <ThemeProvider theme={lightTheme}>
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
                    },
                }}
            />
            <Box sx={{ backgroundColor: lightTheme.palette.background.paper }}>
                <Header />
                <Container
                    maxWidth={'lg'}
                    sx={{
                        backgroundColor: lightTheme.palette.background.default,
                        minHeight: '100vh',
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </ThemeProvider>
    );
}
