import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, CircularProgress } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import DeleteDialog from './DeleteDialog';
import { toast } from 'react-toastify';
import { showBrand, deleteBrand } from '../../services/BrandApi';
import axios from 'axios';
import { FormUpdateBrand } from './FormUpdateBrand';

interface BrandData {
    id: number | string;
    name: string;
}

export function InfoBrand() {
    const { id } = useParams();
    const navigator = useNavigate();

    const [product, setBrand] = useState<BrandData>();
    const [loading, setLoading] = useState(true);
    const [Alert, setAlert] = useState(false);
    const getBrand = useCallback(async (id: string) => {
        try {
            const ID = parseInt(id);
            const BrandData = await showBrand(ID);
            setBrand(BrandData);
        } catch (error) {
            return toast.error(error + '');
        }
    }, []);

    useEffect(() => {
        if (id) {
            getBrand(id);
        }
        setLoading(false);
    }, [getBrand, id]);

    async function handleDeleteProduct() {
        try {
            if (!product) {
                return toast.error('Sem ID');
            }
            const response = await deleteBrand(product?.id);
            if (response.status === 200) {
                navigator('/marca');
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
                        <FormUpdateBrand
                            setLoading={setLoading}
                            loading={loading}
                            setBrand={setBrand}
                            brand={product}
                        />
                    </>
                )}
            </Grid>
        </Box>
    );
}
