import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, CircularProgress } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import DeleteDialog from './DeleteDialog';

import { toast } from 'react-toastify';

import { showProduct, deleteProduct } from '../../services/ProductApi';
import axios from 'axios';
import { FormUpdateProduct } from './FormUpdateProduct';

interface productData {
    id: number | string;
    name: string;
    price: string;
    description: string;
}

export function InfoProduct() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [product, setProduct] = useState<productData>();
    const [loading, setLoading] = useState(true);
    const [Alert, setAlert] = useState(false);
    const getProduct = useCallback(async (id: string) => {
        try {
            const ID = parseInt(id);
            const productData = await showProduct(ID);
            setProduct(productData);
        } catch (error) {
            return toast.error(error + '');
        }
    }, []);

    useEffect(() => {
        if (id) {
            getProduct(id);
        }
        setLoading(false);
    }, [getProduct, id]);

    async function handleDeleteProduct() {
        try {
            if (!product) {
                return toast.error('Sem ID');
            }
            const response = await deleteProduct(product?.id);
            if (response.status === 200) {
                navigator('/');
                toast.success(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 500) {
                    toast.error(error.response.data.message);
                } else if (error.response?.status === 400) {
                    toast.error(error.response.data.message);
                }
            }
        }
    }

    return (
        <Box>
            <Grid container>
                <Grid item width={'50%'}>
                    <Button
                        color="secondary"
                        size={'large'}
                        disabled={loading}
                        sx={{ marginTop: '1.5rem' }}
                        onClick={() => {
                            navigator('/');
                        }}
                        variant="text"
                    >
                        <ArrowBack sx={{ fontSize: '3rem' }} />
                    </Button>
                </Grid>
                <Grid
                    item
                    width={'50%'}
                    sx={{ display: 'flex', justifyContent: 'end' }}
                >
                    <Button
                        sx={{
                            marginTop: '1.5rem',
                            display: product ? 'block' : 'none',
                        }}
                        disabled={loading}
                        color="error"
                        onClick={() => {
                            setAlert(true);
                        }}
                        variant="text"
                    >
                        <Delete sx={{ fontSize: '3rem' }} />
                    </Button>
                </Grid>
                {!product ? (
                    <Box
                        sx={{
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <CircularProgress size={'10rem'} />
                    </Box>
                ) : (
                    <>
                        <DeleteDialog
                            deleteProduct={handleDeleteProduct}
                            onClose={() => setAlert(false)}
                            Open={Alert}
                            name={product.name}
                        />
                        <FormUpdateProduct
                            setLoading={setLoading}
                            loading={loading}
                            setProduct={setProduct}
                            product={product}
                        />
                    </>
                )}
            </Grid>
        </Box>
    );
}
