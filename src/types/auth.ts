// ─── Request types ─────────────────────────────────────────────────────────

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

// ─── Response types ─────────────────────────────────────────────────────────

export interface AuthResponse {
  message: string;
}
