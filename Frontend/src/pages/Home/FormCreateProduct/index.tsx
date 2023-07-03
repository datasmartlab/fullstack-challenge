import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { createProduct } from '../../../services/ProductApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';

interface newProductData {
    name: string;
    price: string;
    description: string;
}

const newProductValidationSchema = zod.object({
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

interface FormProps {
    setVisibleForm: (valor: boolean) => void;
}

export function FormProduct({ setVisibleForm }: FormProps) {
    const newProductForm = useForm<Product>({
        resolver: zodResolver(newProductValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newProductForm;
    const [loding, setLoding] = useState(false);

    async function handleCreateProduct(data: newProductData) {
        try {
            setLoding(true);
            const response = await createProduct(data);
            if (response.status === 201) {
                setVisibleForm(false);
                toast.success(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    toast.error(error.response.data.message);
                }
            }
        }
        setLoding(false);
    }

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: 2,
                boxShadow: `0 0 0 100vw rgba(0, 0, 0, 0.6)`,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 2,
                    backgroundColor: '#ffffff',
                    paddingX: '1rem',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Button
                        disabled={loding}
                        sx={{ marginTop: '1rem' }}
                        color="error"
                        onClick={() => {
                            setVisibleForm(false);
                        }}
                        variant="text"
                    >
                        <Close sx={{ fontSize: '3rem' }} />
                    </Button>
                </Box>
                <Typography
                    variant="h4"
                    sx={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    Formulário de Adição de produtos
                </Typography>
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <TextField
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
                        helperText={errors.price?.message}
                        type="text"
                        sx={{ width: '20%' }}
                        variant={'outlined'}
                        label={'Preço'}
                        {...register('price', { required: true })}
                    />
                    <TextField
                        error={errors.description?.message ? true : false}
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
                        color={'success'}
                        disabled={loding}
                        sx={{ marginBottom: '2rem' }}
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        {loding ? 'Adicionando...' : 'Adicionar Produto'}
                    </Button>
                </form>
            </Box>
        </Box>
    );
}
