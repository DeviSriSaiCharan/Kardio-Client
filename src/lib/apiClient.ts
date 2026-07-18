import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Centralized Axios instance for all HTTP requests in the app.
 *
 * - Sets the base URL from the NEXT_PUBLIC_API_URL env variable.
 * - Attaches the Authorization header automatically if a token exists.
 * - Normalizes API errors into a consistent shape via the response interceptor.
 */
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000, // 10 seconds
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
// Attach the Bearer token from localStorage (if present) to every request.
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Only runs on the client side (Next.js SSR guard)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
// Unwrap successful responses and normalize error responses.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    // Automatically clear stale credentials on 401 Unauthorized
    if (status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token');
      // Optionally redirect: window.location.href = '/signin';
    }

    // Bubble up a normalized error message
    const message =
      error.response?.data?.message ?? error.message ?? 'An unexpected error occurred.';

    return Promise.reject(new Error(message));
  },
);

export default apiClient;

// ─── Shared API response types ────────────────────────────────────────────────

/** Shape returned by the server on errors */
export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
}

/** Generic wrapper for successful paginated or list responses */
export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
