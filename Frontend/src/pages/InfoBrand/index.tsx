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

    const [brand, setBrand] = useState<BrandData>();
    const [loading, setLoading] = useState(true);
    const [Alert, setAlert] = useState(false);

    const getBrand = useCallback(
        async (id: string) => {
            try {
                const ID = parseInt(id);
                const BrandData = await showBrand(ID);
                setBrand(BrandData);
            } catch (error) {
                navigator('/brand');
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.message);
                }
            }
        },
        [navigator],
    );

    async function handleDeletebrand() {
        try {
            if (!brand) {
                return toast.error('Sem ID');
            }
            const response = await deleteBrand(brand?.id);

            navigator('/brand');
            toast.success(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            }
        }
    }

    useEffect(() => {
        if (id) {
            getBrand(id);
        }
        setLoading(false);
    }, [getBrand, id]);

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
                            navigator('/brand');
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
                            display: brand ? 'block' : 'none',
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
                {!brand ? (
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
                            deleteBrand={handleDeletebrand}
                            onClose={() => setAlert(false)}
                            OpenDialogDelete={Alert}
                            name={brand.name}
                        />
                        <FormUpdateBrand
                            setLoading={setLoading}
                            loading={loading}
                            setBrand={setBrand}
                            brand={brand}
                        />
                    </>
                )}
            </Grid>
        </Box>
    );
}
