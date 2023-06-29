import {
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
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
}

export function TableProduct({ data }: tableProductProps) {
    const navigator = useNavigate();

    return (
        <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow sx={{ fontSize: '4rem' }}>
                        <TableHeadCellStyled>Nome</TableHeadCellStyled>
                        <TableHeadCellStyled>Preço</TableHeadCellStyled>
                        <TableHeadCellStyled>Descrição</TableHeadCellStyled>
                        <TableHeadCellStyled>Ação</TableHeadCellStyled>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow
                            key={item.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableBodyCellStyled
                                width={200}
                                component="th"
                                scope="row"
                            >
                                {item.name}
                            </TableBodyCellStyled>
                            <TableBodyCellStyled width={200}>
                                R$ {item.price}
                            </TableBodyCellStyled>
                            <TableBodyCellStyled
                                sx={
                                    item.description
                                        ? { textAlign: 'justify' }
                                        : null
                                }
                                width={540}
                            >
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
                            <TableBodyCellStyled>
                                <Button
                                    onClick={() => {
                                        navigator(`/infoProduct/${item.id}`);
                                    }}
                                >
                                    Ver Detalhes
                                </Button>
                            </TableBodyCellStyled>
                        </TableRow>
                    ))}
                    <TableRow
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    ></TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
