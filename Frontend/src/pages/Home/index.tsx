import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';
import { TableProduct } from './TableProduct';
import { useIntl } from '../../translate/useTranslate';
import { actions } from '../../redux/products/slice';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
    brandData: { id: number; name: string };
}

interface ProductProps {
    list: productData[];
    loading: boolean;
    pagination: {
        count: number;
        offset: number;
        limit: number;
        filter: {
            name: string;
            price: string;
        };
    };
}

export function Home() {
    const { formatMessage } = useIntl();
    const { getProductRequest } = actions;
    const dispatch = useDispatch();

    const { list, loading, pagination }: ProductProps = useSelector(
        (state: RootState) => state.products,
    );

    const [limit, setLimit] = useState(pagination.limit);
    const [offset, setOffset] = useState(pagination.offset);
    const [visibleForm, setVisibleForm] = useState(false);
    const [filter, setFilter] = useState(pagination.filter);
    useEffect(() => {
        if (!visibleForm) {
            if (!list.length && offset) {
                setOffset(0);
            }
            dispatch(getProductRequest(offset, limit, filter));
        }
    }, [
        dispatch,
        visibleForm,
        limit,
        offset,
        filter,
        list.length,
        getProductRequest,
    ]);
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
                        data={list}
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

                        {visibleForm && (
                            <FormProduct
                                visibleForm={visibleForm}
                                setVisibleForm={setVisibleForm}
                            />
                        )}
                    </Box>
                </>
            )}
        </Box>
    );
}
