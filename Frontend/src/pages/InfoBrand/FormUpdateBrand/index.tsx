import { Button, Grid, TextField } from '@mui/material';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateBrand } from '../../../services/BrandApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useIntl } from '../../../translate/useTranslate';

interface BrandData {
    id: number | string;
    name: string;
}

const newBrandValidationSchema = zod.object({
    id: zod.number(),
    name: zod.string().min(2, 'O nome é obrigatório'),
});

type Product = zod.infer<typeof newBrandValidationSchema>;

interface formUpdateProductProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setBrand: React.Dispatch<React.SetStateAction<BrandData | undefined>>;
    brand: BrandData;
}

export function FormUpdateBrand({
    setLoading,
    setBrand,
    brand,
    loading,
}: formUpdateProductProps) {
    const { formatMessage } = useIntl();
    const newProductForm = useForm<Product>({
        resolver: zodResolver(newBrandValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newProductForm;
    async function handleUpdateProduct(data: BrandData) {
        try {
            setLoading(true);
            const response = await updateBrand(data);
            if (response.status === 200) {
                setBrand(data);
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
        <Grid item sx={{ marginTop: '2rem' }} lg={12}>
            <form onSubmit={handleSubmit(handleUpdateProduct)}>
                <input
                    defaultValue={brand.id}
                    type="hidden"
                    {...register('id', {
                        required: true,
                        valueAsNumber: true,
                    })}
                />
                <TextField
                    defaultValue={brand.name}
                    error={errors.name?.message ? true : false}
                    helperText={errors.name?.message}
                    type="text"
                    fullWidth
                    sx={{
                        marginRight: '5%',
                        marginBottom: '2rem',
                    }}
                    variant={'outlined'}
                    label={formatMessage({ id: 'formProductNameLabel' })}
                    placeholder={formatMessage({
                        id: 'formProductNamePlaceholder',
                    })}
                    {...register('name', { required: true })}
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
                        ? formatMessage({
                              id: 'formUpdateProductButtonLoading',
                          })
                        : formatMessage({
                              id: 'formUpdateProductButton',
                          })}
                </Button>
            </form>
        </Grid>
    );
}
