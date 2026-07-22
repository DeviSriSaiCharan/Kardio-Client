import { CreateWorkspaceRequest, Workspace } from '@/types/workspace';
import apiClient from '@/lib/apiClient';

export async function getWorksapcesByUserId(): Promise<Workspace[]> {
  const response = await apiClient.get<Workspace[]>('/workspaces');
  return response.data;
}

export async function createWorkspace(
  body: CreateWorkspaceRequest
): Promise<Workspace> {
  const response = await apiClient.post<Workspace>('/workspaces', body);
  return response.data;
}

export async function getWorkspaceById(
  workspaceId: number
): Promise<Workspace> {
  const response = await apiClient.get<Workspace>(`/workspaces/${workspaceId}`);
  return response.data;
}

export async function addMember(
  workspaceId: number,
  email: string
): Promise<Workspace> {
  const response = await apiClient.post<Workspace>(
    `/workspaces/${workspaceId}/members`,
    {
      email,
    }
  );
  return response.data;
}

export async function removeMember(
  workspaceId: number,
  memberId: string
): Promise<Workspace> {
  const response = await apiClient.delete<Workspace>(
    `/workspaces/${workspaceId}/members/${memberId}`
  );
  return response.data;
}

// TODO:
// 1. Implement update workspace
// 2. Implement delete workspace
