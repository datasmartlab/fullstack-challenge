import { useEffect, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, TextField, CircularProgress } from '@mui/material';
import { ArrowBack, Delete } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DeleteDialog from './DeleteDialog';
import {
    showProduct,
    deleteProduct,
    updateProduct,
} from '../../services/ProductApi';
import axios from 'axios';

interface productData {
    id: number | string;
    name: string;
    price: string;
    description: string;
}
const newProductValidationSchema = zod.object({
    id: zod.number(),
    name: zod.string().min(2, 'O nome é obrigatório'),
    price: zod
        .string()
        .refine(
            (value) => !isNaN(parseFloat(value)),
            'O preço deve ser um número válido',
        ),
    description: zod.string(),
});
type Product = zod.infer<typeof newProductValidationSchema>;

export function InfoProduct() {
    const newProductForm = useForm<Product>({
        resolver: zodResolver(newProductValidationSchema),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newProductForm;
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
    async function handleUpdateProduct(data: productData) {
        try {
            setLoading(true);
            const response = await updateProduct(data);
            if (response.status === 200) {
                setProduct(data);
                toast.success(response.data.message);
            } else {
                toast.warning(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            }
            setLoading(false);
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

                        <Grid item sx={{ marginTop: '2rem' }} lg={12}>
                            <form onSubmit={handleSubmit(handleUpdateProduct)}>
                                <input
                                    defaultValue={product.id}
                                    type="hidden"
                                    {...register('id', {
                                        required: true,
                                        valueAsNumber: true,
                                    })}
                                />
                                <TextField
                                    defaultValue={product.name}
                                    error={errors.name?.message ? true : false}
                                    helperText={errors.name?.message}
                                    type="text"
                                    sx={{
                                        width: '75%',
                                        marginRight: '5%',
                                        marginBottom: '2rem',
                                    }}
                                    variant={'outlined'}
                                    label={'Nome'}
                                    {...register('name', { required: true })}
                                />
                                <TextField
                                    error={errors.price?.message ? true : false}
                                    defaultValue={product.price}
                                    helperText={errors.price?.message}
                                    type="text"
                                    sx={{ width: '20%' }}
                                    variant={'outlined'}
                                    label={'Preço'}
                                    {...register('price', { required: true })}
                                />
                                <TextField
                                    defaultValue={product.description}
                                    error={
                                        errors.description?.message
                                            ? true
                                            : false
                                    }
                                    helperText={errors.description?.message}
                                    type="text"
                                    variant={'outlined'}
                                    sx={{ marginBottom: '2rem' }}
                                    multiline
                                    inputProps={{ maxLength: 250 }}
                                    maxRows={3}
                                    label={'Descrição'}
                                    fullWidth
                                    {...register('description')}
                                />
                                <Button
                                    size="large"
                                    color={'warning'}
                                    disabled={loading}
                                    sx={{ marginBottom: '2rem' }}
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                >
                                    {loading
                                        ? 'Alterando...'
                                        : 'Alterar Produto'}
                                </Button>
                            </form>
                        </Grid>
                    </>
                )}
            </Grid>
        </Box>
    );
}
