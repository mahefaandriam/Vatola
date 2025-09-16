import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import MultiSelectDropdown from '../../components/MultiSelectDropdown';
import { Plus, SquarePen, Trash } from 'lucide-react';
import EditRoomModal from '../../components/EditRoomModal';
import { toast } from 'react-toastify';

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
    const [editRoom, setEditRoom] = useState<Room | null>(null);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [highlightId, setHighlightId] = useState<string | null>(null);
    //const [loading, setLoading] = useState(true);

    const amenitiesOptions: string[] = [
        "Accès au parking intérieur",
        "Accès au parking intérieur et vidéo de surveillance",
        "Accès au parking privé et vidéo de surveillance",
        "Coffre fort sécursisé",
        "Télévision dans la chambre et accès canal +",
        "Wifi dans la chambre",
        "Accès à la piscine",
        "Sanitaire privatifs",
        "Eau chaude",
        "Chambre chauffeur gratuite",
        "Cadre exceptionnel",
        "2 petits lits ou un grand lit confortables",
        "1 grand lit confortable et un petit lit",
        "2 grand lit confortable, ou 1 grand lit 2 petit lits superposés",
        "Berceau disponibles à la demande (gratuit)",
        "Décoration champagne à la demande",
        "Chambre chauffeur gratuit",
        "Enfant de - de 5 ans n’est pas comptés dans le nombre de personnes dans la chambre = gratuit"
    ];

    const fetchRooms = async () => {
        const { data: room } = await supabase.from('rooms').select('*').eq('id', highlightId).single();
        setRooms(rooms.map(r => r.id === highlightId ? room : r));
    };

    useEffect(() => {
        const getRooms = async () => {
            const { data } = await supabase.from('rooms').select('*').order('created_at', { ascending: false });
            if (data) setRooms(data);
        };
        getRooms();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const payload = {
            type: e.target.type.value,
            price: parseFloat(e.target.price.value),
            capacity: parseInt(e.target.capacity.value),
            name: e.target.name.value,
            description: e.target.description.value,
            size: parseInt(e.target.size.value),
            amenities: selectedAmenities,
            featured: e.target.featured.checked,
        };

        if (!editRoom) {
            const { error } = await supabase.from('rooms').insert([payload]);
            if (error) {
                console.error(error);
                toast.error("Erreur lors de l'ajout de la chambre");
            } else {
                toast.success('Chambre ajoutée avec succès');
                e.target.reset();
                setSelectedAmenities([]);
                fetchRooms();
            }
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

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cette chambre ?")) return;

        const { error } = await supabase.from('rooms').delete().eq('id', id);
        if (error) {
            console.error(error);
            toast.error('Erreur lors de la suppression de la chambre');
        } else {
            toast.success('Chambre supprimée avec succès');
            fetchRooms();
        }
    };

    function handleImgDelete(roomId: string, index: number) {
        if (!confirm("Supprimer cette image ?")) return;    
        const room = rooms.find(r => r.id === roomId); 
        if (!room || !room.images || index < 0 || index >= room.images.length) return;
        const updatedImages = room.images.filter((_, i) => i !== index);
        supabase.from('rooms').update({ images: updatedImages }).eq('id', roomId)
            .then(() => {
                toast.success('Image supprimée');
                fetchRooms(); // refresh list
            }, (error) => {
                console.error('Erreur lors de la suppression de l\'image :', error);
                toast.error("Erreur lors de la suppression de l'image");
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
                const { error } = await supabase.from('rooms').update({ images: updatedImages }).eq('id', id);
                if (error) throw error;
                toast.success('Image ajoutée');
                fetchRooms();
            } catch (error) {
                console.error(error);
                toast.error("Erreur lors de l'upload de l'image");
            }
        };

        fileInput.click();
    }
    return (
        <>        
            <div className='pl-5'>
                <h2 className="text-2xl font-bold mb-4">Liste des Chambres</h2>
                <div>
                    <h2 className='my-2 text-gray-400 font-thin text-sm'>Ajouter une chambre &rsaquo;</h2>
                    <form onSubmit={handleSubmit} action="" className='space-x-5 space-y-2 flex flex-wrap text-gray-600'>
                        <input type="text" name='name' className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Nom de la chambre'/>
                        <input type="text" name='type' className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Type de chambre'/>
                        <div className="flex items-center">
                            <input type="number" name='price' className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Prix/nuitée'/>
                            <span className="ml-2">Ar</span>
                        </div>
                        <div className="flex items-center">
                            <input type="number" name='size' className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Surface'/>
                            <span className="ml-2">m²</span>
                        </div>
                        <div className="flex items-center">
                            <input type="number" name='capacity' className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Capacité'/>
                        </div>
                        <div className='flex items-center'>
                            <span className="mx-2">Sélection spéciale</span>
                            <input name="featured" type="checkbox" defaultChecked={editRoom?.featured} />
                        </div>
                        {/* Amenities dropdown */}
                        <div className='border border-gray-200'>
                            <MultiSelectDropdown options={amenitiesOptions} selected={selectedAmenities} setSelected={setSelectedAmenities} />
                        </div>
                        <div>
                            <textarea
                                className="p-2 border border-gray-200 rounded-lg outline-none focus:border-accent w-64"
                                placeholder="Description"
                                name='description'
                                rows={2}
                            />
                        </div>

                        <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600">Ajouter</button>
                        <button type="button" className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onClick={() => setEditRoom(null)}>Annuler</button>
                        <div></div>
                    </form>
                </div>
                <div className='overflow-x-scroll'>
                    <table className="min-w-200 w-full mt-6 text-sm">
                        <thead>
                            <tr>
                                <th >Nom</th>
                                <th >Type</th>
                                <th >Prix</th>
                                <th ></th>
                                <th ></th>
                                <th ></th>
                                <th >Amenities</th>
                                <th >Description</th>                                
                                <th >Images</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id} className={highlightId === room.id ? "bg-yellow-100" : ""}>
                                    <td >{room.name}</td>
                                    <td >{room.type}</td>
                                    <td >
                                        <div className='relative'>
                                            {room.price} Ar
                                            <span className='absolute top-3 left-0 bg-white border px-2 opacity-0 hover:opacity-100 transition-opacity duration-300'>Prix par nuitée</span>
                                        </div>
                                    </td>
                                    <td >{room.size} m²</td>                                    
                                    <td >
                                        <div className='relative'>
                                            {room.capacity}
                                            <span className='absolute top-3 left-0 bg-white border px-2 opacity-0 hover:opacity-100 transition-opacity duration-300'>Nombre de personne</span>
                                        </div>
                                    </td>
                                    <td >
                                        <div className='relative'>
                                            {room.featured ? (
                                                <span className="text-green-600 font-bold">Oui</span>
                                            ) : (
                                                <span className="text-gray-400">Non</span>
                                            )}
                                            <span className='absolute top-3 left-0 bg-white border px-2 opacity-0 hover:opacity-100 transition-opacity duration-300'>Sélection spéciale</span>
                                        </div>
                                    </td>
                                    <td className="py-2 border-b">                                    
                                            <div className='h-30 overflow-y-scroll'>
                                                <ul className="list-decimal ml-4">
                                                {room.amenities && room.amenities.map((a, i) => (
                                                    <li key={i}>{a}</li>
                                                ))}
                                                </ul>
                                            </div>
                                    </td>
                                    <td >
                                        <textarea
                                            className="outline-none focus:border-accent w-full h-full"
                                            value={room.description}
                                            placeholder="Description"
                                            disabled={true}
                                            rows={6}
                                        />
                                    </td>
                                    <td >
                                        <div className='relative min-w-50'>
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
                                            <div className={`absolute bottom-1 right-1 bg-gray-300 text-gray-500 opacity-80 hover:opacity-100 hover:bg-secondary-blue hover:text-primary-blue transition-all duration-500 cursor-pointer`} onClick={() => addImage(room.id)}> <Plus size={25} /></div>
                                        </div>
                                    </td>
                                    <td className="border-b space-x-2">
                                        <button
                                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                            onClick={() => setEditRoom(room)}
                                        >
                                            <SquarePen size={15}/>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                            onClick={() => handleDelete(room.id)}
                                        >
                                            <Trash size={15}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {editRoom && (
                <EditRoomModal
                    room={editRoom}
                    onClose={() =>{  
                        setEditRoom(null);
                        fetchRooms();
                    }}
                    onUpdated={() => {
                        setHighlightId(editRoom.id);
                    }}
                />
                )}
            </div>
        </>
    );
};

export default Rooms;