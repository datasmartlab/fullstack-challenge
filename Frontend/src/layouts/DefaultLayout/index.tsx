import { Container, Box, ThemeProvider } from '@mui/material';
import { Header } from '../../components/Header';
import { GlobalStyles } from '@mui/styled-engine-sc';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import lightTheme from '../../styles/Themes/Light';
import { IntlProvider } from 'react-intl';
import locales from '../../translate/index';
import { useState } from 'react';

export function DefaultLayout() {
    const [language, setLanguage] = useState<'pt' | 'en'>(() => {
        const savedLanguage = localStorage.getItem('langue');
        return savedLanguage === 'pt' || savedLanguage === 'en'
            ? savedLanguage
            : 'pt';
    });

    const locale = locales[language];
    return (
        <IntlProvider
            messages={locale.message}
            locale={locale.locale}
            defaultLocale={locales.pt.locale}
        >
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
                <Box
                    sx={{
                        backgroundColor: lightTheme.palette.background.paper,
                    }}
                >
                    <Header setLanguage={setLanguage} language={language} />
                    <Container
                        maxWidth={'lg'}
                        sx={{
                            backgroundColor:
                                lightTheme.palette.background.default,
                            minHeight: '100vh',
                        }}
                    >
                        <Outlet />
                    </Container>
                </Box>
            </ThemeProvider>
        </IntlProvider>
    );
}
