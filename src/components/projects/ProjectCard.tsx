'use client';

import { type MouseEvent } from 'react';
import Link from 'next/link';
import { Badge, Button, Progress, type BadgeVariant } from 'chiselui';
import type { Project, ProjectStatus } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onDelete: (id: string) => void;
}

/** Maps a project status to a human label and a confirmed Badge variant. */
const STATUS_META: Record<
  ProjectStatus,
  { label: string; variant: BadgeVariant }
> = {
  active: { label: 'Active', variant: 'success' },
  paused: { label: 'Paused', variant: 'warning' },
  completed: { label: 'Completed', variant: 'default' },
};

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const total = project.tasks.length;
  const done = project.tasks.filter((task) => task.status === 'done').length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const status = STATUS_META[project.status];

  // The whole card is a Link, so the delete button must cancel both the
  // navigation (preventDefault) and the bubbling that would trigger it
  // (stopPropagation) before running its own handler.
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete(project.id);
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group flex h-full flex-col rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:bg-[var(--color-neutral-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold leading-tight">{project.name}</h3>
        <Badge variant={status.variant} size="sm">
          {status.label}
        </Badge>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-[var(--color-neutral-500)]">
        {project.description || 'No description'}
      </p>

      <div className="mt-4">
        <Progress
          value={percent}
          size="sm"
          color={percent === 100 ? 'success' : 'primary'}
        />
        <span className="mt-1.5 block text-xs text-[var(--color-neutral-500)]">
          {percent}% complete
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-xs text-[var(--color-neutral-500)]">
          {total} {total === 1 ? 'task' : 'tasks'}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          aria-label={`Delete ${project.name}`}
        >
          Delete
        </Button>
      </div>
    </Link>
  );
}
