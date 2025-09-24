import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

interface MediaAsset {
  id: number;
  category: 'hotel' | 'restaurant' | 'pub' | 'spa';
  type: 'image' | 'video';
  title?: string | null;
  url: string;
  published?: boolean | null;
  created_at?: string;
}

export default function AdminMedia() {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<MediaAsset[]>([]);

  const [category, setCategory] = useState<MediaAsset['category']>('hotel');
  const [type, setType] = useState<'image' | 'video'>('image');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error(error);
      setAssets([]);
    } else {
      setAssets((data as MediaAsset[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublish = async (id: number, next: boolean) => {
    try {
      const { error } = await supabase.from('media_assets').update({ published: next }).eq('id', id);
      if (error) throw error;
      setAssets(prev => prev.map(a => a.id === id ? { ...a, published: next } : a));
    } catch (e: any) {
      console.error(e);
      alert("Impossible de changer l'état de publication. Assurez-vous que la colonne 'published' (boolean) existe dans la table 'media_assets'.");
    }
  };

  const onFile = async (file: File) => {
    setUploading(true);
    try {
      const path = `admin/assets/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from('room-images').upload(path, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('room-images').getPublicUrl(path);
      const url = data.publicUrl;
      const { error: insErr } = await supabase.from('media_assets').insert([{ category, type, title: title || null, url, created_at: new Date().toISOString() }]);
      if (insErr) throw insErr;
      setTitle('');
      await load();
    } catch (e) {
      console.error(e);
      alert("Échec de l'upload. Vérifiez le bucket 'room-images' et la table 'media_assets'.");
    } finally {
      setUploading(false);
    }
  };

  const remove = async (id: number) => {
    if (!confirm('Supprimer ce média ?')) return;
    const { error } = await supabase.from('media_assets').delete().eq('id', id);
    if (error) {
      alert('Suppression impossible.');
      console.error(error);
      return;
    }
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Médias (images & vidéos)</h2>
      {loading ? (
        <LoadingComponents />
      ) : (
        <>
          <div className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
            <select className="border border-gray-300 px-3 py-2 rounded" value={category} onChange={(e) => setCategory(e.target.value as any)}>
              <option value="hotel">Hôtel</option>
              <option value="restaurant">Restaurant</option>
              <option value="pub">Pub</option>
              <option value="spa">Spa</option>
            </select>
            <select className="border border-gray-300 px-3 py-2 rounded" value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
            </select>
            <input className="border border-gray-300 px-3 py-2 rounded md:col-span-2" placeholder="Titre (optionnel)" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="file" accept="image/*,video/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }} disabled={uploading} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
            {assets.map((a) => (
              <div key={a.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <div className="p-2 text-xs text-gray-600 flex items-center justify-between border-b border-gray-100">
                  <span className="truncate">{a.category} · {a.type} · {a.title || '—'}</span>
                  <div className="flex items-center gap-3">
                    <span className={a.published ? 'px-2 py-0.5 rounded bg-green-100 text-green-700' : 'px-2 py-0.5 rounded bg-gray-100 text-gray-700'}>
                      {a.published ? 'Publié' : 'Non publié'}
                    </span>
                    <button onClick={() => togglePublish(a.id, !a.published)} className="text-primary-800">
                      {a.published ? 'Dépublier' : 'Publier'}
                    </button>
                    <button onClick={() => remove(a.id)} className="text-red-600">Supprimer</button>
                  </div>
                </div>
                {a.type === 'image' ? (
                  <img src={a.url} alt={a.title || ''} className="w-full h-40 object-cover" />
                ) : (
                  <video src={a.url} className="w-full h-40 object-cover" controls />
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
