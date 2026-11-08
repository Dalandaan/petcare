const DEFAULT_API = 'https://petcare-zmg3.onrender.com/api';

// Reads VITE_API_URL from the .env files; removes a trailing "/" if there is one
export const API: string = (import.meta.env.VITE_API_URL ?? DEFAULT_API).replace(/\/$/, '');

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data.message) message = data.message;
    } catch {
      // response had no JSON body
    }
    throw new ApiError(message, res.status);
  }

  return res.status === 204 ? (undefined as T) : res.json();
}