import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { createProduct } from '../../../services/ProductApi';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import { useIntl } from '../../../translate/useTranslate';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

interface BrandData {
    id: number;
    name: string;
}

interface newProductData {
    name: string;
    price: string;
    description: string;
    brand: number | string;
}

const newProductValidationSchema = zod.object({
    name: zod.string().min(2, 'O nome é obrigatório'),
    price: zod
        .string()
        .refine(
            (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
            'O preço deve ser um número válido e maior que zero',
        ),
    description: zod.string(),
    brand: zod.string(),
});

type Product = zod.infer<typeof newProductValidationSchema>;

interface FormProps {
    setVisibleForm: (valor: boolean) => void;
}

export function FormProduct({ setVisibleForm }: FormProps) {
    const { formatMessage } = useIntl();
    const brands: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );
    const {
        handleSubmit,
        register,
        control, // Importar o control do useForm
        formState: { errors },
    } = useForm<Product>({
        resolver: zodResolver(newProductValidationSchema),
    });
    const [loading, setLoading] = useState(false);
    async function handleCreateProduct(data: newProductData) {
        try {
            setLoading(true);
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
        setLoading(false);
    }

    return (
        <Dialog
            maxWidth={false}
            open={true}
            onClose={() => setVisibleForm(false)}
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
                            setVisibleForm(false);
                        }}
                        variant="text"
                    >
                        <Close sx={{ fontSize: '3rem' }} />
                    </Button>
                </Box>

                {formatMessage({ id: 'formCreateProductTitle' })}
            </DialogTitle>
            <DialogContent>
                <form
                    style={{ marginTop: '0.5rem' }}
                    onSubmit={handleSubmit(handleCreateProduct)}
                >
                    <TextField
                        error={errors.name?.message ? true : false}
                        helperText={errors.name?.message}
                        type="text"
                        sx={{
                            width: '55%',
                            marginRight: '2.5%',
                            marginBottom: '2rem',
                        }}
                        variant="outlined"
                        label={formatMessage({ id: 'formProductNameLabel' })}
                        placeholder={formatMessage({
                            id: 'formProductNamePlaceholder',
                        })}
                        {...register('name', { required: true })}
                    />
                    {brands.length == 0 ? (
                        <Button
                            color="secondary"
                            variant="outlined"
                            sx={{
                                width: '20%',
                                marginRight: '2.5%',
                            }}
                        >
                            Adicionar Marca
                        </Button>
                    ) : (
                        <FormControl
                            sx={{
                                width: '20%',
                                marginRight: '2.5%',
                            }}
                        >
                            <InputLabel>Marca</InputLabel>
                            <Controller
                                name="brand"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Marca"
                                        onChange={(event) =>
                                            field.onChange(event.target.value)
                                        }
                                        defaultValue={''}
                                        disabled={brands.length == 0}
                                    >
                                        {brands.map((brand) => (
                                            <MenuItem
                                                key={brand.id}
                                                value={brand.id}
                                            >
                                                {brand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                        </FormControl>
                    )}
                    <TextField
                        error={errors.price?.message ? true : false}
                        helperText={errors.price?.message}
                        type="text"
                        sx={{ width: '20%' }}
                        variant="outlined"
                        label={formatMessage({ id: 'formProductPriceLabel' })}
                        {...register('price', {
                            required: true,
                        })}
                        placeholder={formatMessage({
                            id: 'formProductPricePlaceholder',
                        })}
                    />
                    <TextField
                        error={errors.description?.message ? true : false}
                        helperText={errors.description?.message}
                        type="text"
                        variant="outlined"
                        sx={{ marginBottom: '2rem' }}
                        multiline
                        fullWidth
                        inputProps={{ maxLength: 250 }}
                        maxRows={3}
                        label={formatMessage({
                            id: 'formProductDescriptionLabel',
                        })}
                        placeholder={formatMessage({
                            id: 'formProductDescriptionPlaceholder',
                        })}
                        {...register('description')}
                    />
                    <Button
                        size="large"
                        color="success"
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        style={{ marginTop: '1rem' }}
                        fullWidth
                    >
                        {loading ? 'Adicionando...' : 'Adicionar Produto'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
