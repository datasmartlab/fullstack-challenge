import {
    Typography,
    List,
    ListItemButton,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { readProduct } from '../../services/ProductApi';
import { useNavigate } from 'react-router-dom';

interface productData {
    id: number;
    name: string;
    description: string;
    price: number;
}
export function Home() {
    const navigator = useNavigate();
    const [results, setResults] = useState<productData[]>([]);
    const [loading, setLoading] = useState(true);

    const getProducts = useCallback(async () => {
        const reponse = (await readProduct()).data;
        setResults(reponse);
        setLoading(false);
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts]);
    return (
        <>
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
                                navigator('/addProduct');
                            }}
                        >
                            Adicionar Produto
                        </Button>
                    </Box>
                </>
            )}
        </>
    );
}
