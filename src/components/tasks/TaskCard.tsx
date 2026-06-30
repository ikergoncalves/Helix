'use client';

import { type KeyboardEvent, type MouseEvent } from 'react';
import { Badge, Button, type BadgeVariant } from 'chiselui';
import type { Task, TaskPriority } from '@/types/task';
import { formatDateRange } from '@/lib/date';
import { getInitials } from '@/lib/avatar';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/** Maps a task priority to a label and a confirmed Badge variant. */
const PRIORITY_META: Record<
  TaskPriority,
  { label: string; variant: BadgeVariant }
> = {
  low: { label: 'Low', variant: 'info' },
  medium: { label: 'Medium', variant: 'warning' },
  high: { label: 'High', variant: 'danger' },
};

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const priority = PRIORITY_META[task.priority];
  const hasAssignee =
    task.assignee.trim() !== '' && task.assignee !== 'Unassigned';

  // The whole card is an interactive control, so the delete button must stop
  // its click from bubbling up and opening the edit drawer.
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onDelete(task.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onEdit(task);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onEdit(task)}
      onKeyDown={handleKeyDown}
      className="flex cursor-pointer flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-colors hover:bg-[var(--color-neutral-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-medium leading-tight">{task.title}</h4>
        <Badge variant={priority.variant} size="sm">
          {priority.label}
        </Badge>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-neutral-100)] text-[10px] font-medium text-[var(--color-neutral-700)]">
            {hasAssignee ? getInitials(task.assignee) : '—'}
          </span>
          <span className="truncate text-xs text-[var(--color-neutral-500)]">
            {hasAssignee ? task.assignee : 'Unassigned'}
          </span>
        </div>
        <span className="whitespace-nowrap text-xs text-[var(--color-neutral-500)]">
          {formatDateRange(task.deadlineStart, task.deadlineEnd)}
        </span>
      </div>

      <div className="mt-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
