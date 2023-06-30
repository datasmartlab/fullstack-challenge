import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequested } from '../../redux/products/actions';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';
import { TableProduct } from './tableProduct';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
}
export function Home() {
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
    const [filter, setFilter] = useState('');
    useEffect(() => {
        if (!visibleForm) {
            dispatch(fetchProductsRequested(offset, limit, filter));
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
                    <Typography variant="h3" align="center">
                        Lista De Produtos
                    </Typography>
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
                            Nenhum Produto foi Cadastrado
                        </Typography>
                    )}
                    <Box sx={{ height: '100%' }}>
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
                            Adicionar Produto
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
                                <FormProduct setVisibleForm={setVisibleForm} />
                            </Box>
                        ) : null}
                    </Box>
                </>
            )}
        </Box>
    );
}
