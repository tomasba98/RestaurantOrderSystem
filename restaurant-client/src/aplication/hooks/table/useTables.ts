import { useState, useEffect } from 'react';
import type { Table } from '@/domain/entities/Table';
import type { CreateTableData } from '@/domain/repositories/ITableRepository';
import { TableRepositoryImpl } from '@/infrastructure/repositories/TableRepositoryImpl';
import { SessionRepositoryImpl } from '@/infrastructure/repositories/SessionRepositoryImpl';
import { GetAllTablesUseCase } from '@/domain/usecases/table/GetAllTablesUseCase';
import { CreateTableUseCase } from '@/domain/usecases/table/CreateTableUseCase';
import { UpdateTablePositionUseCase } from '@/domain/usecases/table/UpdateTablePositionUseCase';
import { DeleteTableUseCase } from '@/domain/usecases/table/DeleteTableUseCase';
import { ToggleTableOccupationUseCase } from '@/domain/usecases/table/ToggleTableOccupationUseCase';
import { GetActiveSessionByTableUseCase } from '@/domain/usecases/session/GetActiveSessionByTableUseCase';
import { EndSessionUseCase } from '@/domain/usecases/session/EndSessionUseCase';

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tableRepository = new TableRepositoryImpl();
  const sessionRepository = new SessionRepositoryImpl();
  
  const getAllTablesUseCase = new GetAllTablesUseCase(tableRepository);
  const createTableUseCase = new CreateTableUseCase(tableRepository);
  const updateTablePositionUseCase = new UpdateTablePositionUseCase(tableRepository);
  const deleteTableUseCase = new DeleteTableUseCase(tableRepository);
  const toggleTableOccupationUseCase = new ToggleTableOccupationUseCase(tableRepository);
  const getActiveSessionByTableUseCase = new GetActiveSessionByTableUseCase(sessionRepository);
  const endSessionUseCase = new EndSessionUseCase(sessionRepository);

  
  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const tablesData = await getAllTablesUseCase.execute();
      setTables(tablesData);
    } catch (err: any) {
      setError(err.message || 'Error al cargar las mesas');
      console.error('Error loading tables:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTable = async (data: CreateTableData): Promise<Table> => {
    try {
      setIsLoading(true);
      setError(null);
      const newTable = await createTableUseCase.execute(data);
      setTables(prev => [...prev, newTable]);
      return newTable;
    } catch (err: any) {
      setError(err.message || 'Error al crear la mesa');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTablePosition = async (tableId: string, x: number, y: number) => {
    try {
      setError(null);
      await updateTablePositionUseCase.execute(tableId, x, y);
      setTables(prev =>
        prev.map(table =>
          table.id === tableId ? { ...table, x, y } : table
        )
      );
    } catch (err: any) {
      setError(err.message || 'Error al actualizar la posición de la mesa');
      throw err;
    }
  };

  const deleteTable = async (tableId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await deleteTableUseCase.execute(tableId);
      setTables(prev => prev.filter(table => table.id !== tableId));
    } catch (err: any) {
      setError(err.message || 'Error al eliminar la mesa');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTableOccupation = async (tableId: string) => {
    try {
      setError(null);
      const table = tables.find(t => t.id === tableId);
      if (!table) throw new Error('Mesa no encontrada');

      const newOccupationStatus = !table.isOccupied;
      const updatedStatus = await toggleTableOccupationUseCase.execute(
        tableId,
        newOccupationStatus
      );

      if (!newOccupationStatus && table.isOccupied) {
        
        try {
          const activeSession = await getActiveSessionByTableUseCase.execute(tableId);
          
          if (activeSession) {
            await endSessionUseCase.execute(activeSession.id);
            console.log('Sesión finalizada:', activeSession.id);
          } else {
            console.log('No hay sesiones activas para finalizar');
          }
        } catch (sessionErr: any) {
          console.error('Error al finalizar sesión:', sessionErr);
        }
      }

      setTables(prev =>
        prev.map(t =>
          t.id === tableId ? { ...t, isOccupied: updatedStatus } : t
        )
      );

    } catch (err: any) {
      setError(err.message || 'Error al cambiar el estado de ocupación');
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    tables,
    isLoading,
    error,
    setTables,
    loadTables,
    createTable,
    updateTablePosition,
    deleteTable,
    toggleTableOccupation,
    clearError,
  };
};