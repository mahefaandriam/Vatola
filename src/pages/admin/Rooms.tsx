import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

type Room = {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
  size: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
};

const Rooms: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [editRoom, setEditRoom] = useState<Room | null>(null)

    const fetchRooms = async () => {
        const { data} = await supabase.from('rooms').select('*');
        if (data) setRooms(data);
    };

    useEffect(() => {
     fetchRooms();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            type: e.target.type.value,
            price: parseFloat(e.target.price.value),
            capacity: parseInt(e.target.capacity.value),
        };

        if (editRoom) {
            const {data, error } = await supabase.from('rooms').update(payload).eq('id', editRoom.id);
            console.log(data, error);

            if (error) {
                alert('Erreur lors de la mise à jour');
                console.error(error);
            } else {
                fetchRooms(); // refresh data
            }
        } else {
            await supabase.from('rooms').insert([payload]);
        }

        setEditRoom(null);
        fetchRooms(); // refresh list
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

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cette chambre ?")) return;

        await supabase.from('rooms').delete().eq('id', id);
        fetchRooms();
    };

    function handleImgDelete(roomId: string, index: number) {
        if (!confirm("Supprimer cette image ?")) return;    
        const room = rooms.find(r => r.id === roomId); 
        if (!room || !room.images || index < 0 || index >= room.images.length) return;
        const updatedImages = room.images.filter((_, i) => i !== index);
        supabase.from('rooms').update({ images: updatedImages }).eq('id', roomId)
            .then(() => {
                fetchRooms(); // refresh list
            }, (error) => {
                console.error('Erreur lors de la suppression de l\'image :', error);
                alert('Erreur lors de la suppression de l\'image');
            });
    }   
    
    async function addImage(id: string): Promise<void> {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = false;

        fileInput.onchange = async (e: any) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const publicUrl = await uploadImage(file);
                const room = rooms.find(r => r.id === id);
                if (!room) return;
                const updatedImages = [...(room.images || []), publicUrl];
                await supabase.from('rooms').update({ images: updatedImages }).eq('id', id);
                fetchRooms();
            } catch (error) {
                alert('Erreur lors de l\'upload de l\'image');
                console.error(error);
            }
        };

        fileInput.click();
    }
    return (
        <div>
            <div className={`bg-white w-full text-sm fixed z-40 p-2 ${editRoom ? 'mt-25':''}`}>
                <p className="text-lg font-semibold mb-4">Modifier</p>    
                <form onSubmit={handleSubmit}>
                    <input name="type" defaultValue={editRoom?.type} placeholder="Type" required />
                    <input name="price" type="number" defaultValue={editRoom?.price} placeholder="Prix" required />
                    <input name="size" type="number" defaultValue={editRoom?.size} placeholder="Taille (m²)" required />
                    <input name="amenities" defaultValue={editRoom?.amenities?.join(', ')} placeholder="Amenities (séparés par des virgules)" required />
                    <input name="name" defaultValue={editRoom?.name} placeholder="Nom de la chambre" required />
                    <input name="description" defaultValue={editRoom?.description} placeholder="Description" required />
                    <input name="featured" type="checkbox" defaultChecked={editRoom?.featured} />
                    <label htmlFor="featured">Featured</label>
                    <input name="capacity" type="number" defaultValue={editRoom?.capacity} placeholder="Capacité" required />
                    <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">{editRoom ? 'Modifier' : 'Ajouter'}</button>
                    <button type="button" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => setEditRoom(null)}>Annuler</button>
                </form>
            </div>
            <div className='flex flex-col items-center overflow-x-hidden border rounded text-sm pt-30'>
                <div className='overflow-x-scroll w-auto max-w-screen border border-gray-300'>
                    <table className="table-auto w-full border-collapse border border-gray-300 min-w-500">    
                        <thead>
                            <tr>
                            <th style={{ position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>Name</th>
                            <th >Description</th>
                            <th className="border border-gray-300" >Type</th>
                            <th className="border border-gray-300" >Prix</th>
                            <th className="border border-gray-300" >Taille</th>
                            <th className="border border-gray-300" >Capacité</th>
                            <th className="border border-gray-300" >Amenities</th>
                            <th className="border border-gray-300" >Images</th>
                            <th className="border border-gray-300" >Featured</th>
                            <th className="border border-gray-300" >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                            <tr key={room.id}>
                                <td className="border border-gray-300 p-2" style={{ position: 'sticky', left: 0, background: '#fff', zIndex: 2 }}>{room.name}</td>
                                <td className="border border-gray-300 max-w-50 p-2" style={{maxHeight: '5px'}} >
                                        {room.description}
                                </td>
                                <td className="border border-gray-300 p-2" >{room.type}</td>
                                <td className="border border-gray-300 p-2" >{room.price}</td>
                                <td className="border border-gray-300 p-2" >{room.size} m²</td>
                                <td className="border border-gray-300 p-2" >{room.capacity}</td>
                                <td className="border border-gray-300 p-2 max-w-50 " >                            
                                        {room.amenities}
                                </td>
                                <td className="border border-gray-300 p-2" >
                                    <div >
                                    {room.images && room.images.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-2">
                                            {room.images.map((img, index) => (
                                                <div key={index} className="relative col-span-1 group">
                                                    <img key={index} src={img} alt={`Room ${room.type}`} className="w-16 h-16 object-cover" />
                                                    <button
                                                    onClick={() => {
                                                        handleImgDelete(room.id, index)
                                                        
                                                    }}
                                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                                    >
                                                    🗑️
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span>Aucune image</span>
                                    )}
                                    </div>
                                </td>
                                <td className="border border-gray-300 p-2" >{room.featured ? 'Oui' : 'Non'}</td>                          
                                <td className="border border-gray-300 p-2" >
                                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600" onClick={() => addImage(room.id)}>ajouter image</button>
                                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600" onClick={() => setEditRoom(room)}>Modifier</button>
                                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(room.id)}>Supprimer</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Rooms;