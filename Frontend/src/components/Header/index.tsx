import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';

export function Header() {
    return (
        <Box
            sx={{
                backgroundColor: grey[500],
                height: '100%',
            }}
        >
            <Typography
                variant="h4"
                sx={{ paddingY: '0.5rem', marginLeft: '0.5rem' }}
                fontWeight={'bold'}
            >
                Mercadinho
            </Typography>
        </Box>
    );
}
