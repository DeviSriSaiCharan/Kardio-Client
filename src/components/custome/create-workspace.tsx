'use client';

import {
  DialogContent,
  DialogHeader,
  DialogClose,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { createWorkspace } from '@/services/workspaceDashboardService';
import { toastError, toastSuccess } from '@/lib/toast';

export default function CreateWorkspace({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDescription, setWorkspaceDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('blue');

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!workspaceName.trim()) {
      alert('Workspace name is required.');
      return;
    }

    setIsCreating(true);
    try {
      await createWorkspace({
        title: workspaceName,
        description: workspaceDescription,
        workspaceColor: selectedColor,
      });
      toastSuccess('Workspace created successfully!');
      onSuccess();
    } catch (error) {
      toastError(
        error instanceof Error
          ? error.message
          : 'An error occurred while creating the workspace.'
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <DialogContent className="sm:max-w-125 p-8 rounded-2xl bg-white shadow-xl border-0">
      {/* Header */}
      <DialogHeader>
        <div className="flex items-start gap-4">
          <div className="shrink w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Image
              src="/kardio-icon-32.png"
              height={28}
              width={28}
              alt="Kardio"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">
              Create Workspace
            </h2>
            <p className="text-sm text-gray-500 mt-1 leading-snug">
              Start collaborating with your team in a dedicated workspace.
            </p>
          </div>
        </div>
      </DialogHeader>

      {/* Form */}
      <form className="flex flex-col gap-5 mt-5">
        {/* Workspace Name */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="workspaceName"
            className="text-sm font-semibold text-gray-800"
          >
            Workspace name
          </Label>
          <Input
            type="text"
            id="workspaceName"
            name="workspaceName"
            placeholder="Enter workspace name"
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          <p className="text-xs text-gray-400">
            This is what your teammates will see.
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="workspaceDescription"
            className="text-sm font-semibold text-gray-800"
          >
            Description{' '}
            <span className="text-gray-400 font-normal">(optional)</span>
          </Label>
          <Textarea
            id="workspaceDescription"
            name="workspaceDescription"
            placeholder="Describe the purpose of this workspace..."
            rows={4}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm text-gray-800 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            onChange={(e) => setWorkspaceDescription(e.target.value)}
          />
          <p className="text-xs text-gray-400">
            Optional. You can always update this later.
          </p>
        </div>

        {/* Color Picker */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-semibold text-gray-800">Color</Label>
          <Input
            type="color"
            className="w-full h-10 border border-gray-200 rounded-md cursor-pointer p-0"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 mt-1">
          <DialogClose className="cursor-pointer flex-1 w-full border h-10 border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition">
            Cancel
          </DialogClose>
          <Button
            type="submit"
            className="cursor-pointer flex-1 h-10 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md flex items-center justify-center gap-2 transition"
            disabled={isCreating}
            onClick={handleSubmit}
          >
            <Plus className="w-4 h-4" />
            Create Workspace
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
