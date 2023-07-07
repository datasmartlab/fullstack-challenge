import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsRequested } from '../../redux/brands/actions';
import { RootState } from '../../redux/store';
import { FormCreateBrand } from './FormCreateBrand';
import { TableProduct } from './TableBrand';
import { useIntl } from '../../translate/useTranslate';
import { FilterTableBrand } from './FilterTableBrand';

interface BrandData {
    id: number;
    name: string;
}

export function BrandList() {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const results: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );

    const loading = useSelector((state: RootState) => state.brands.loading);
    const [filter, setFilter] = useState(
        useSelector((state: RootState) => state.brands.filter),
    );
    const [visibleForm, setVisibleForm] = useState(false);

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
                    <FilterTableBrand filter={filter} setFilter={setFilter} />
                    {results.length != 0 ? (
                        <>
                            <TableProduct data={results} />
                        </>
                    ) : (
                        <Typography
                            color={'error'}
                            sx={{
                                fontSize: '2rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {formatMessage({
                                id: 'ListBrandNoBrand',
                            })}
                        </Typography>
                    )}
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
                        {visibleForm ? (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: '9999',
                                }}
                            >
                                <FormCreateBrand
                                    setVisibleForm={setVisibleForm}
                                />
                            </Box>
                        ) : null}
                    </Box>
                </>
            )}
        </Box>
    );
}
