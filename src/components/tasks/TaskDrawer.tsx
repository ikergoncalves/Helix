'use client';

import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import {
  Button,
  Combobox,
  DateRangePicker,
  Drawer,
  Input,
  Select,
  Textarea,
  useToast,
  type ComboboxOption,
  type DateRange,
} from 'chiselui';
import type {
  Task,
  TaskFormData,
  TaskPriority,
  TaskStatus,
} from '@/types/task';
import { parseISODate, toISODate } from '@/lib/date';

interface TaskDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  /** When present the drawer edits this task; otherwise it creates a new one. */
  task?: Task;
}

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

const PRIORITY_OPTIONS: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

const ASSIGNEE_OPTIONS: ComboboxOption[] = [
  { value: 'Unassigned', label: 'Unassigned' },
  { value: 'Iker', label: 'Iker' },
  { value: 'Sofia', label: 'Sofia' },
  { value: 'Marco', label: 'Marco' },
];

const TITLE_MAX = 80;
const DESCRIPTION_MAX = 280;

export function TaskDrawer({
  isOpen,
  onClose,
  onSubmit,
  task,
}: TaskDrawerProps) {
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignee, setAssignee] = useState('Unassigned');
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [error, setError] = useState('');

  // Sync the form when the drawer opens: edit mode loads the task's values,
  // create mode resets to defaults. Re-running on `task` keeps the fields in
  // step when the same drawer is reused for a different card.
  useEffect(() => {
    if (!isOpen) return;
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
      setAssignee(task.assignee || 'Unassigned');
      setRange({
        start: parseISODate(task.deadlineStart),
        end: parseISODate(task.deadlineEnd),
      });
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setAssignee('Unassigned');
      setRange({ start: null, end: null });
    }
    setError('');
  }, [isOpen, task]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (error) setError('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError('Title is required.');
      return;
    }

    onSubmit({
      title: trimmedTitle,
      description: description.trim(),
      status,
      priority,
      assignee,
      deadlineStart: range.start ? toISODate(range.start) : '',
      deadlineEnd: range.end ? toISODate(range.end) : '',
    });
    toast({
      message: task ? 'Task updated' : 'Task created',
      variant: 'success',
    });
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit task' : 'New task'}
      placement="right"
      size="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Title"
          value={title}
          onChange={handleTitleChange}
          maxLength={TITLE_MAX}
          placeholder="e.g. Design new hero section"
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
          placeholder="Add more detail (optional)"
        />
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          value={status}
          onChange={(event) => setStatus(event.target.value as TaskStatus)}
        />
        <Select
          label="Priority"
          options={PRIORITY_OPTIONS}
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as TaskPriority)
          }
        />
        <Combobox
          label="Assignee"
          options={ASSIGNEE_OPTIONS}
          value={assignee}
          onChange={setAssignee}
          placeholder="Select an assignee"
        />
        <DateRangePicker
          label="Deadline"
          value={range}
          onChange={setRange}
          startLabel="Start"
          endLabel="Due"
        />
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {task ? 'Save changes' : 'Create task'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
