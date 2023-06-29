import { grey, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const DarkTheme = createTheme({
    palette: {
        info: {
            main: grey[400],
            light: grey[50],
        },
        primary: {
            main: grey[900],
            dark: grey[800],
            contrastText: red['A700'],
        },
        error: {
            main: red['A700'],
        },
        secondary: {
            main: red['A700'],
        },
    },
});

DarkTheme.typography.h3 = {
    fontSize: '2.4rem',
    '@media (min-width:600px)': {
        fontSize: '3rem',
    },
    '@media (min-width:900px)': {
        fontSize: '3.4rem',
    },
};
DarkTheme.typography.h4 = {
    fontSize: '1.8rem',
    '@media (min-width:600px)': {
        fontSize: '2.4rem',
    },
    '@media (min-width:900px)': {
        fontSize: '3.4rem',
    },
};
DarkTheme.typography.body1 = {
    fontSize: '0.7rem',
    '@media (min-width:600px)': {
        fontSize: '1.3rem',
    },
    '@media (min-width:900px)': {
        fontSize: '2rem',
    },
};

export default DarkTheme;
