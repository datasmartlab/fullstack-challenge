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
    // useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled, TableBodyCellStyled } from './style';
import { useIntl } from '../../../translate/useTranslate';

interface tableProductProps {
    data: {
        id: number;
        name: string;
        price: number;
        description: string;
        brandId: number;
        brandDatum: { name: string };
    }[];
    setOffset: any;
    setLimit: any;
    pagination: { offset: number; count: number; limit: number };
}

export function TableProduct({
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
            <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow sx={{ fontSize: '4rem' }}>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'TableName' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled sx={{ textAlign: 'center' }}>
                                Marca
                            </TableHeadCellStyled>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'TablePrice' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'TableDescription' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled sx={{ textAlign: 'center' }}>
                                {formatMessage({ id: 'TableAction' })}
                            </TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                                            Sem marca
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
                                                id: 'TableNoDescription',
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
                                            id: 'TableButtonInfoProduct',
                                        })}
                                    </Button>
                                </TableBodyCellStyled>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 20]}
                                count={pagination.count ? pagination.count : 10}
                                onPageChange={handleChangePage}
                                page={Math.floor(
                                    pagination.offset / pagination.limit,
                                )}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPage={pagination.limit}
                                labelRowsPerPage={formatMessage({
                                    id: 'TablePageLines',
                                })}
                                labelDisplayedRows={({ from, to, count }) => {
                                    return `${from}–${to} ${formatMessage({
                                        id: 'TableOutOf',
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
