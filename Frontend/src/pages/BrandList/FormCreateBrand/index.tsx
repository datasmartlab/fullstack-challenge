import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { createBrand } from '../../../services/BrandApi';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import { useIntl } from '../../../translate/useTranslate';

interface newBrandData {
    name: string;
}

const newBrandValidationSchema = zod.object({
    name: zod.string().min(2, 'O nome é obrigatório'),
});

type Brand = zod.infer<typeof newBrandValidationSchema>;

interface FormProps {
    setVisibleForm: (valor: boolean) => void;
}

export function FormCreateBrand({ setVisibleForm }: FormProps) {
    const { formatMessage } = useIntl();
    const newBrandForm = useForm<Brand>({
        resolver: zodResolver(newBrandValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newBrandForm;
    const [loding, setLoding] = useState(false);

    async function handleCreateBrand(data: newBrandData) {
        try {
            setLoding(true);
            const response = await createBrand(data);
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
                    {formatMessage({ id: 'formCreateProductTitle' })}
                </Typography>
                <form onSubmit={handleSubmit(handleCreateBrand)}>
                    <TextField
                        error={errors.name?.message ? true : false}
                        helperText={errors.name?.message}
                        fullWidth
                        type="text"
                        sx={{
                            marginRight: '5%',
                            marginBottom: '2rem',
                        }}
                        variant={'outlined'}
                        label={formatMessage({
                            id: 'formProductNameLabel',
                        })}
                        placeholder={formatMessage({
                            id: 'formProductNamePlaceholder',
                        })}
                        {...register('name', { required: true })}
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
