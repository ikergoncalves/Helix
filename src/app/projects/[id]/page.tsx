'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Breadcrumb } from 'chiselui';
import { getItem, STORAGE_KEYS } from '@/lib/storage';
import type { Project } from '@/types/project';

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const all = getItem<Project[]>(STORAGE_KEYS.projects) ?? [];
    setProject(all.find((p) => p.id === params.id) ?? null);
    setIsLoading(false);
  }, [params.id]);

  return (
    <section>
      <Breadcrumb
        items={[
          { label: 'Projects', href: '/projects' },
          { label: project?.name ?? 'Project' },
        ]}
      />

      {isLoading ? (
        <p className="mt-6 text-sm text-[var(--color-neutral-500)]">Loading…</p>
      ) : project ? (
        <>
          <h1 className="mt-4 text-2xl font-semibold">{project.name}</h1>
          <p className="mt-2 text-[var(--color-neutral-500)]">
            Task board coming in Phase 3.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-4 text-2xl font-semibold">Project not found</h1>
          <p className="mt-2 text-[var(--color-neutral-500)]">
            This project doesn’t exist.{' '}
            <Link href="/projects" className="underline">
              Back to projects
            </Link>
            .
          </p>
        </>
      )}
    </section>
  );
}
