import { Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useIntl } from '../../translate/useTranslate';

export function Header() {
    const { formatMessage } = useIntl();
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
                align="center"
            >
                {formatMessage({ id: 'headerTitle' })}
            </Typography>
        </Box>
    );
}
