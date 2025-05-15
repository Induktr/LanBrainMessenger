import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';

export function usePollData() {
  const [polls, setPolls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPolls() {
      try {
        const { data, error } = await supabase
          .from('polls')
          .select(`
            *,
            options:poll_options(*)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPolls(data);
      } catch (err) {
        console.error('Error fetching polls:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPolls();
  }, []);

  return { polls, loading, error };
}