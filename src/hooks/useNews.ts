import { useState, useEffect, useCallback } from 'react';
import type { NewsEdition, IndexEntry } from '../types/news';

export function useNews() {
  const [edition, setEdition] = useState<NewsEdition | null>(null);
  const [editions, setEditions] = useState<IndexEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/index.json?_=' + Date.now())
      .then(res => res.json())
      .then(data => {
        const eds: IndexEntry[] = data.editions || [];
        setEditions(eds);
        if (eds.length > 0 && !selectedDate) {
          setSelectedDate(eds[0].date);
        }
      })
      .catch(() => setError('Could not load editions index.'));
  }, []);

  const loadEdition = useCallback(async (date: string) => {
    setLoading(true);
    setError(null);
    const [y, m, d] = date.split('-');
    try {
      const res = await fetch(`/archive/${y}/${m}/${d}/data.json?_=${Date.now()}`);
      if (!res.ok) throw new Error('Not found');
      const data: NewsEdition = await res.json();
      setEdition(data);
    } catch {
      setError('Could not load edition for ' + date);
      setEdition(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) loadEdition(selectedDate);
  }, [selectedDate, loadEdition]);

  return { edition, editions, selectedDate, setSelectedDate, loading, error };
}
