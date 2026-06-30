'use client';

import { useMemo } from 'react';
import { Accordion, type AccordionItem } from 'chiselui';
import type { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

/** Board columns in display order; their ids double as Accordion item ids. */
const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

// To Do and In Progress start expanded; Done starts collapsed. `allowMultiple`
// is required for more than one section to stay open at once.
const DEFAULT_OPEN_IDS: TaskStatus[] = ['todo', 'in_progress'];

export function TaskBoard({ tasks, onEdit, onDelete }: TaskBoardProps) {
  const items: AccordionItem[] = useMemo(
    () =>
      COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.id);
        return {
          id: column.id,
          title: `${column.label} (${columnTasks.length})`,
          content:
            columnTasks.length === 0 ? (
              <p className="py-2 text-sm text-[var(--color-neutral-500)]">
                No tasks
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            ),
        };
      }),
    [tasks, onEdit, onDelete],
  );

  return (
    <Accordion
      items={items}
      defaultOpenIds={DEFAULT_OPEN_IDS}
      allowMultiple
      variant="bordered"
    />
  );
}
