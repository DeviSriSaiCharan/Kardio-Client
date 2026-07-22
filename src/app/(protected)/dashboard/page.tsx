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
