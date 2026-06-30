'use client';

import { useMemo, useState } from 'react';
import { Button, Skeleton, useToast } from 'chiselui';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';

const GRID_CLASS = 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3';

export default function ProjectsPage() {
  const { projects, isLoading, createProject, deleteProject } = useProjects();
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Most recently created first.
  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [projects],
  );

  const handleDelete = (id: string) => {
    deleteProject(id);
    toast({ message: 'Project deleted', variant: 'success' });
  };

  return (
    <section>
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="mt-1 text-sm text-[var(--color-neutral-500)]">
            Manage your projects and track their progress.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          New project
        </Button>
      </header>

      <div className="mt-8">
        {isLoading ? (
          <ProjectsGridSkeleton />
        ) : sortedProjects.length === 0 ? (
          <EmptyState onCreate={() => setIsModalOpen(true)} />
        ) : (
          <div className={GRID_CLASS}>
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createProject}
      />
    </section>
  );
}

/** Three placeholder cards shown while localStorage is read on the client. */
function ProjectsGridSkeleton() {
  return (
    <div className={GRID_CLASS}>
      {['a', 'b', 'c'].map((id) => (
        <div
          key={id}
          className="flex h-[200px] flex-col rounded-lg border border-[var(--color-border)] p-5"
        >
          <div className="flex items-start justify-between gap-3">
            <Skeleton width="55%" height={18} />
            <Skeleton variant="rectangular" width={64} height={22} />
          </div>
          <Skeleton variant="text" lines={2} className="mt-3" />
          <Skeleton variant="rectangular" height={8} className="mt-auto" />
          <Skeleton width="30%" height={12} className="mt-2" />
        </div>
      ))}
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-border)] px-6 py-16 text-center">
      <h2 className="text-lg font-semibold">No projects yet</h2>
      <p className="mt-1 max-w-sm text-sm text-[var(--color-neutral-500)]">
        Create your first project to start organizing tasks.
      </p>
      <Button variant="primary" className="mt-6" onClick={onCreate}>
        New project
      </Button>
    </div>
  );
}
