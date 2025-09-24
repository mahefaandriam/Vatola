import React, { useEffect, useState } from 'react';
import type { Service } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import LoadingComponents from '../../components/LoadingComponents';

const NailsServices: React.FC = () => {
    const [nails, setNails] = useState<Service[]>([]);
    const [editNails, setEditNails] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNailsServices();
    }, []);

    const togglePublish = async (id: any, next: boolean) => {
        try {
            const { error } = await supabase.from('nails_services').update({ published: next }).eq('id', id);
            if (error) throw error;
            fetchNailsServices();
        } catch (e) {
            console.error(e);
            alert("Impossible de changer l'état de publication. Ajoutez une colonne 'published' boolean à 'nails_services'.");
        }
    };

    const uploadImage = async (file: any) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `admin/assets/${fileName}`;

        const { error } = await supabase.storage
            .from('room-images')
            .upload(filePath, file);

        if (error) throw error;

        const { data } = supabase.storage.from('room-images').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const fetchNailsServices = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('nails_services')
                .select('*')
                .order('created_at', { ascending: false });
        
            if (!error) setNails(data);
            console.log('Nails services fetched:', data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch nails services:', error);
        }
    };

    function replaceImage(id: any): void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e: any) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
                // Get current service
                const service = nails.find((s) => s.id === id);
                if (service && service.image) {
                    // Extract file path from public URL
                    const urlParts = service.image.split('/room-images/');
                    if (urlParts.length === 2) {
                        const filePath = `admin/assets/${urlParts[1]}`;
                        await supabase.storage.from('room-images').remove([filePath]);
                    }
                }
                // Upload new image
                const publicUrl = await uploadImage(file);
                // Update service with new image URL
                await supabase
                    .from('nails_services')
                    .update({ image: publicUrl })
                    .eq('id', id);
                fetchNailsServices();
            } catch (error) {
                console.error('Error replacing image:', error);
            }
        };
        input.click();        
    }

    return (
        
        <div className='pl-5'>
            <div className={`bg-white w-full text-sm z-40 p-2 ${editNails ? '':''}`}>
                <p className="text-lg font-semibold mb-4">Modifier</p>    
                <form >
                    <input name="type" defaultValue={editNails?.name} placeholder="Type" required />
                    <input name="decription" defaultValue={editNails?.description} placeholder="Decription" required />
                    <input name="price" type="number" defaultValue={editNails?.price} placeholder="prix" required />
                    <input name="duration" type="number" defaultValue={editNails?.duration} placeholder="Durée" required />
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">{editNails ? 'Modifier' : 'Ajouter'}</button>
                    <button type="button" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => setEditNails(null)}>Annuler</button>
                </form>
            </div>
            <div className=''> 
                <h1>Nails Services Admin Page</h1>
                 {loading ? (
                    <LoadingComponents />
                ) : (
                    <table className="w-full">
                        <thead >
                        <tr>
                            <th className="p-2">Nom</th>
                            <th className="p-2">Inscription</th>
                            <th className="p-2">Prix</th>
                            <th className="p-2">Duration</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Publication</th>
                            <th className="p-2">Action</th>

                        </tr>
                        </thead>
                        <tbody>
                            {nails.map((service) => (

                            <tr  key={service.id}>
                                    <td>{service.name}</td>
                                        <td>{service.description}</td>
                                        <td>{service.price ? `${service.price} €` : 'N/A'}</td>
                                        <td>{service.duration || 'N/A'}</td>
                                        <td>
                                            {service.image ? (
                                                <img src={service.image} alt={service.name} style={{ width: '100px', height: 'auto' }} />
                                            ) : (
                                                'No Image'
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <div className="flex items-center gap-2">
                                                <span className={(service as any).published ? 'px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs' : 'px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xs'}>
                                                    {(service as any).published ? 'Publié' : 'Non publié'}
                                                </span>
                                                <button className="text-primary-800 underline" onClick={() => togglePublish(service.id, !(service as any).published)}>
                                                    {(service as any).published ? 'Dépublier' : 'Publier'}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-2" >
                                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600" onClick={() => replaceImage(service.id)}>Modifier Image</button>
                                        <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600" onClick={() => setEditNails(service)}>Modifier</button>
                                        <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Supprimer</button>
                                        </td>
                            
                            </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default NailsServices;
