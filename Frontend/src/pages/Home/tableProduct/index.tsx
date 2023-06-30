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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled, TableBodyCellStyled } from './style';
interface tableProductProps {
    data: {
        id: number;
        name: string;
        price: number;
        description: string;
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
                            <TableHeadCellStyled>Nome</TableHeadCellStyled>
                            <TableHeadCellStyled>Preço</TableHeadCellStyled>
                            <TableHeadCellStyled>Descrição</TableHeadCellStyled>
                            <TableHeadCellStyled sx={{ textAlign: 'center' }}>
                                Ação
                            </TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableBodyCellStyled
                                    width={200}
                                    component="th"
                                    scope="row"
                                >
                                    {item.name}
                                </TableBodyCellStyled>
                                <TableBodyCellStyled width={200}>
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
                                            Sem descrição
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
                                        Ver Detalhes
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
                                labelRowsPerPage={'Linhas por página'}
                                labelDisplayedRows={({ from, to, count }) => {
                                    return `${from}–${to} de ${count}`;
                                }}
                            />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
