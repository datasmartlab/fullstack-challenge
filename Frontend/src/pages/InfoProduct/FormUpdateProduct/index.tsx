import { Button, Grid, TextField } from '@mui/material';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { updateProduct } from '../../../services/ProductApi';
import { toast } from 'react-toastify';
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

interface formUpdateProductProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;
    setProduct: React.Dispatch<React.SetStateAction<productData | undefined>>;
    product: productData;
}

export function FormUpdateProduct({
    setLoading,
    setProduct,
    product,
    loading,
}: formUpdateProductProps) {
    const newProductForm = useForm<Product>({
        resolver: zodResolver(newProductValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = newProductForm;
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
                    color={'warning'}
                    disabled={loading}
                    sx={{ marginBottom: '2rem' }}
                    variant="contained"
                    type="submit"
                    fullWidth
                >
                    {loading ? 'Alterando...' : 'Alterar Produto'}
                </Button>
            </form>
        </Grid>
    );
}
