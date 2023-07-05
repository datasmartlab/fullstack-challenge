import { createTheme } from '@mui/material/styles';
import { blue, grey, red } from '@mui/material/colors';

const lightTheme = createTheme({
    typography: {
        fontFamily: 'Roboto Mono, sans-serif',
    },
    palette: {
        info: {
            main: grey[500],
            light: grey[500],
            dark: grey[700],
            contrastText: '#ffffff',
        },
        primary: {
            main: grey[800],
        },
        secondary: {
            main: blue[700],
            dark: blue[900],
            contrastText: '#ffffff',
        },
        error: {
            main: red[700],
        },
        background: {
            default: grey[300],
            paper: grey[200],
        },
    },
});

export default lightTheme;
