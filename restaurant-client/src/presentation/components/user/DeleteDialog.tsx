import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { User } from '@/domain/entities/User';

interface DeleteDialogProps {
  open: boolean;
  userToDelete: User | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, userToDelete, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmar eliminación</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro de que deseas eliminar el usuario "
          **{userToDelete?.userName}**
          "? Esta acción no se puede deshacer.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;