import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

interface SpaTariff {
  id: number;
  label: string;
  price: number;
  notes?: string | null;
  created_at?: string;
}

interface SpaMediaItem {
  id: number;
  url: string;
  type: 'image' | 'video';
  caption?: string | null;
  created_at?: string;
}

export default function AdminSpa() {
  const [loading, setLoading] = useState(true);
  const [tariffs, setTariffs] = useState<SpaTariff[]>([]);
  const [media, setMedia] = useState<SpaMediaItem[]>([]);

  const [form, setForm] = useState({ label: '', price: 0, notes: '' });
  const [uploading, setUploading] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaCaption, setMediaCaption] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [{ data: tariffData }, { data: mediaData }] = await Promise.all([
      supabase.from('spa_tariffs').select('*').order('created_at', { ascending: false }),
      supabase.from('spa_media').select('*').order('created_at', { ascending: false }),
    ]);
    setTariffs((tariffData as SpaTariff[]) || []);
    setMedia((mediaData as SpaMediaItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      label: form.label.trim(),
      price: Number(form.price),
      notes: form.notes?.trim() || null,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('spa_tariffs').insert([payload]);
    if (error) {
      alert("Erreur d'enregistrement. Vérifiez que la table 'spa_tariffs' existe.");
      console.error(error);
      return;
    }
    setForm({ label: '', price: 0, notes: '' });
    loadData();
  };

  const removeTariff = async (id: number) => {
    if (!confirm('Supprimer ce tarif ?')) return;
    const { error } = await supabase.from('spa_tariffs').delete().eq('id', id);
    if (error) {
      alert('Suppression impossible.');
      console.error(error);
      return;
    }
    setTariffs(tariffs.filter(t => t.id !== id));
  };

  const uploadMedia = async (file: File) => {
    setUploading(true);
    try {
      const path = `admin/spa/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from('room-images').upload(path, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('room-images').getPublicUrl(path);
      const url = data.publicUrl;
      const { error: insErr } = await supabase.from('spa_media').insert([
        { url, type: mediaType, caption: mediaCaption || null, created_at: new Date().toISOString() }
      ]);
      if (insErr) throw insErr;
      setMediaCaption('');
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Échec de l'upload. Vérifiez le bucket 'room-images' et la table 'spa_media'.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Gestion du Spa & Bien-être</h2>

      {loading ? (
        <LoadingComponents />
      ) : (
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-3">Tarifs & prestations</h3>
            <form onSubmit={onSubmit} className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3">
              <input className="border border-gray-300 px-3 py-2 rounded md:col-span-2" placeholder="Intitulé (ex: Massage relaxant 60min)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
              <input className="border border-gray-300 px-3 py-2 rounded" type="number" min={0} placeholder="Prix (Ar)" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
              <input className="border border-gray-300 px-3 py-2 rounded md:col-span-2" placeholder="Notes (ex: durée, conditions)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              <div className="md:col-span-5 flex justify-end">
                <button type="submit" className="bg-accent hover:bg-gold-700 text-white px-4 py-2 rounded">Ajouter</button>
              </div>
            </form>

            <div className="overflow-x-scroll mt-4">
              <table className="min-w-200 border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th>Intitulé</th>
                    <th>Prix</th>
                    <th>Notes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tariffs.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td>{t.label}</td>
                      <td>{t.price} Ar</td>
                      <td>{t.notes || '—'}</td>
                      <td>
                        <button onClick={() => removeTariff(t.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Supprimer</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Images & vidéos</h3>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                <div className="md:col-span-2">
                  <input type="file" accept="image/*,video/*" onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadMedia(f);
                  }} disabled={uploading} className="block w-full text-sm" />
                </div>
                <div>
                  <select className="border border-gray-300 px-3 py-2 rounded w-full" value={mediaType} onChange={(e) => setMediaType(e.target.value as any)}>
                    <option value="image">Image</option>
                    <option value="video">Vidéo</option>
                  </select>
                </div>
                <div className="md:col-span-1">
                  <input className="border border-gray-300 px-3 py-2 rounded w-full" placeholder="Légende (optionnel)" value={mediaCaption} onChange={(e) => setMediaCaption(e.target.value)} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Les fichiers sont stockés dans le bucket Supabase 'room-images'.</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {media.map((m) => (
                  <div key={m.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    {m.type === 'image' ? (
                      <img src={m.url} alt={m.caption || ''} className="w-full h-32 object-cover" />
                    ) : (
                      <video src={m.url} className="w-full h-32 object-cover" controls />
                    )}
                    <div className="p-2 text-xs text-gray-600 flex items-center justify-between">
                      <span className="truncate">{m.caption || '—'}</span>
                      <button
                        onClick={async () => {
                          if (!confirm('Supprimer ce média ?')) return;
                          const { error } = await supabase.from('spa_media').delete().eq('id', m.id);
                          if (error) alert('Suppression impossible.');
                          else setMedia(media.filter(x => x.id !== m.id));
                        }}
                        className="text-red-600"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
