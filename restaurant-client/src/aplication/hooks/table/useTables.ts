import { useState, useEffect } from 'react';
import type { Table } from '@/domain/entities/Table';
import type { CreateTableData } from '@/domain/repositories/ITableRepository';
import { TableRepositoryImpl } from '@/infrastructure/repositories/TableRepositoryImpl';
import { GetAllTablesUseCase } from '@/domain/usecases/table/GetAllTablesUseCase';
import { CreateTableUseCase } from '@/domain/usecases/table/CreateTableUseCase';
import { UpdateTablePositionUseCase } from '@/domain/usecases/table/UpdateTablePositionUseCase';
import { DeleteTableUseCase } from '@/domain/usecases/table/DeleteTableUseCase';
import { ToggleTableOccupationUseCase } from '@/domain/usecases/table/ToggleTableOccupationUseCase';

export const useTables = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const tableRepository = new TableRepositoryImpl();
  const getAllTablesUseCase = new GetAllTablesUseCase(tableRepository);
  const createTableUseCase = new CreateTableUseCase(tableRepository);
  const updateTablePositionUseCase = new UpdateTablePositionUseCase(tableRepository);
  const deleteTableUseCase = new DeleteTableUseCase(tableRepository);
  const toggleTableOccupationUseCase = new ToggleTableOccupationUseCase(tableRepository);

  
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

      const newOccupationStatus = await toggleTableOccupationUseCase.execute(
        tableId,
        !table.isOccupied
      );

      setTables(prev =>
        prev.map(t =>
          t.id === tableId ? { ...t, isOccupied: newOccupationStatus } : t
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