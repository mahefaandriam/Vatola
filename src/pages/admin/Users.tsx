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

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setUsers(data);
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

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Inscription</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.name || '—'}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="p-2">
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
    </div>
  );
}
