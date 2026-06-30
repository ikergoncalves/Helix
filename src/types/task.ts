export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

/** A single unit of work that belongs to a {@link Project}. */
export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  /** ISO date string (YYYY-MM-DD) marking when work should start. */
  deadlineStart: string;
  /** ISO date string (YYYY-MM-DD) marking the due date. */
  deadlineEnd: string;
  /** ISO timestamp of creation. */
  createdAt: string;
}
