/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled, TableBodyCellStyled } from './style';
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
        brandDatum: { name: string };
    }[];
    setOffset: any;
    setLimit: any;
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
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow sx={{ fontSize: '4rem' }}>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'tableProductName' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'tableProductBrand' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'tableProductPrice' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled>
                                {formatMessage({
                                    id: 'tableProductDescription',
                                })}
                            </TableHeadCellStyled>
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
                                        <TableBodyCellStyled
                                            width={150}
                                            component="th"
                                            scope="row"
                                        >
                                            {item.name}
                                        </TableBodyCellStyled>
                                        <TableBodyCellStyled
                                            width={150}
                                            component="th"
                                            scope="row"
                                        >
                                            {item.brandDatum ? (
                                                item.brandDatum.name
                                            ) : (
                                                <span style={{ color: 'red' }}>
                                                    {formatMessage({
                                                        id: 'tableProductNoBrand',
                                                    })}
                                                </span>
                                            )}
                                        </TableBodyCellStyled>
                                        <TableBodyCellStyled width={150}>
                                            R${item.price}
                                        </TableBodyCellStyled>
                                        <TableBodyCellStyled width={540}>
                                            {item.description ? (
                                                <span>{item.description}</span>
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
                                        </TableBodyCellStyled>
                                        <TableBodyCellStyled
                                            sx={{ textAlign: 'center' }}
                                        >
                                            <Button
                                                color="secondary"
                                                onClick={() => {
                                                    navigator(
                                                        `/infoProduct/${item.id}`,
                                                    );
                                                }}
                                            >
                                                {formatMessage({
                                                    id: 'tableProductButtonInfoProduct',
                                                })}
                                            </Button>
                                        </TableBodyCellStyled>
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 15, 20]}
                                        count={
                                            pagination.count
                                                ? pagination.count
                                                : 10
                                        }
                                        onPageChange={handleChangePage}
                                        page={Math.floor(
                                            pagination.offset /
                                                pagination.limit,
                                        )}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        rowsPerPage={pagination.limit}
                                        labelRowsPerPage={formatMessage({
                                            id: 'tableProductPageLines',
                                        })}
                                        labelDisplayedRows={({
                                            from,
                                            to,
                                            count,
                                        }) => {
                                            return `${from}–${to} ${formatMessage(
                                                {
                                                    id: 'tableProductOutOf',
                                                },
                                            )} ${count}`;
                                        }}
                                    />
                                </TableRow>
                            </>
                        ) : (
                            <TableRow>
                                <TableBodyCellStyled colSpan={5}>
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
                                            id: 'homeNoProduct',
                                        })}
                                    </Typography>
                                </TableBodyCellStyled>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
