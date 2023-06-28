import {
    Typography,
    List,
    ListItemButton,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsRequested } from '../../redux/products/actions';
import { RootState } from '../../redux/store';
import { FormProduct } from './FormCreateProduct';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
}

export function Home() {
    const dispatch = useDispatch();
    const navigator = useNavigate();

    const results: productData[] = useSelector(
        (state: RootState) => state.products,
    );

    const [loading, setLoading] = useState(true);
    const [visibleForm, setVisibleForm] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsRequested());
        setLoading(false);
    }, [dispatch]);
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
                    <Typography sx={{ fontSize: '4rem', textAlign: 'center' }}>
                        Lista De Produtos
                    </Typography>
                    {results.length != 0 ? (
                        <>
                            <List>
                                {results.map((item) => {
                                    return (
                                        <ListItemButton
                                            key={item.id}
                                            onClick={() => {
                                                navigator(
                                                    `/infoProduct/${item.id}`,
                                                );
                                            }}
                                        >
                                            <Typography fontSize={'2rem'}>
                                                Nome: {item.name}
                                                price: {item.price}
                                                desc:{item.description}
                                            </Typography>
                                        </ListItemButton>
                                    );
                                })}
                            </List>
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
                            onClick={() => {
                                setVisibleForm(true);
                            }}
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
