/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    // useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled, TableBodyCellStyled } from './style';
import { useIntl } from '../../../translate/useTranslate';

interface tableBrandProps {
    data: {
        id: number;
        name: string;
    }[];
}

export function TableProduct({ data }: tableBrandProps) {
    const { formatMessage } = useIntl();
    const navigator = useNavigate();

    return (
        <Box>
            <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ fontSize: '4rem' }}>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'TableName' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                {formatMessage({ id: 'TableAction' })}
                            </TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableBodyCellStyled component="th" scope="row">
                                    {item.name}
                                </TableBodyCellStyled>
                                <TableBodyCellStyled
                                    sx={{
                                        textAlign: 'center',
                                    }}
                                >
                                    <Button
                                        color="secondary"
                                        onClick={() => {
                                            navigator(`/infobrand/${item.id}`);
                                        }}
                                    >
                                        {formatMessage({
                                            id: 'TableButtonInfoProduct',
                                        })}
                                    </Button>
                                </TableBodyCellStyled>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
