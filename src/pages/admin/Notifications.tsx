import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminNotifications() {
  type Notification = {
    id: number;
    message: string;
    is_read: boolean;
    created_at: string;
    // Add other fields if your notification table has more columns
  };

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>Aucune notification pour le moment.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 border rounded ${notif.is_read ? 'bg-gray-100' : 'bg-white'}`}
            >
              <div className="flex justify-between">
                <p>{notif.message}</p>
                {!notif.is_read && (
                  <button
                    onClick={() => markAsRead(notif.id)}
                    className="text-blue-600 underline text-sm"
                  >
                    Marquer comme lue
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
