'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Project } from '@/types/project';
import type { Task, TaskFormData, TaskStatus } from '@/types/task';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

export interface UseTasksResult {
  /** The project these tasks belong to, or null while loading / not found. */
  project: Project | null;
  /** Tasks of the current project (empty when loading or not found). */
  tasks: Task[];
  isLoading: boolean;
  createTask: (data: TaskFormData) => Task;
  updateTask: (id: string, data: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  /** Shorthand for `updateTask(id, { status })`, handy for moving columns. */
  moveTaskStatus: (id: string, newStatus: TaskStatus) => void;
}

/**
 * Client-side source of truth for one project's tasks, backed by localStorage.
 *
 * Tasks live inside `project.tasks`, so every read and write goes through the
 * whole `Project[]` array under `STORAGE_KEYS.projects`: we locate the matching
 * project, swap its `tasks`, and persist the entire list. The current project
 * and its tasks are derived for callers, but only the task-shaped API is
 * exposed. `isLoading` stays true until the first read completes so the page
 * can show skeletons meanwhile.
 */
export function useTasks(projectId: string): UseTasksResult {
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

  /** Replace the current project's task array, leaving other projects intact. */
  const mutateTasks = useCallback(
    (updater: (current: Task[]) => Task[]) => {
      commit(
        projects.map((p) =>
          p.id === projectId ? { ...p, tasks: updater(p.tasks) } : p,
        ),
      );
    },
    [projects, projectId, commit],
  );

  const createTask = useCallback(
    (data: TaskFormData): Task => {
      const task: Task = {
        id: crypto.randomUUID(),
        projectId,
        createdAt: new Date().toISOString(),
        ...data,
      };
      mutateTasks((current) => [...current, task]);
      return task;
    },
    [projectId, mutateTasks],
  );

  const updateTask = useCallback(
    (id: string, data: Partial<TaskFormData>) => {
      mutateTasks((current) =>
        current.map((task) => (task.id === id ? { ...task, ...data } : task)),
      );
    },
    [mutateTasks],
  );

  const deleteTask = useCallback(
    (id: string) => {
      mutateTasks((current) => current.filter((task) => task.id !== id));
    },
    [mutateTasks],
  );

  const moveTaskStatus = useCallback(
    (id: string, newStatus: TaskStatus) => {
      updateTask(id, { status: newStatus });
    },
    [updateTask],
  );

  const project = projects.find((p) => p.id === projectId) ?? null;
  const tasks = project?.tasks ?? [];

  return {
    project,
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    moveTaskStatus,
  };
}
