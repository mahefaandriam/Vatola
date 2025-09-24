import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

interface PubMenuItem {
  id: number;
  category: 'snack' | 'boisson';
  title: string;
  price_min?: number | null;
  vegan?: boolean | null;
  low_fat?: boolean | null;
  created_at?: string;
}

interface PubMediaItem {
  id: number;
  url: string;
  type: 'image' | 'video';
  caption?: string | null;
  published?: boolean | null;
  created_at?: string;
}

export default function AdminPub() {
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<PubMenuItem[]>([]);
  const [media, setMedia] = useState<PubMediaItem[]>([]);

  const [menuForm, setMenuForm] = useState<PubMenuItem>({ id: 0, category: 'snack', title: '', price_min: null, vegan: false, low_fat: false });
  const [uploading, setUploading] = useState(false);
  const [mediaCaption, setMediaCaption] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');

  const loadData = async () => {
    setLoading(true);
    const [{ data: menuData }, { data: mediaData }] = await Promise.all([
      supabase.from('pub_menu').select('*').order('created_at', { ascending: false }),
      supabase.from('pub_media').select('*').order('created_at', { ascending: false }),
    ]);
    setMenu((menuData as PubMenuItem[]) || []);
    setMedia((mediaData as PubMediaItem[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const togglePublish = async (id: number, next: boolean) => {
    try {
      const { error } = await supabase.from('pub_media').update({ published: next }).eq('id', id);
      if (error) throw error;
      setMedia(prev => prev.map(m => m.id === id ? { ...m, published: next } : m));
    } catch (e) {
      console.error(e);
      alert("Impossible de changer l'état de publication. Ajoutez une colonne 'published' boolean à 'pub_media'.");
    }
  };

  const handleMenuSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      category: menuForm.category,
      title: menuForm.title.trim(),
      price_min: menuForm.price_min ?? null,
      vegan: !!menuForm.vegan,
      low_fat: !!menuForm.low_fat,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('pub_menu').insert([payload]);
    if (error) {
      alert("Erreur d'enregistrement du menu pub. Vérifiez que la table 'pub_menu' existe et vos droits.");
      console.error(error);
      return;
    }
    setMenuForm({ id: 0, category: 'snack', title: '', price_min: null, vegan: false, low_fat: false });
    loadData();
  };

  const handleDeleteMenu = async (id: number) => {
    if (!confirm('Supprimer cet élément de menu ?')) return;
    const { error } = await supabase.from('pub_menu').delete().eq('id', id);
    if (error) {
      alert('Suppression impossible.');
      console.error(error);
      return;
    }
    setMenu(menu.filter(m => m.id !== id));
  };

  const uploadMedia = async (file: File) => {
    setUploading(true);
    try {
      const path = `admin/pub/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from('room-images').upload(path, file);
      if (upErr) throw upErr;
      const { data } = supabase.storage.from('room-images').getPublicUrl(path);
      const url = data.publicUrl;
      const { error: insErr } = await supabase.from('pub_media').insert([
        { url, type: mediaType, caption: mediaCaption || null, created_at: new Date().toISOString() }
      ]);
      if (insErr) throw insErr;
      setMediaCaption('');
      await loadData();
    } catch (e) {
      console.error(e);
      alert("Échec de l'upload. Vérifiez le bucket 'room-images' et la table 'pub_media'.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Gestion du Pub / Lounge</h2>

      {loading ? (
        <LoadingComponents />
      ) : (
        <div className="space-y-8">
          <section>
            <h3 className="text-xl font-semibold mb-3">Carte (snacks & boissons)</h3>
            <form onSubmit={handleMenuSubmit} className="bg-white p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3">
              <select className="border border-gray-300 px-3 py-2 rounded" value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value as any })}>
                <option value="snack">Snack</option>
                <option value="boisson">Boisson</option>
              </select>
              <input className="border border-gray-300 px-3 py-2 rounded md:col-span-2" placeholder="Intitulé" value={menuForm.title} onChange={(e) => setMenuForm({ ...menuForm, title: e.target.value })} required />
              <input className="border border-gray-300 px-3 py-2 rounded" type="number" min={0} placeholder="Prix min (Ar)" value={menuForm.price_min ?? ''} onChange={(e) => setMenuForm({ ...menuForm, price_min: e.target.value === '' ? null : Number(e.target.value) })} />
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!menuForm.vegan} onChange={(e) => setMenuForm({ ...menuForm, vegan: e.target.checked })} /> Vegan</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!menuForm.low_fat} onChange={(e) => setMenuForm({ ...menuForm, low_fat: e.target.checked })} /> Sans matières grasses</label>
              </div>
              <div className="md:col-span-5 flex justify-end">
                <button type="submit" className="bg-accent hover:bg-gold-700 text-white px-4 py-2 rounded">Ajouter</button>
              </div>
            </form>

            <div className="overflow-x-scroll mt-4">
              <table className="min-w-200 border border-gray-300 bg-white text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th>Catégorie</th>
                    <th>Intitulé</th>
                    <th>Prix min</th>
                    <th>Options</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50">
                      <td>{m.category}</td>
                      <td>{m.title}</td>
                      <td>{m.price_min ? `${m.price_min} Ar` : '—'}</td>
                      <td>
                        <div className="flex gap-2">
                          {m.vegan ? <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs">Vegan</span> : null}
                          {m.low_fat ? <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs">Sans MG</span> : null}
                        </div>
                      </td>
                      <td>
                        <button onClick={() => handleDeleteMenu(m.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Supprimer</button>
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
                      <div className="flex items-center gap-3">
                        <span className={m.published ? 'px-2 py-0.5 rounded bg-green-100 text-green-700' : 'px-2 py-0.5 rounded bg-gray-100 text-gray-700'}>
                          {m.published ? 'Publié' : 'Non publié'}
                        </span>
                        <button onClick={() => togglePublish(m.id, !m.published)} className="text-primary-800">
                          {m.published ? 'Dépublier' : 'Publier'}
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm('Supprimer ce média ?')) return;
                            const { error } = await supabase.from('pub_media').delete().eq('id', m.id);
                            if (error) alert('Suppression impossible.');
                            else setMedia(media.filter(x => x.id !== m.id));
                          }}
                          className="text-red-600"
                        >
                          Supprimer
                        </button>
                      </div>
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
