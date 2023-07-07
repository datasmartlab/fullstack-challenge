import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import { useIntl } from '../../../translate/useTranslate';

interface AlertDeleteProps {
    Open: boolean; // Altere o nome da propriedade para 'open'
    onClose: () => void;
    deleteProduct: () => void;
    name: string;
}

export default function DeleteDialog({
    Open,
    onClose,
    deleteProduct,
    name,
}: AlertDeleteProps) {
    const { formatMessage } = useIntl();
    const handleClose = () => {
        onClose(); // Chame a função 'onClose' para fechar o diálogo
    };
    function Confirm() {
        onClose();
        deleteProduct();
    }

    return (
        <div>
            <Dialog maxWidth="xs" open={Open} keepMounted onClose={handleClose}>
                <DialogTitle align="center">
                    {formatMessage({ id: 'DeleteDialogTitle' })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: 'DeleteDialog' })}{' '}
                        <span style={{ color: 'red' }}>{name}</span>?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        color="error"
                    >
                        {formatMessage({ id: 'DeleteDialogButtonCancel' })}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={Confirm}
                        color="secondary"
                    >
                        {formatMessage({ id: 'DeleteDialogButtonConfirm' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
