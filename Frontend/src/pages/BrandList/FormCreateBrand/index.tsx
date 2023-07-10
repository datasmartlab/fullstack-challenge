import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';
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
    setVisibleForm?: (valor: boolean) => void;
    open: boolean;
}

export function FormCreateBrand({ setVisibleForm, open }: FormProps) {
    const { formatMessage } = useIntl();
    const newBrandForm = useForm<Brand>({
        resolver: zodResolver(newBrandValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newBrandForm;
    const [loading, setLoading] = useState(false);

    async function handleCreateBrand(data: newBrandData) {
        try {
            setLoading(true);
            const response = await createBrand(data);
            if (response.status === 201) {
                setVisibleForm ? setVisibleForm(false) : null;
                toast.success(response.data.message);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 409) {
                    toast.error(error.response.data.message);
                }
            }
        }
        setLoading(false);
    }

    return (
        <Dialog
            maxWidth={false}
            open={open}
            onClose={() => (setVisibleForm ? setVisibleForm(false) : null)}
        >
            <DialogTitle variant="h4" align="center">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    <Button
                        disabled={loading}
                        color="error"
                        onClick={() => {
                            setVisibleForm ? setVisibleForm(false) : null;
                        }}
                        variant="text"
                    >
                        <Close sx={{ fontSize: '3rem' }} />
                    </Button>
                </Box>
                {formatMessage({
                    id: 'formCreateBrandTitle',
                })}
            </DialogTitle>
            <DialogContent>
                <form
                    style={{ marginTop: '0.5rem' }}
                    onSubmit={handleSubmit(handleCreateBrand)}
                >
                    <TextField
                        error={errors.name?.message ? true : false}
                        helperText={errors.name?.message}
                        fullWidth
                        type="text"
                        sx={{
                            marginBottom: '2rem',
                        }}
                        variant={'outlined'}
                        label={formatMessage({
                            id: 'formBrandNameLabel',
                        })}
                        placeholder={formatMessage({
                            id: 'formBrandNamePlaceholder',
                        })}
                        {...register('name', { required: true })}
                    />
                    <Button
                        size="large"
                        color={'success'}
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        {loading
                            ? formatMessage({
                                  id: 'formCreateBrandButtonLoading',
                              })
                            : formatMessage({
                                  id: 'formCreateBrandButton',
                              })}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
