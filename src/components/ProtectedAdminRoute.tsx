// components/ProtectedAdminRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

import type { PropsWithChildren } from 'react';
import LoadingComponents from './LoadingComponents';

export default function ProtectedAdminRoute({ children }: PropsWithChildren<{}>) {
  const [userRole, setUserRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setUserRole(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !data || data.role !== 'admin') {
        setUserRole(null);
      } else {
        setUserRole('admin');
      }
      setLoading(false);
    };

    fetchUserRole();
  }, []);

  if (loading) return <div><div className='my-50'><LoadingComponents /></div></div>;

  return userRole === 'admin' ? children : <Navigate to="/" />;
}
