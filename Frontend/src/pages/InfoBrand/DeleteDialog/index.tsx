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

    function handleConfirm() {
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
                    {formatMessage({ id: 'deleteDialogBrandTitle' })}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formatMessage({ id: 'deleteDialogBrandContent' })}{' '}
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
                        {formatMessage({ id: 'deleteDialogBrandButtonCancel' })}
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleConfirm}
                        color="secondary"
                    >
                        {formatMessage({
                            id: 'deleteDialogBrandButtonConfirm',
                        })}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
