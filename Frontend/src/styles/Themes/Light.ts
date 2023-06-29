import { createTheme } from '@mui/material/styles';
import { lightBlue, grey, red } from '@mui/material/colors';

const lightTheme = createTheme({
    palette: {
        info: {
            main: grey['A700'],
            light: grey[900],
        },
        primary: {
            main: grey[200],
            dark: grey[50],
            contrastText: red['A700'],
        },
        error: {
            main: red['A700'],
        },
        secondary: {
            main: lightBlue['A700'],
        },
    },
});

lightTheme.typography.h3 = {
    fontSize: '2.4rem',
    '@media (min-width:600px)': {
        fontSize: '3rem',
    },
    '@media (min-width:900px)': {
        fontSize: '3.4rem',
    },
};
lightTheme.typography.h4 = {
    fontSize: '1.8rem',
    '@media (min-width:600px)': {
        fontSize: '2.4rem',
    },
    '@media (min-width:900px)': {
        fontSize: '3.4rem',
    },
};
lightTheme.typography.body1 = {
    fontSize: '1.4rem',
    '@media (min-width:600px)': {
        fontSize: '2.8rem',
    },
    '@media (min-width:900px)': {
        fontSize: '3.4rem',
    },
};

export default lightTheme;
