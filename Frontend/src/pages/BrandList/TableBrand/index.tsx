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
    Typography,
    TableCell,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TableHeadCellStyled } from './style';
import { useIntl } from '../../../translate/useTranslate';
import { FilterTableBrand } from './filter';
import { Dispatch, SetStateAction } from 'react';

interface tableBrandProps {
    setFilter: Dispatch<SetStateAction<string>>;
    filter: string;
    data?: {
        id: number;
        name: string;
    }[];
}

export function TableBrand({ data, setFilter, filter }: tableBrandProps) {
    const { formatMessage } = useIntl();
    const navigator = useNavigate();

    return (
        <Box>
            <FilterTableBrand filter={filter} setFilter={setFilter} />
            <TableContainer component={Paper} sx={{ marginBottom: '1rem' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ fontSize: '4rem' }}>
                            <TableHeadCellStyled>
                                {formatMessage({ id: 'tableBrandName' })}
                            </TableHeadCellStyled>
                            <TableHeadCellStyled
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                {formatMessage({ id: 'tableBrandAction' })}
                            </TableHeadCellStyled>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.length ? (
                            <>
                                {data.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row">
                                            {item.name}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                textAlign: 'center',
                                            }}
                                        >
                                            <Button
                                                color="secondary"
                                                onClick={() => {
                                                    navigator(
                                                        `/infobrand/${item.id}`,
                                                    );
                                                }}
                                            >
                                                {formatMessage({
                                                    id: 'tableBrandButtonInfo',
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
                                            id: 'ListBrandNoBrand',
                                        })}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
