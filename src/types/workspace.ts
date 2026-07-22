import { User } from './user';

export interface CreateWorkspaceRequest {
  title: string;
  description: string;
  workspaceColor: string;
}

export interface Workspace {
  id: number;
  title: string;
  description: string;
  workspaceColor: string;
  owner: User;
  members: User[];
  updatedAt: string; // e.g. "1 hour ago"
}
