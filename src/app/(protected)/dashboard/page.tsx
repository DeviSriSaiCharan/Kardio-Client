'use client';

import { useEffect, useState } from 'react';

import EmptyCard from '@/components/custome/empty-card';
import WorkspaceCard from '@/components/custome/workspace-card';
import { Workspace } from '@/types/workspace';
import { Plus } from 'lucide-react';
import { getWorksapcesByUserId } from '@/services/workspaceDashboardService';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import CreateWorkspace from '@/components/custome/create-workspace';
import { toastError } from '@/lib/toast';

export default function DashboardPage() {
  const [open, setOpen] = useState(false);

  // const workspaces: Workspace[] = [
  //   {
  //     id: 1,
  //     title: 'Personal',
  //     description: 'My personal workspace for organizing tasks and projects.',
  //     color: 'blue',
  //     boards: 5,
  //     members: [
  //       { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
  //       { id: '2', name: 'Bob Brown', email: 'bob@example.com' },
  //       { id: '3', name: 'Carol White', email: 'carol@example.com' },
  //     ],
  //     updatedAt: '1 hour ago',
  //   },
  //   {
  //     id: 2,
  //     title: 'Startup Team',
  //     description: 'Collaborative workspace for our startup projects.',
  //     color: 'green',
  //     boards: 3,
  //     members: [
  //       { id: '4', name: 'David Lee', email: 'david@example.com' },
  //       { id: '5', name: 'Emma Clark', email: 'emma@example.com' },
  //       { id: '6', name: 'Frank Miller', email: 'frank@example.com' },
  //     ],
  //     updatedAt: 'yesterday',
  //   },
  //   {
  //     id: 3,
  //     title: 'Project X',
  //     description: 'Workspace for the Project X development team.',
  //     color: 'red',
  //     boards: 4,
  //     members: [
  //       { id: '7', name: 'Grace Kim', email: 'grace@example.com' },
  //       { id: '8', name: 'Henry Park', email: 'henry@example.com' },
  //     ],
  //     updatedAt: '2 days ago',
  //   },
  //   {
  //     id: 4,
  //     title: 'Design Squad',
  //     description:
  //       'A workspace for the design team to collaborate and share ideas.',
  //     color: 'yellow',
  //     boards: 6,
  //     members: [
  //       { id: '9', name: 'Isla Moore', email: 'isla@example.com' },
  //       { id: '10', name: 'Jack Wilson', email: 'jack@example.com' },
  //       { id: '11', name: 'Karen Davis', email: 'karen@example.com' },
  //     ],
  //     updatedAt: '3 days ago',
  //   },
  //   {
  //     id: 5,
  //     title: 'Marketing Team',
  //     description:
  //       'Workspace for the marketing team to plan campaigns and strategies.',
  //     color: 'purple',
  //     boards: 2,
  //     members: [
  //       { id: '12', name: 'Liam Scott', email: 'liam@example.com' },
  //       { id: '13', name: 'Mia Taylor', email: 'mia@example.com' },
  //     ],
  //     updatedAt: '5 days ago',
  //   },
  // ];

  // const [workspaces, setWorkspace] = useState<Workspace[] | null>(null);

  // useEffect(() => {
  //   async function fetchWorkspaces() {
  //     console.log('Fetching workspaces...');
  //     try {
  //       const workspaces = await getWorksapcesByUserId();
  //       setWorkspace(workspaces);
  //     } catch (error) {
  //       console.error('Error fetching workspaces:', error);
  //     }
  //   }
  //   fetchWorkspaces();
  // }, []);

  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    async function getWorkspaces() {
      try {
        const workspaces = await getWorksapcesByUserId();
        setWorkspaces(workspaces);
      } catch (error) {
        toastError(
          error instanceof Error
            ? error.message
            : 'An error occurred while fetching workspaces.'
        );
      }
    }
    getWorkspaces();
  }, []);

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Workspaces</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Continue collaborating across your teams.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex items-center gap-2 font-semibold h-10 px-5 rounded-lg bg-primary text-white">
            <Plus className="w-4 h-4" />
            Create workspace
          </DialogTrigger>
          <CreateWorkspace onSuccess={() => setOpen(false)} />
        </Dialog>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {workspaces &&
          workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        <EmptyCard handleClick={() => setOpen(true)} />
      </div>
    </div>
  );
}
