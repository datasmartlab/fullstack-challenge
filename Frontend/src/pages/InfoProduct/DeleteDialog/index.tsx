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
    openDialogDelete: boolean;
    onClose: () => void;
    deleteProduct: () => void;
    name: string;
}

export default function DeleteDialog({
    openDialogDelete,
    onClose,
    deleteProduct,
    name,
}: AlertDeleteProps) {
    const { formatMessage } = useIntl();

    const handleClose = () => {
        onClose();
    };

    function Confirm() {
        onClose();
        deleteProduct();
    }

    return (
        <div>
            <Dialog
                maxWidth="xs"
                open={openDialogDelete}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle align="center">
                    {formatMessage({ id: 'deleteDialogProductTitle' })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {formatMessage({ id: 'deleteDialogProductContent' })}{' '}
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
                        {formatMessage({
                            id: 'deleteDialogProductButtonCancel',
                        })}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={Confirm}
                        color="secondary"
                    >
                        {formatMessage({
                            id: 'deleteDialogProductButtonConfirm',
                        })}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
