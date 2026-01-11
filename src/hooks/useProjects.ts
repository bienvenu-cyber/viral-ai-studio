import { useState, useEffect, useCallback } from 'react';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  type Project,
} from '@/services/pocketbase';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch projects';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const create = useCallback(async (data: { name: string; description?: string }) => {
    try {
      const project = await createProject(data);
      setProjects(prev => [project, ...prev]);
      return project;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create project';
      throw new Error(message);
    }
  }, []);

  const update = useCallback(async (id: string, data: Partial<Project>) => {
    try {
      const project = await updateProject(id, data);
      setProjects(prev => prev.map(p => p.id === id ? project : p));
      return project;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update project';
      throw new Error(message);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    try {
      await deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete project';
      throw new Error(message);
    }
  }, []);

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    create,
    update,
    remove,
    getProject,
  };
}
