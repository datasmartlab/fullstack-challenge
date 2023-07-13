import { Box, Button, TextField } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Dispatch, SetStateAction, useState } from 'react';
import { useIntl } from '../../../../translate/useTranslate';

interface TableProductFilterProps {
    setFilter: Dispatch<SetStateAction<string>>;
    filter: string;
}

export function FilterTableBrand({
    setFilter,
    filter,
}: TableProductFilterProps) {
    const [name, setName] = useState(filter);
    const { formatMessage } = useIntl();

    function handleSeachProduct() {
        setFilter(name);
    }

    function handleFormClean() {
        setName('');
        setFilter('');
    }

    return (
        <Box
            marginBottom={2}
            sx={{
                display: 'flex',
                height: '3rem',
                gap: '1%',
            }}
        >
            <TextField
                sx={{
                    width: '70%',
                    marginBottom: 0,
                }}
                inputProps={{
                    style: {
                        height: '3rem',
                        padding: 0,
                        paddingLeft: '0.5rem',
                    },
                }}
                InputLabelProps={{
                    style: {
                        lineHeight: '1rem',
                    },
                }}
                label={formatMessage({
                    id: 'filterBrandNameLabel',
                })}
                value={name}
                onChange={(envent) => {
                    setName(envent.target.value);
                }}
                placeholder={formatMessage({
                    id: 'filterBrandNamePlaceholder',
                })}
            />
            <Button
                variant="contained"
                sx={{ width: '5%' }}
                color="error"
                onClick={handleFormClean}
            >
                <CleaningServicesIcon />
            </Button>
            <Button
                variant="contained"
                sx={{ width: '30%' }}
                color="success"
                onClick={handleSeachProduct}
            >
                {formatMessage({
                    id: 'filterBrandButton',
                })}
            </Button>
        </Box>
    );
}
