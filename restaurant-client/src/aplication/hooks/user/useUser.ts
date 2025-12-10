import { containerDI } from "@/aplication/di/ContainerDI";
import { Roles, type User } from "@/domain/entities/User";
import type { CreateUserData, IUserRepository, UpdateUserData } from "@/domain/repositories/IUserRepository";
import { useCallback, useState } from "react"

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Repositories
    const userRepository = containerDI.resolve<IUserRepository>("userRepository");

    //Get all users
    const loadUsers = useCallback(async(): Promise<User[]> => {
        try{
            setIsLoading(true);
            setError(null);
            const response: User[] = await userRepository.getAll();
            setUsers(response);
            return response;
        }catch(err: any){
            const errorMessage = err.message || 'Error al cargar los usuarios';
            setError(errorMessage);
            console.error('Error loading users:', err);
            throw err;
        }finally{
            setIsLoading(false);
        }
    }, []);

    // Get user by ID
  const loadUserById = useCallback(async (id: string): Promise<User> => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await userRepository.getById(id);
      setCurrentUser(user);
      return user;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar el usuario';
      setError(errorMessage);
      console.error('Error loading user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create new user
  const createUser = useCallback(async (data: CreateUserData): Promise<User> => {
    try {
      setIsLoading(true);
      setError(null);
      const newUser = await userRepository.create(data);
      setUsers(prev => [newUser, ...prev]);
      setCurrentUser(newUser);
      return newUser;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear el usuario';
      setError(errorMessage);
      console.error('Error creating user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user
  const updateUser = useCallback(async (
    id: string,
    data: UpdateUserData
  ): Promise<User> => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedUser = await userRepository.update(id, data);
      
      setUsers(prev =>
        prev.map(user => user.id === id ? updatedUser : user)
      );
      
      if (currentUser?.id === id) {
        setCurrentUser(updatedUser);
      }
      
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar el usuario';
      setError(errorMessage);
      console.error('Error updating user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Delete user
  const deleteUser = useCallback(async (id: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await userRepository.delete(id);
      
      setUsers(prev => prev.filter(user => user.id !== id));
      
      if (currentUser?.id === id) {
        setCurrentUser(null);
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar el usuario';
      setError(errorMessage);
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  // Clean error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clean current user
  const clearCurrentUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  // Get users by role
  const getUsersByRole = useCallback((role: Roles): User[] => {
      if(!Array.isArray(users)) return [];
      return users.filter(u => u.role === role);
  }, [users])

  // Search users
  const searchUsers = useCallback((searchTerm: string): User[] => {
    if( !searchTerm.trim() ) return users;

    const term = searchTerm.toLowerCase();

    return users.filter(user => {
    const full = `${user.userName} ${user.email} ${user.firstName} ${user.lastName}`.toLowerCase();
    return full.includes(term);
  });
  }, [users])

  // Get role count 
  const getRoleCount = useCallback((role: Roles): number => {
      if(!Array.isArray(users)) return 0;
      return users.filter(u => u && u.role === role).length;
  }, [users])

  return {
    users,
    currentUser,
    isLoading,
    error,
    loadUsers,
    loadUserById,
    createUser,
    updateUser,
    deleteUser,
    clearError,
    clearCurrentUser,
    getUsersByRole,
    searchUsers,
    getRoleCount,
  };
}