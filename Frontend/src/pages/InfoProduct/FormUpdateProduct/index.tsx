import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { updateProduct } from '../../../services/ProductApi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useIntl } from '../../../translate/useTranslate';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FormCreateBrand } from '../../BrandList/FormCreateBrand';
import { fetchBrandsRequested } from '../../../redux/brands/actions';

interface productData {
    id: number;
    name: string;
    price: string;
    description: string;
    brandId: number | string;
}
interface BrandData {
    id?: number | string;
    name: string;
}

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
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const ProductValidationSchema = zod.object({
        id: zod.number(),
        name: zod
            .string()
            .min(2, formatMessage({ id: 'formProductValidationName' })),
        price: zod
            .string()
            .refine(
                (value) => !isNaN(parseFloat(value)),
                formatMessage({ id: 'formProductValidationPrice' }),
            ),
        description: zod.string(),
        brandId: zod.string(),
    });

    type Product = zod.infer<typeof ProductValidationSchema>;

    const brands: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );

    const newProductForm = useForm<Product>({
        resolver: zodResolver(ProductValidationSchema),
    });
    const {
        handleSubmit,
        register,
        formState: { errors },
        control,
    } = newProductForm;

    const [visibleFormBrand, setVisibleFormBrand] = useState(false);

    useEffect(() => {
        dispatch(fetchBrandsRequested());
    }, [visibleFormBrand, dispatch]);

    async function handleUpdateProduct(data: productData) {
        try {
            setLoading(true);
            const response = await updateProduct(data);
            setProduct(data);
            toast.success(response.data.message);
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
                        width: '45%',
                        marginRight: '2.5%',
                        marginBottom: '2rem',
                    }}
                    variant={'outlined'}
                    label={formatMessage({ id: 'formProductNameLabel' })}
                    placeholder={formatMessage({
                        id: 'formProductNamePlaceholder',
                    })}
                    {...register('name', { required: true })}
                />
                <FormControl
                    sx={{
                        width: '30%',
                        marginRight: '2.5%',
                    }}
                >
                    <InputLabel>
                        {formatMessage({
                            id: 'formProductBrandLabel',
                        })}
                    </InputLabel>
                    <Controller
                        defaultValue={
                            product.brandId ? product.brandId.toString() : ''
                        }
                        name="brandId"
                        control={control}
                        render={({ field }) => (
                            <Select
                                defaultValue={
                                    product.brandId
                                        ? product.brandId.toString()
                                        : ''
                                }
                                {...field}
                                label={formatMessage({
                                    id: 'formProductBrandLabel',
                                })}
                                onChange={(event) =>
                                    field.onChange(
                                        event.target.value.toString(),
                                    )
                                }
                            >
                                {brands.map((brand) => (
                                    <MenuItem key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </MenuItem>
                                ))}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        sx={{ width: '90%' }}
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => {
                                            setVisibleFormBrand(true);
                                        }}
                                    >
                                        {formatMessage({
                                            id: 'formProductBrandButton',
                                        })}
                                    </Button>
                                </Box>
                            </Select>
                        )}
                    />
                </FormControl>
                <TextField
                    error={errors.price?.message ? true : false}
                    defaultValue={product.price}
                    helperText={errors.price?.message}
                    type="text"
                    sx={{ width: '20%' }}
                    variant={'outlined'}
                    label={formatMessage({ id: 'formProductPriceLabel' })}
                    placeholder={formatMessage({
                        id: 'formProductPricePlaceholder',
                    })}
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
                    label={formatMessage({ id: 'formProductDescriptionLabel' })}
                    placeholder={formatMessage({
                        id: 'formProductDescriptionPlaceholder',
                    })}
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
                        ? formatMessage({
                              id: 'formUpdateProductButtonLoading',
                          })
                        : formatMessage({
                              id: 'formUpdateProductButton',
                          })}
                </Button>
            </form>
            <FormCreateBrand
                visibleForm={visibleFormBrand}
                setVisibleForm={setVisibleFormBrand}
            />
        </Grid>
    );
}
