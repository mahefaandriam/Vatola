import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  created_at?: string;
}

export default function AdminSocials() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [form, setForm] = useState({ platform: '', url: '' });

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('social_links').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      setLinks([]);
    } else {
      setLinks((data as SocialLink[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { platform: form.platform.trim(), url: form.url.trim(), created_at: new Date().toISOString() };
    const { error } = await supabase.from('social_links').insert([payload]);
    if (error) {
      alert("Erreur d'enregistrement. Vérifiez que la table 'social_links' existe.");
      console.error(error);
      return;
    }
    setForm({ platform: '', url: '' });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm('Supprimer ce lien ?')) return;
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) {
      alert('Suppression impossible.');
      console.error(error);
      return;
    }
    setLinks(links.filter(l => l.id !== id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Réseaux sociaux (SNS)</h2>
      {loading ? (
        <LoadingComponents />
      ) : (
        <>
          <form onSubmit={onSubmit} className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3">
            <input className="border border-gray-300 px-3 py-2 rounded" placeholder="Plateforme (Facebook, Instagram...)" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })} required />
            <input className="border border-gray-300 px-3 py-2 rounded md:col-span-3" placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} required />
            <div className="md:col-span-1 flex justify-end">
              <button type="submit" className="bg-accent hover:bg-gold-700 text-white px-4 py-2 rounded">Ajouter</button>
            </div>
          </form>

          <div className="overflow-x-scroll mt-4">
            <table className="min-w-200 border border-gray-300 bg-white text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th>Plateforme</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.map((l) => (
                  <tr key={l.id} className="hover:bg-gray-50">
                    <td>{l.platform}</td>
                    <td>
                      <a href={l.url} target="_blank" rel="noreferrer" className="text-accent hover:underline">{l.url}</a>
                    </td>
                    <td>
                      <button onClick={() => remove(l.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
