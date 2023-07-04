import {
    Typography,
    Button,
    Box,
    CircularProgress,
    TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequested } from '../../redux/products/actions';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';
import { TableProduct } from './tableProduct';
import { useIntl } from '../../translate/useTranslate';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
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
    const [name, setName] = useState(pagination.filter.name);
    const [price, setPrice] = useState(pagination.filter.price);
    useEffect(() => {
        if (!visibleForm) {
            dispatch(fetchProductsRequested(offset, limit, filter));
        }
    }, [dispatch, visibleForm, limit, offset, filter]);

    function handleSeachProduct() {
        setFilter({ name, price });
    }

    function handleFormClean() {
        setName('');
        setPrice('');
        setFilter({ name: '', price: '' });
    }

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
                    <Typography variant="h5" align="center">
                        {formatMessage({ id: 'homeTitle' })}
                    </Typography>
                    <Box
                        marginBottom={2}
                        sx={{ display: 'flex', height: '3rem', gap: '1%' }}
                    >
                        <TextField
                            sx={{
                                width: '59%',
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
                            label={'Nome'}
                            value={name}
                            onChange={(envent) => {
                                setName(envent.target.value);
                            }}
                            placeholder="Digite o nome do produto"
                        />
                        <TextField
                            type="number"
                            sx={{
                                width: '10%',
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
                            label={'Preço'}
                            value={price}
                            onChange={(event) => {
                                const inputValue = event.target.value;
                                if (/^\d*\.?\d*$/.test(inputValue)) {
                                    setPrice(inputValue);
                                }
                            }}
                            placeholder="R$00.00"
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
                            Buscar
                        </Button>
                    </Box>

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
