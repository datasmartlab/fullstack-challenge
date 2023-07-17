import {
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
    Typography,
    useMediaQuery,
    TableCell,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled } from './style';
import { useIntl } from '../../../translate/useTranslate';
import { TableFilter } from './Filter';
import { Dispatch, SetStateAction } from 'react';

interface tableProductProps {
    setFilter: Dispatch<SetStateAction<{ name: string; price: string }>>;
    data?: {
        id: number;
        name: string;
        price: number;
        description: string;
        brandId: number;
        brandData: { name: string };
    }[];
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    pagination: {
        offset: number;
        count: number;
        limit: number;
        filter: {
            name: string;
            price: string;
        };
    };
}

export function TableProduct({
    setFilter,
    data,
    setOffset,
    setLimit,
    pagination,
}: tableProductProps) {
    const { formatMessage } = useIntl();
    const navigator = useNavigate();

    const minWidth800 = useMediaQuery('(min-width:800px)');
    const minWidth400 = useMediaQuery('(min-width:400px)');

    const handleChangePage = (_event: unknown, newPage: number) => {
        setOffset(newPage * pagination.limit);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setLimit(parseInt(event.target.value, 10));
        setOffset(0);
    };
    return (
        <Box>
            <TableFilter pagination={pagination} setFilter={setFilter} />
            <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ fontSize: '4rem' }}>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'tableProductName' })}
                            </TableHeadCellStyled>
                            {minWidth400 ? (
                                <>
                                    <TableHeadCellStyled>
                                        {formatMessage({
                                            id: 'tableProductBrand',
                                        })}
                                    </TableHeadCellStyled>

                                    <TableHeadCellStyled>
                                        {formatMessage({
                                            id: 'tableProductPrice',
                                        })}
                                    </TableHeadCellStyled>
                                    {minWidth800 ? (
                                        <TableHeadCellStyled>
                                            {formatMessage({
                                                id: 'tableProductDescription',
                                            })}
                                        </TableHeadCellStyled>
                                    ) : null}
                                </>
                            ) : null}
                            <TableHeadCellStyled sx={{ textAlign: 'center' }}>
                                {formatMessage({ id: 'tableProductAction' })}
                            </TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.length ? (
                            <>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell
                                            width={100}
                                            component="th"
                                            scope="row"
                                        >
                                            {item.name}
                                        </TableCell>
                                        {minWidth400 ? (
                                            <>
                                                <TableCell
                                                    width={150}
                                                    component="th"
                                                    scope="row"
                                                >
                                                    {item.brandData ? (
                                                        item.brandData.name
                                                    ) : (
                                                        <span
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        >
                                                            {formatMessage({
                                                                id: 'tableProductNoBrand',
                                                            })}
                                                        </span>
                                                    )}
                                                </TableCell>

                                                <TableCell width={70}>
                                                    R$
                                                    {item.price}
                                                </TableCell>
                                                {minWidth800 ? (
                                                    <TableCell width={540}>
                                                        {item.description ? (
                                                            <span>
                                                                {
                                                                    item.description
                                                                }
                                                            </span>
                                                        ) : (
                                                            <span
                                                                style={{
                                                                    color: 'red',
                                                                }}
                                                            >
                                                                {formatMessage({
                                                                    id: 'tableProductNoDescription',
                                                                })}
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                ) : null}
                                            </>
                                        ) : null}
                                        <TableCell
                                            width={140}
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Button
                                                color="secondary"
                                                onClick={() => {
                                                    navigator(
                                                        `/product/${item.id}`,
                                                    );
                                                }}
                                            >
                                                {formatMessage({
                                                    id: 'tableProductButtonInfoProduct',
                                                })}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>
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
                                            id: 'tableProductNoProduct',
                                        })}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                count={pagination.count}
                                onPageChange={handleChangePage}
                                page={Math.floor(
                                    pagination.offset / pagination.limit,
                                )}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPage={pagination.limit}
                                labelRowsPerPage={formatMessage({
                                    id: 'tableProductPaginationLimit',
                                })}
                                labelDisplayedRows={({ from, to, count }) => {
                                    return `${from}–${to} ${formatMessage({
                                        id: 'tableProductPaginationOutOf',
                                    })} ${count}`;
                                }}
                            />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
