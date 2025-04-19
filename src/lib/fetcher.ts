function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // client side
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // vercel
  return "http://localhost:3000"; // dev
}

export async function fetcher<T>(
  path: string,
  options?: globalThis.RequestInit,
): Promise<T> {
  const res = await fetch(`${getBaseUrl()}/api${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    console.error(res);
    throw new Error("API error");
  }
  return (await res.json()) as T;
}
