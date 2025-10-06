import type { Table } from "@/domain/entities/Table";
import { CreateTableUseCase } from "@/domain/usecases/table/CreateTableUseCase";
import { GetAllTablesUseCase } from "@/domain/usecases/table/GetAllTablesUseCase";
import { TableRepositoryImpl } from "@/infrastructure/repositories/TableRepositoryImpl";
import { useEffect, useState } from "react";

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    // Instanciamos el repositorio y los casos de uso
    const tableRepository = new TableRepositoryImpl();
    const getAllTablesUseCase = new GetAllTablesUseCase(tableRepository);
    const createTableUseCase = new CreateTableUseCase(tableRepository);
  
    // Función para cargar mesas
    const loadTables = async () => {
      try {
        setLoading(true);
        const data = await getAllTablesUseCase.execute();
        setTables(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    // Función para crear mesa
    const createTable = async (number: number) => {
      try {
        const newTable = await createTableUseCase.execute({
          number,
          x: 50,
          y: 50,
          isOccupied: false
        });
        setTables(prev => [...prev, newTable]);
        return newTable;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    };
  
    useEffect(() => {
      loadTables();
    }, []);
  
    return {
      tables,
      loading,
      error,
      createTable,
      refreshTables: loadTables
    };
  };