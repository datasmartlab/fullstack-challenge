import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequested } from '../../redux/products/actions';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';
import { TableProduct } from './TableProduct';
import { useIntl } from '../../translate/useTranslate';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
    brandDatum: { name: string };
}

export function Home() {
    const results: productData[] = useSelector(
        (state: RootState) => state.products.list,
    );
    const pagination = useSelector(
        (state: RootState) => state.products.pagination,
    );

    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [limit, setLimit] = useState(pagination.limit);
    const [offset, setOffset] = useState(pagination.offset);
    const loading = useSelector((state: RootState) => state.products.loading);
    const [visibleForm, setVisibleForm] = useState(false);
    const [filter, setFilter] = useState(pagination.filter);

    useEffect(() => {
        if (!visibleForm) {
            if (!results.length && offset) {
                setOffset(0);
            }
            dispatch(fetchProductsRequested(offset, limit, filter));
        }
    }, [dispatch, visibleForm, limit, offset, filter, results.length]);
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

                    <TableProduct
                        setFilter={setFilter}
                        data={results}
                        setLimit={setLimit}
                        setOffset={setOffset}
                        pagination={pagination}
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
                                id: 'homeCreateProductButton',
                            })}
                        </Button>

                        <FormProduct
                            visibleForm={visibleForm}
                            setVisibleForm={setVisibleForm}
                        />
                    </Box>
                </>
            )}
        </Box>
    );
}
