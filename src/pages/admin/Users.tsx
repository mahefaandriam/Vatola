import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type User = {
  id: string;
  name?: string;
  email: string;
  created_at: string;
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Supprimer l’utilisateur ${email} ?`)) return;

    const { error } = await supabase.rpc('delete_user', { uid: id });
    if (error) {
      alert("Erreur lors de la suppression : " + error.message);
    } else {
      alert("Utilisateur supprimé !");
      fetchUsers(); // refresh list
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
            {loading ? (
        <div>
           <div className="mx-auto w-full max-w-sm rounded-md border border-gray-300 border-gray-300-blue-300 p-4">
              <div className="flex animate-pulse space-x-4">
                <div className="size-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                      <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-2 rounded bg-gray-200"></div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      ) : (
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300">Nom</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Inscription</th>
            <th className="p-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border border-gray-300-t">
              <td className="p-2 border border-gray-300">{user.name || '—'}</td>
              <td className="p-2 border border-gray-300">{user.email}</td>
              <td className="p-2 border border-gray-300">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="p-2 border border-gray-300">
                <button
                  onClick={() => handleDelete(user.id, user.email)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}
