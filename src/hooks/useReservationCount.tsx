import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const useReservationCount = () => {
  const [count, setCount] = useState(0);
    const [user, setUser] = useState<any>(null);

  useEffect(() => {
     const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
      }
      setUser(user);
    };
    
    getUser();

    const fetchCount = async () => {
      const { count, error } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id || 0);
      if (!error) setCount(count || 0);
    };

    fetchCount();

    const subscription = supabase
      .channel('realtime-bookings')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => fetchCount()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return count;
};

export default useReservationCount;
