import { useState, useCallback } from 'react';
import type { TableSession } from '@/domain/entities/Session';
import type { CreateSessionData } from '@/domain/repositories/ISessionRepository';
import { GetSessionByIdUseCase } from '@/domain/usecases/session/GetSessionByIdUseCase';
import { StartSessionUseCase } from '@/domain/usecases/session/StartSessionUseCase';
import { EndSessionUseCase } from '@/domain/usecases/session/EndSessionUseCase';
import { GetActiveSessionByTableUseCase } from '@/domain/usecases/session/GetActiveSessionByTableUseCase';
import { GetAllSessionsUseCase } from '@/domain/usecases/session/GetAllSessionUseCase';
import { containerDI } from '@/aplication/di/ContainerDI';

export const useSession = () => {
  const [sessions, setSessions] = useState<TableSession[]>([]);
  const [currentSession, setCurrentSession] = useState<TableSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  //Use Cases
  const getAllSessionsUseCase = containerDI.resolve<GetAllSessionsUseCase>("getAllSessionsUseCase");
  const getSessionByIdUseCase = containerDI.resolve<GetSessionByIdUseCase>("getSessionByIdUseCase");
  const startSessionUseCase = containerDI.resolve<StartSessionUseCase>("startSessionUseCase");
  const endSessionUseCase = containerDI.resolve<EndSessionUseCase>("endSessionUseCase");
  const getActiveSessionByTableUseCase = containerDI.resolve<GetActiveSessionByTableUseCase>("getActiveSessionByTableUseCase");

  // Get all sessions
  const loadSessions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allSessions = await getAllSessionsUseCase.execute();
      setSessions(allSessions);
      return allSessions;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar las sesiones';
      setError(errorMessage);
      console.error('Error loading sessions:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get session by ID
  const loadSessionById = useCallback(async (sessionId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const session = await getSessionByIdUseCase.execute(sessionId);
      setCurrentSession(session);
      return session;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar la sesión';
      setError(errorMessage);
      console.error('Error loading session:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get active sessions by table
  const loadActiveSessionByTable = useCallback(async (tableId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const activeSession = await getActiveSessionByTableUseCase.execute(tableId);
      return activeSession;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar las sesiones activas de la mesa';
      setError(errorMessage);
      console.error('Error loading active sessions:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Start new session
  const startSession = useCallback(async (data: CreateSessionData): Promise<TableSession> => {
    try {
      setIsLoading(true);
      setError(null);
      const newSession = await startSessionUseCase.execute(data);
      setSessions(prev => [newSession, ...prev]);
      setCurrentSession(newSession);
      return newSession;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al iniciar la sesión';
      setError(errorMessage);
      console.error('Error starting session:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // End session
  const endSession = useCallback(async (sessionId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      await endSessionUseCase.execute(sessionId);
      
      setSessions(prev =>
        prev.map(session =>
          session.id === sessionId
            ? { ...session, isActive: false, endTime: new Date().toISOString() }
            : session
        )
      );
      
      if (currentSession?.id === sessionId) {
        setCurrentSession(prev =>
          prev ? { ...prev, isActive: false, endTime: new Date().toISOString() } : null
        );
      }
    } catch (err: any) {
      const errorMessage = err.message || 'Error al finalizar la sesión';
      setError(errorMessage);
      console.error('Error ending session:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [currentSession]);

  // Get active sessions
  const getActiveSessions = useCallback(() => {
    return sessions.filter(session => session.isActive);
  }, [sessions]);

  // Get sessions by table
  const getSessionsByTable = useCallback((tableId: string) => {
    return sessions.filter(session => session.tableId === tableId);
  }, [sessions]);

  // Check if table has active session
  const hasActiveSession = useCallback((tableId: string): boolean => {
    return sessions.some(session => session.tableId === tableId && session.isActive);
  }, [sessions]);

  // Get active session for table
  const getActiveSessionForTable = useCallback((tableId: string): TableSession | null => {
    return sessions.find(session => session.tableId === tableId && session.isActive) || null;
  }, [sessions]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Clear current session
  const clearCurrentSession = useCallback(() => {
    setCurrentSession(null);
  }, []);

  // Get session stats
  const getSessionStats = useCallback(() => {
    const activeSessions = sessions.filter(s => s.isActive);
    const completedSessions = sessions.filter(s => !s.isActive && s.endTime);
    
    return {
      total: sessions.length,
      active: activeSessions.length,
      completed: completedSessions.length,
    };
  }, [sessions]);

  return {
    sessions,
    currentSession,
    isLoading,
    error,
    loadSessions,
    loadSessionById,
    loadActiveSessionByTable,
    startSession,
    endSession,
    getActiveSessions,
    getSessionsByTable,
    hasActiveSession,
    getActiveSessionForTable,
    clearError,
    clearCurrentSession,
    getSessionStats,
  };
};