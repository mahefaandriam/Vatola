// pages/admin/AdminDashboard.jsx
import { Link, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Reservations from './Reservations'; // Adjust the import path as necessary
import Users from './Users'; // Adjust the import path as necessary
import AdminNotifications from './Notifications';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
   const [unreadCount, setUnreadCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);

      if (!error) setUnreadCount(count ?? 0);
    };

    const getUser = async () => {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
          navigate('/login');
          return;
        }
        setUser(user);
        console.log(user);
       // setEmail(user.email ?? '');
    };
  
    fetchUnreadCount(); 
    getUser();
    const interval = setInterval(fetchUnreadCount, 30000); // toutes les 30s
    return () => clearInterval(interval);
  }, []);

 

  return (
    <div className="min-h-screen flex mt-20">
      <aside className="fixed w-full bg-gray-900 text-white p-4 ">
        <h1 className="text-xl font-bold mb-4">Admin Panel {user && user.email} </h1> 
        <div className="flex spcace-x-5">
          <div className='mx-4'><Link to="/admin/reservations">Réservations</Link></div>
          <div className='mx-4'><Link to="/admin/utilisateurs">Utilisateurs</Link></div>          
          <div className='mx-4'>
          <Link to="/admin/notifications">Notifications
            <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
              {unreadCount}
            </span>
          </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-100 mt-20">
        <Routes>
          <Route path="reservations" element={<Reservations />} />
          <Route path="utilisateurs" element={<Users />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Routes>
      </main>
    </div>
  );
}
