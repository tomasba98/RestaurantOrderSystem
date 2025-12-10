import { Grid, Alert } from '@mui/material';
import type { User } from '@/domain/entities/User';
import UserCard from './UserCard';

interface UserGridProps {
  filteredUsers: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserGrid: React.FC<UserGridProps> = ({ filteredUsers, onEdit, onDelete }) => {
  if (filteredUsers.length === 0) {
    return (
      <Grid size={{ xs: 12}}>
        <Alert severity="info">No se encontraron usuarios</Alert>
      </Grid>
    );
  }

  return (
    <>
      {filteredUsers.map((user) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
          <UserCard 
            user={user} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        </Grid>
      ))}
    </>
  );
};

export default UserGrid;