import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useUnread } from '../../context/UnreadContext';

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
  const [isExpandedID, setIsExpandedID] = useState(-1);
  const { refreshCounts } = useUnread();

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
    refreshCounts();
  };

  const handleMarkAsRead = async (id: number) => {
    await supabase.from('contacts').update({ read: true }).eq('id', id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    refreshCounts();
  };

  return (
    <section className="p-8  ">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        Messages de contact
      </h1>

      <div className="overflow-x-auto bg-white">
        <table className="min-w-full border-gray-300 text-xs">
          <thead className="bg-gray-100 uppercase text-xs font-semibold ">
            <tr>
              <th className="p-3 text-left border-b border-gray-200">Nom</th>
              <th className="p-3 text-left border-b border-gray-200">Email</th>
              <th className="p-3 text-left border-b border-gray-200">Sujet</th>
              <th className="p-3 text-left border-b border-gray-200">Message</th>
              <th className="p-3 text-left border-b border-gray-200">Date</th>
              <th className="p-3 text-center border-b border-gray-200">Lu</th>
              <th className="p-3 text-center border-b border-gray-200">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {messages.map((msg) => (
              <tr
                key={msg.id}
                className={`transition-colors duration-300 ${msg.read
                    ? "hover:bg-gray-50"
                    : "bg-blue-50 hover:bg-blue-100 cursor-pointer"
                  }`}
              >
                <td className="p-3 font-medium">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.subject}</td>
                <td
                  className={`p-3 max-w-[300px] cursor-pointer transition-all duration-300 ${isExpandedID === msg.id
                    ? "whitespace-normal break-words text-gray-800"
                    : "truncate text-gray-600"
                    }`}
                  onClick={() => (
                    (isExpandedID === msg.id) ? setIsExpandedID(-1) : setIsExpandedID(msg.id)
                  )}
                  title="Cliquez pour afficher le message complet"
                >
                  {msg.message}
                </td>
                <td className="p-3 text-gray-500">
                  {new Date(msg.created_at).toLocaleString()}
                </td>
                <td className="p-3 text-center text-lg">
                  <button onClick={() => (handleMarkAsRead(msg.id))}>{msg.read ? "✅" : "🔵"}</button>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {messages.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="p-6 text-center text-gray-500 italic bg-gray-50"
                >
                  Aucun message pour le moment
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>

  );
}
