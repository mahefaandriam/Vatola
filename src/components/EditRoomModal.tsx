import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useEffect } from "react";

export default function EditRoomModal({ room, onClose, onUpdated }: any) {
  const [form, setForm] = useState({ ...room });
  const [loading, setLoading] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const amenitiesOptions: string[] = [
        "Wi-Fi haut débit gratuit",
        "55-inch Smart TV",
        "Machine à café",
        "Machine à café",
        "Articles de toilette haut de gamme",
        "Minibar gratuit",
        "Lit king size",
        "Service en chambre",
        "Bureau de travail",
        "Petit-déjeuner inclus",
        "Douche de pluie",
        "Peignoir et pantoufles",
        "Climatisation"
    ];

    useEffect(() => {
        if (room && room.amenities) {
            setSelectedAmenities(room.amenities);
        }
    }, [room]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleChangeBox = (e: { target: {
    type: string;
    checked: boolean; name: any; value: any; 
  }; }) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("rooms")
      .update({
        name: form.name,
        type: form.type,
        price: form.price,
        size: form.size,
        capacity: form.capacity,
        featured: form.featured,
        amenities: selectedAmenities,
        description: form.description
      })
      .eq("id", form.id);

      setLoading(false);
    if (error) {
      alert("Erreur du mise à jour");
    } else {
      onUpdated();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full h-screen max-w-lg overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Modifier la Chambre</h2>

        <form onSubmit={handleUpdate} className='space-x-5 space-y-2 flex flex-wrap text-gray-600'>
            <input type="text" name="name" value={form.name} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Nom de la chambre'/>
            <input type="text" name="type" value={form.type} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Type de chambre'/>
            <div className="flex items-center">
                <input type="number" name="price" value={form.price} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Prix/nuitée'/>
                <span className="ml-2">Ar</span>
            </div>
            <div className="flex items-center">
                <input type="number" name="size" value={form.size} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Surface'/>
                <span className="ml-2">m²</span>
            </div>
            <div className="flex items-center">
                <input type="number" name="capacity" value={form.capacity} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Capacité'/>
            </div>
            <div className='flex items-center'>
                <span className="mx-2">Sélection spéciale</span>
                <input name="featured" type="checkbox" defaultChecked={form.featured} onChange={handleChangeBox} />
            </div>
            {/* Amenities dropdown */}
            <div className='border border-gray-200 '>
                <MultiSelectDropdown options={amenitiesOptions} selected={selectedAmenities} setSelected={setSelectedAmenities} />
            </div>
            <div>
                <textarea
                    className="p-2 border border-gray-200 rounded-lg outline-none focus:border-accent w-64"
                    placeholder="Description"
                    value={form.description}
                    name="description"
                    onChange={handleChange}
                    rows={2}
                />
            </div>

            <div>
                <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
                    Annuler
                </button>
                <button type="submit" className="px-4 py-2 ml-5 bg-blue-600 text-white rounded" disabled={loading}>
                    {loading ? "Mise à jour..." : "Enregistrer"}
                </button>
            </div>             
            <div></div>
        </form>

      </div>
    </div>
  );
}
