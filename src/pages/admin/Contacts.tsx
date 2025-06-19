import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type ContactMessage = {
  read: any;
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setMessages(data);
    };

    fetchContacts();
  }, []);

  const handleDelete = async (id: any) => {
    if (!confirm("Supprimer ce message ?")) return;

    await supabase.from('contacts').delete().eq('id', id);
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

    const handleMarkAsRead = async (id: number) => {
        await supabase.from('contacts').update({ read: true }).eq('id', id);
        setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages de contact</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Sujet</th>
              <th className="p-2 border">Message</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Lu</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}  
              className={msg.read ? '' : 'bg-blue-50 hover:bg-blue-100 cursor-pointer'}
                 onClick={() => handleMarkAsRead(msg.id)}>
                <td className="p-2 border">{msg.name}</td>
                <td className="p-2 border">{msg.email}</td>
                <td className="p-2 border">{msg.subject}</td>
                <td className="p-2 border max-w-[300px] truncate">{msg.message}</td>
                <td className="p-2 border">{new Date(msg.created_at).toLocaleString()}</td>
                <td className="p-2 border text-center">
                    {msg.read ? '✅' : '🔵'}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-600 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td className="p-4 text-center text-gray-500">
                  Aucun message
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
