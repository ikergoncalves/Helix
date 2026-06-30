'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Badge,
  Breadcrumb,
  Button,
  Skeleton,
  useToast,
  type BadgeVariant,
} from 'chiselui';
import { useTasks } from '@/hooks/useTasks';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskDrawer } from '@/components/tasks/TaskDrawer';
import type { ProjectStatus } from '@/types/project';
import type { Task, TaskFormData } from '@/types/task';

/** Maps a project status to a human label and a confirmed Badge variant. */
const STATUS_META: Record<
  ProjectStatus,
  { label: string; variant: BadgeVariant }
> = {
  active: { label: 'Active', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  completed: { label: 'Completed', variant: 'default' },
};

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { project, tasks, isLoading, createTask, updateTask, deleteTask } =
    useTasks(params.id);
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const openCreate = () => {
    setEditingTask(undefined);
    setIsDrawerOpen(true);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setIsDrawerOpen(true);
  };

  // The drawer owns its own success toast, so this only persists the change.
  const handleSubmit = (data: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      createTask(data);
    }
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
    toast({ message: 'Task deleted', variant: 'success' });
  };

  return (
    <section>
      <Breadcrumb
        items={[
          { label: 'Projects', href: '/projects' },
          { label: project?.name ?? 'Project' },
        ]}
      />

      {isLoading ? (
        <BoardSkeleton />
      ) : !project ? (
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">Project not found</h1>
          <p className="mt-2 text-[var(--color-neutral-500)]">
            This project doesn’t exist.{' '}
            <Link href="/projects" className="underline">
              Back to projects
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <header className="mt-4 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold">{project.name}</h1>
                <Badge variant={STATUS_META[project.status].variant} size="sm">
                  {STATUS_META[project.status].label}
                </Badge>
              </div>
              {project.description && (
                <p className="mt-2 text-[var(--color-neutral-500)]">
                  {project.description}
                </p>
              )}
            </div>
            <Button variant="primary" onClick={openCreate}>
              New task
            </Button>
          </header>

          <div className="mt-8">
            <TaskBoard
              tasks={tasks}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}

      <TaskDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSubmit={handleSubmit}
        task={editingTask}
      />
    </section>
  );
}

/** Header + three column placeholders shown while localStorage is read. */
function BoardSkeleton() {
  return (
    <div className="mt-4">
      <Skeleton width="40%" height={28} />
      <Skeleton width="60%" height={16} className="mt-3" />
      <div className="mt-8 flex flex-col gap-3">
        {['a', 'b', 'c'].map((id) => (
          <Skeleton key={id} variant="rectangular" height={52} />
        ))}
      </div>
    </div>
  );
}
