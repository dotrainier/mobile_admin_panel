import { useState } from 'react';

type Method = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export function useMutation<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function mutate(method: Method, url: string, body?: unknown) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      //TEMPORARY REMOVE SINCE DELETE METHOD RETURN PLAIN TEXT
      // const json = (await res.json()) as T;
      // setData(json);
      // return json;

      //TEMPORARY USED TO HANDLE PLAIN TEXT RESPONSE
      const type = res.headers.get('content-type');
      const data = type?.includes('application/json') ? await res.json() : await res.text();
      setData(data as T);
      return data as T;
    } catch (err) {
      console.log('errrr:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  return { mutate, data, loading, error };
}
