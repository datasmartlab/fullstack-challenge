import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequested } from '../../redux/products/actions';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';
import { TableProduct } from './TableProduct';
import { useIntl } from '../../translate/useTranslate';
import { TableFilter } from './FilterTableProduct';
import { fetchBrandsRequested } from '../../redux/brands/actions';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
    brandDatum: { name: string };
}

export function Home() {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const results: productData[] = useSelector(
        (state: RootState) => state.products.list,
    );
    const pagination = useSelector(
        (state: RootState) => state.products.pagination,
    );
    const [limit, setLimit] = useState(pagination.limit);
    const [offset, setOffset] = useState(pagination.offset);
    const loading = useSelector((state: RootState) => state.products.loading);
    const [visibleForm, setVisibleForm] = useState(false);
    const [filter, setFilter] = useState(pagination.filter);

    useEffect(() => {
        if (!visibleForm) {
            dispatch(fetchProductsRequested(offset, limit, filter));
            dispatch(fetchBrandsRequested());
        }
    }, [dispatch, visibleForm, limit, offset, filter]);

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
                        {formatMessage({ id: 'homeTitle' })}
                    </Typography>
                    <TableFilter
                        pagination={pagination}
                        setFilter={setFilter}
                    />
                    {results.length != 0 ? (
                        <>
                            <TableProduct
                                data={results}
                                setLimit={setLimit}
                                setOffset={setOffset}
                                pagination={pagination}
                            />
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
                                id: 'homeNoProduct',
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
                                id: 'homeCreateProductButton',
                            })}
                        </Button>
                        {visibleForm ? (
                            <FormProduct setVisibleForm={setVisibleForm} />
                        ) : null}
                    </Box>
                </>
            )}
        </Box>
    );
}
