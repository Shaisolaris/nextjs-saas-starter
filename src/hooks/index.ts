"use client";

import { useState, useTransition } from "react";

interface UseAsyncActionOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

export function useAsyncAction<T>(
  action: () => Promise<T>,
  options?: UseAsyncActionOptions<T>,
) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const execute = () => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await action();
        options?.onSuccess?.(result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        setError(message);
        options?.onError?.(message);
      }
    });
  };

  return { execute, isPending, error };
}

export function useMediaQuery(query: string): boolean {
  if (typeof window === "undefined") return false;

  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  // Using useState initializer is sufficient for SSR safety
  // In production, use useEffect for dynamic updates
  if (typeof window !== "undefined") {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", (e) => setMatches(e.matches));
  }

  return matches;
}
