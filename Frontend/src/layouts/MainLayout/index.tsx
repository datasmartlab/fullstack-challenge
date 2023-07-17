import { Container, Box, ThemeProvider } from '@mui/material';
import { Header } from '../../components/Header';
import { GlobalStyles } from '@mui/styled-engine-sc';
import { Alert } from '../../components/Alert';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import theme from '../../styles/Themes/theme';
import { IntlProvider } from 'react-intl';
import locales from '../../translate/index';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export function DefaultLayout() {
    const [language, setLanguage] = useState(
        useSelector((state: RootState) => state.traslate.language),
    );

    const locale = locales[language];
    return (
        <IntlProvider messages={locale.message} locale={locale.locale}>
            <ThemeProvider theme={theme}>
                <Alert />
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
                        backgroundColor: theme.palette.background.paper,
                    }}
                >
                    <Header language={language} setLanguage={setLanguage} />
                    <Container
                        maxWidth={'lg'}
                        sx={{
                            backgroundColor: theme.palette.background.default,
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
