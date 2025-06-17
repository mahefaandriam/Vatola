// pages/admin/AdminDashboard.jsx
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Reservations from './Reservations'; // Adjust the import path as necessary
import Users from './Users'; // Adjust the import path as necessary
import AdminNotifications from './Notifications';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminDashboard() {
   const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('is_read', false);

      if (!error) setUnreadCount(count ?? 0);
    };

    fetchUnreadCount(); 
    const interval = setInterval(fetchUnreadCount, 30000); // toutes les 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex mt-50">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
        <div>a</div>
        <div>b
          <div>
            c
          </div>
          <div>
            e
          </div>
        </div>
        <div className="">
          <div><Link to="/admin/reservations">Réservations</Link></div>
          <div><Link to="/admin/utilisateurs">Utilisateurs</Link></div>          
          <div>
          <Link to="/admin/notifications">Notifications
            <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded-full text-xs">
              {unreadCount}
            </span>
          </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <Routes>
          <Route path="reservations" element={<Reservations />} />
          <Route path="utilisateurs" element={<Users />} />
          <Route path="notifications" element={<AdminNotifications />} />
        </Routes>
      </main>
    </div>
  );
}
