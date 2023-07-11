import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsRequested } from '../../redux/brands/actions';
import { RootState } from '../../redux/store';
import { FormCreateBrand } from './FormCreateBrand';
import { TableBrand } from './TableBrand';
import { useIntl } from '../../translate/useTranslate';

interface BrandData {
    id: number;
    name: string;
}

export function BrandList() {
    const results: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );
    const loading = useSelector((state: RootState) => state.brands.loading);

    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [visibleForm, setVisibleForm] = useState(false);
    const [filter, setFilter] = useState(
        useSelector((state: RootState) => state.brands.filter),
    );

    useEffect(() => {
        if (!visibleForm) {
            dispatch(fetchBrandsRequested(filter));
        }
    }, [dispatch, visibleForm, filter]);
    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress size={'10rem'} />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center">
                        {formatMessage({ id: 'ListBrandTitle' })}
                    </Typography>

                    <TableBrand
                        filter={filter}
                        setFilter={setFilter}
                        data={results}
                    />

                    <Box sx={{ height: '3rem' }}>
                        <Button
                            size="large"
                            variant="contained"
                            sx={{ alignItems: 'flex-end' }}
                            fullWidth
                            color="secondary"
                            onClick={() => {
                                setVisibleForm(true);
                            }}
                            disabled={visibleForm}
                        >
                            {formatMessage({
                                id: 'ListBrandCreateButton',
                            })}
                        </Button>

                        <FormCreateBrand
                            visibleForm={visibleForm}
                            setVisibleForm={setVisibleForm}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
