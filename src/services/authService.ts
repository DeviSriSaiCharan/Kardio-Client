import apiClient from '@/lib/apiClient';
import { AuthResponse, SignInRequest, SignUpRequest } from '@/types/auth';

/**
 * Register a new user account.
 * @returns The auth token and user profile on success.
 */
export async function signUp(body: SignUpRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/signup', body);
  return response.data;
}

/**
 * Sign in with email and password.
 * @returns The auth token and user profile on success.
 */
export async function signIn(body: SignInRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/signin', body);
  return response.data;
}
