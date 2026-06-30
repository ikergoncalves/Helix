'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project, ProjectStatus } from '@/types/project';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

/** Caller-supplied fields for a new project; the rest is generated here. */
export interface CreateProjectInput {
  name: string;
  description: string;
  status: ProjectStatus;
}

/** Fields a caller may patch on an existing project. */
export type UpdateProjectInput = Partial<
  Pick<Project, 'name' | 'description' | 'status'>
>;

export interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  createProject: (data: CreateProjectInput) => Project;
  updateProject: (id: string, data: UpdateProjectInput) => void;
  deleteProject: (id: string) => void;
}

/**
 * Client-side source of truth for projects, backed by localStorage.
 *
 * The value is read once on mount so the server markup and the first client
 * paint agree (both render the loading state); after that an in-memory copy is
 * kept that every mutation updates and persists. `isLoading` stays true until
 * the first read completes, which lets the page show skeletons meanwhile.
 */
export function useProjects(): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setProjects(getItem<Project[]>(STORAGE_KEYS.projects) ?? []);
    setIsLoading(false);
  }, []);

  /** Update state and persist together so the two never drift. */
  const commit = useCallback((next: Project[]) => {
    setProjects(next);
    setItem(STORAGE_KEYS.projects, next);
  }, []);

  const createProject = useCallback(
    (data: CreateProjectInput): Project => {
      const project: Project = {
        id: crypto.randomUUID(),
        name: data.name,
        description: data.description,
        status: data.status,
        createdAt: new Date().toISOString(),
        tasks: [],
      };
      commit([...projects, project]);
      return project;
    },
    [projects, commit],
  );

  const updateProject = useCallback(
    (id: string, data: UpdateProjectInput) => {
      commit(projects.map((p) => (p.id === id ? { ...p, ...data } : p)));
    },
    [projects, commit],
  );

  const deleteProject = useCallback(
    (id: string) => {
      commit(projects.filter((p) => p.id !== id));
    },
    [projects, commit],
  );

  return { projects, isLoading, createProject, updateProject, deleteProject };
}
