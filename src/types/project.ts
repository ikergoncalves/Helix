import type { Task } from './task';

export type ProjectStatus = 'active' | 'paused' | 'completed';

/** A project groups related {@link Task}s together. */
export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  /** ISO timestamp of creation. */
  createdAt: string;
  tasks: Task[];
}
