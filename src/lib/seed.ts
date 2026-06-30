import type { Project } from '@/types/project';
import { getItem, setItem, STORAGE_KEYS } from '@/lib/storage';

/**
 * Initial mock data used to populate localStorage on first load so the app is
 * never empty during development. It is replaced by real user data once the
 * CRUD flows arrive in later phases.
 */
export const seedProjects: Project[] = [
  {
    id: 'project-website',
    name: 'Website Redesign',
    description: 'Refresh the marketing site with the new brand system.',
    status: 'active',
    createdAt: '2026-05-02T09:00:00.000Z',
    tasks: [
      {
        id: 'task-hero',
        projectId: 'project-website',
        title: 'Design new hero section',
        description: 'Explore three directions for the landing hero.',
        status: 'in_progress',
        priority: 'high',
        assignee: 'Iker',
        deadlineStart: '2026-06-01',
        deadlineEnd: '2026-06-10',
        createdAt: '2026-05-03T10:15:00.000Z',
      },
      {
        id: 'task-nav',
        projectId: 'project-website',
        title: 'Rebuild navigation',
        description: 'Implement the responsive top navigation.',
        status: 'todo',
        priority: 'medium',
        assignee: 'Sofia',
        deadlineStart: '2026-06-05',
        deadlineEnd: '2026-06-18',
        createdAt: '2026-05-04T08:30:00.000Z',
      },
      {
        id: 'task-copy',
        projectId: 'project-website',
        title: 'Write homepage copy',
        description: 'Draft headlines and supporting paragraphs.',
        status: 'done',
        priority: 'low',
        assignee: 'Marco',
        deadlineStart: '2026-05-10',
        deadlineEnd: '2026-05-20',
        createdAt: '2026-05-05T14:00:00.000Z',
      },
    ],
  },
  {
    id: 'project-mobile',
    name: 'Mobile App Launch',
    description: 'Ship the first public release of the companion app.',
    status: 'active',
    createdAt: '2026-04-12T11:00:00.000Z',
    tasks: [
      {
        id: 'task-auth',
        projectId: 'project-mobile',
        title: 'Implement authentication',
        description: 'Email and social login with session persistence.',
        status: 'in_progress',
        priority: 'high',
        assignee: 'Iker',
        deadlineStart: '2026-06-02',
        deadlineEnd: '2026-06-15',
        createdAt: '2026-04-15T09:45:00.000Z',
      },
      {
        id: 'task-onboarding',
        projectId: 'project-mobile',
        title: 'Build onboarding flow',
        description: 'Three-screen intro with progress dots.',
        status: 'todo',
        priority: 'medium',
        assignee: 'Sofia',
        deadlineStart: '2026-06-10',
        deadlineEnd: '2026-06-24',
        createdAt: '2026-04-16T16:20:00.000Z',
      },
    ],
  },
  {
    id: 'project-research',
    name: 'Q3 User Research',
    description: 'Interview customers to shape the next roadmap.',
    status: 'paused',
    createdAt: '2026-03-20T13:30:00.000Z',
    tasks: [
      {
        id: 'task-recruit',
        projectId: 'project-research',
        title: 'Recruit participants',
        description: 'Find 12 users across three segments.',
        status: 'done',
        priority: 'medium',
        assignee: 'Marco',
        deadlineStart: '2026-04-01',
        deadlineEnd: '2026-04-12',
        createdAt: '2026-03-21T10:00:00.000Z',
      },
      {
        id: 'task-synthesis',
        projectId: 'project-research',
        title: 'Synthesize findings',
        description: 'Cluster insights into themes and opportunities.',
        status: 'todo',
        priority: 'high',
        assignee: 'Iker',
        deadlineStart: '2026-04-20',
        deadlineEnd: '2026-05-05',
        createdAt: '2026-03-22T12:10:00.000Z',
      },
    ],
  },
];

/**
 * Ensure localStorage holds project data. On first load (or after a reset) the
 * seed data is written; otherwise the existing data is returned untouched.
 * Intended to run on the client — returns the seed unchanged on the server.
 */
export function ensureSeedData(): Project[] {
  const existing = getItem<Project[]>(STORAGE_KEYS.projects);
  if (existing && existing.length > 0) return existing;
  setItem(STORAGE_KEYS.projects, seedProjects);
  return seedProjects;
}
