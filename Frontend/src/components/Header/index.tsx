import { DarkMode, LightMode } from '@mui/icons-material';
import { Typography, Box, Button } from '@mui/material';

interface HeaderProps {
    handleThemeChange: () => void;
    darkTheme: boolean;
}

export function Header({ handleThemeChange, darkTheme }: HeaderProps) {
    return (
        <Box
            sx={{
                backgroundColor: 'grey',
                height: '3rem',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" fontWeight={'bold'}>
                Mercadinho
            </Typography>
            <Button
                size="large"
                sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    marginTop: '0.8rem',
                    marginRight: '1rem',
                }}
                variant="contained"
                onClick={handleThemeChange}
            >
                {darkTheme ? <DarkMode /> : <LightMode />}
            </Button>
        </Box>
    );
}
