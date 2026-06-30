'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button, Input, Modal, Select, Textarea, useToast } from 'chiselui';
import type { ProjectStatus } from '@/types/project';
import type { CreateProjectInput } from '@/hooks/useProjects';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CreateProjectInput) => void;
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'completed', label: 'Completed' },
];

const NAME_MAX = 60;
const DESCRIPTION_MAX = 240;

export function CreateProjectModal({
  isOpen,
  onClose,
  onCreate,
}: CreateProjectModalProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('active');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const reset = () => {
    setName('');
    setDescription('');
    setStatus('active');
    setError('');
    setIsSaving(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (error) setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name is required.');
      return;
    }

    setIsSaving(true);
    onCreate({
      name: trimmedName,
      description: description.trim(),
      status,
    });
    toast({ message: 'Project created', variant: 'success' });
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="New project" size="md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Name"
          value={name}
          onChange={handleNameChange}
          maxLength={NAME_MAX}
          placeholder="e.g. Website Redesign"
          error={error}
          autoFocus
        />
        <Textarea
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          maxLength={DESCRIPTION_MAX}
          rows={3}
          showCount
          placeholder="What is this project about? (optional)"
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as ProjectStatus)
          }
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isSaving}>
            Create project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
