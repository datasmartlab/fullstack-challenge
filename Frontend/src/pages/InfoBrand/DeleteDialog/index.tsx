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
    OpenDialogDelete: boolean;
    onClose: () => void;
    deleteBrand: () => void;
    name: string;
}

export default function DeleteDialog({
    OpenDialogDelete,
    onClose,
    deleteBrand,
    name,
}: AlertDeleteProps) {
    const { formatMessage } = useIntl();

    const handleClose = () => {
        onClose();
    };

    function Confirm() {
        onClose();
        deleteBrand();
    }

    return (
        <div>
            <Dialog
                maxWidth="xs"
                open={OpenDialogDelete}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle align="center">
                    {formatMessage({ id: 'DeleteDialogBrandTitle' })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: 'DeleteDialogBrand' })}{' '}
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
                        {formatMessage({ id: 'DeleteDialogBrandButtonCancel' })}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={Confirm}
                        color="secondary"
                    >
                        {formatMessage({
                            id: 'DeleteDialogBrandButtonConfirm',
                        })}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
