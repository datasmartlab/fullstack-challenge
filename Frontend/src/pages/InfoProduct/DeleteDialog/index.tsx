import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';

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
    const handleClose = () => {
        onClose(); // Chame a função 'onClose' para fechar o diálogo
    };
    function Confirm() {
        onClose();
        deleteProduct();
    }

    return (
        <div>
            <Dialog
                maxWidth="xs"
                open={Open}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle align="center">Deleção do produto</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Tem certeza que deseja deletar o produto com o nome "
                        {name}" ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        color="error"
                    >
                        Cancelar
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={Confirm}
                        color="secondary"
                    >
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
