import {
    Typography,
    Button,
    Box,
    CircularProgress,
    TextField,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrandsRequested } from '../../redux/brands/actions';
import { RootState } from '../../redux/store';
import { FormCreateBrand } from './FormCreateBrand';
import { TableProduct } from './TableBrand';
import { useIntl } from '../../translate/useTranslate';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

interface BrandData {
    id: number;
    name: string;
}

export function BrandList() {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const results: BrandData[] = useSelector(
        (state: RootState) => state.brands.list,
    );

    const pagination = useSelector(
        (state: RootState) => state.brands.pagination,
    );

    const loading = useSelector((state: RootState) => state.brands.loading);

    const [limit, setLimit] = useState(pagination.limit);
    const [offset, setOffset] = useState(pagination.offset);
    const [visibleForm, setVisibleForm] = useState(false);
    const [filter, setFilter] = useState(pagination.filter);
    const [name, setName] = useState(pagination.filter);

    useEffect(() => {
        if (!visibleForm) {
            dispatch(fetchBrandsRequested(offset, limit, filter));
        }
    }, [dispatch, visibleForm, limit, offset, filter]);

    function handleSeachProduct() {
        setFilter('');
    }

    function handleFormClean() {
        setName('');
        setFilter('');
    }

    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress size={'10rem'} />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center">
                        {formatMessage({ id: 'ListBrandTitle' })}
                    </Typography>
                    <Box
                        marginBottom={2}
                        sx={{
                            display: 'flex',
                            height: '3rem',
                            gap: '1%',
                        }}
                    >
                        <TextField
                            sx={{
                                width: '100%',
                                marginBottom: 0,
                            }}
                            inputProps={{
                                style: {
                                    height: '3rem',
                                    padding: 0,
                                    paddingLeft: '0.5rem',
                                },
                            }}
                            InputLabelProps={{
                                style: {
                                    lineHeight: '1rem',
                                },
                            }}
                            label={formatMessage({
                                id: 'ListBrandFilterNameLabel',
                            })}
                            value={name}
                            onChange={(envent) => {
                                setName(envent.target.value);
                            }}
                            placeholder={formatMessage({
                                id: 'ListBrandFilterNamePlaceholder',
                            })}
                        />
                        <Button
                            variant="contained"
                            sx={{ width: '5%' }}
                            color="error"
                            onClick={handleFormClean}
                        >
                            <CleaningServicesIcon />
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ width: '30%' }}
                            color="success"
                            onClick={handleSeachProduct}
                        >
                            {formatMessage({
                                id: 'homeFilterButton',
                            })}
                        </Button>
                    </Box>
                    {results.length != 0 ? (
                        <>
                            <TableProduct
                                data={results}
                                setLimit={setLimit}
                                setOffset={setOffset}
                                pagination={pagination}
                            />
                        </>
                    ) : (
                        <Typography
                            color={'error'}
                            sx={{
                                fontSize: '2rem',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem',
                            }}
                        >
                            {formatMessage({
                                id: 'ListBrandNoBrand',
                            })}
                        </Typography>
                    )}
                    <Box sx={{ height: '3rem' }}>
                        <Button
                            size="large"
                            variant="contained"
                            sx={{ alignItems: 'flex-end' }}
                            fullWidth
                            color="secondary"
                            onClick={() => {
                                setVisibleForm(true);
                            }}
                            disabled={visibleForm}
                        >
                            {formatMessage({
                                id: 'ListBrandCreateButton',
                            })}
                        </Button>
                        {visibleForm ? (
                            <Box
                                sx={{
                                    position: 'fixed',
                                    top: '0',
                                    left: '0',
                                    right: '0',
                                    bottom: '0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: '9999',
                                }}
                            >
                                <FormCreateBrand
                                    setVisibleForm={setVisibleForm}
                                />
                            </Box>
                        ) : null}
                    </Box>
                </>
            )}
        </Box>
    );
}
