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
import { useEffect, useState } from 'react';
import { createProduct } from '../../../services/productApi';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';
import { useIntl } from '../../../translate/useTranslate';
import { RootState } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormCreateBrand } from '../../BrandList/FormCreateBrand';
import { actions } from '../../../redux/brands/slice';

interface BrandData {
    id: number;
    name: string;
}

interface NewProductData {
    id?: number;
    name: string;
    price: string;
    description: string;
    brandId: number | string | null;
}

interface FormProps {
    setVisibleForm: (valor: boolean) => void;
    visibleForm: boolean;
}

export function FormProduct({ setVisibleForm, visibleForm }: FormProps) {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const { getBrandRequest } = actions;

    const brands: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );

    const [loading, setLoading] = useState(false);
    const [visibleFormBrand, setVisibleFormBrand] = useState(false);

    const newProductValidationSchema = zod.object({
        name: zod
            .string()
            .min(2, formatMessage({ id: 'formProductValidationName' })),
        price: zod
            .string()
            .refine(
                (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0,
                formatMessage({ id: 'formProductValidationPrice' }),
            ),
        description: zod.string(),
        brandId: zod.union([zod.number(), zod.string(), zod.null()]),
    });

    type Product = zod.infer<typeof newProductValidationSchema>;

    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
    } = useForm<Product>({
        resolver: zodResolver(newProductValidationSchema),
    });

    async function handleCreateProduct(data: NewProductData) {
        try {
            setLoading(true);

            const response = await createProduct(data);

            setVisibleForm(false);
            toast.success(response.data.message);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        dispatch(getBrandRequest());
    }, [visibleFormBrand, dispatch, getBrandRequest]);
    return (
        <>
            <Dialog
                maxWidth={false}
                open={visibleForm}
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
                                width: '45%',
                                marginRight: '2.5%',
                                marginBottom: '2rem',
                            }}
                            variant="outlined"
                            label={formatMessage({
                                id: 'formProductNameLabel',
                            })}
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
                                defaultValue={''}
                                name="brandId"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label={formatMessage({
                                            id: 'formProductBrandLabel',
                                        })}
                                        onChange={(event) => {
                                            field.onChange(event.target.value);
                                        }}
                                    >
                                        {brands.map((brand) => (
                                            <MenuItem
                                                key={brand.id}
                                                value={brand.id}
                                            >
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
                            helperText={errors.price?.message}
                            type="text"
                            sx={{ width: '20%' }}
                            variant="outlined"
                            label={formatMessage({
                                id: 'formProductPriceLabel',
                            })}
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
                            {loading
                                ? formatMessage({
                                      id: 'formCreateProductButtonLoading',
                                  })
                                : formatMessage({
                                      id: 'formCreateProductButton',
                                  })}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            {visibleForm && (
                <FormCreateBrand
                    visibleForm={visibleFormBrand}
                    setVisibleForm={setVisibleFormBrand}
                />
            )}
        </>
    );
}
