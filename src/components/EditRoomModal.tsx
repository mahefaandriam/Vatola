import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { useEffect } from "react";
import { toast } from 'react-toastify';

export default function EditRoomModal({ room, onClose, onUpdated }: any) {
  const [form, setForm] = useState({ ...room });
  const [loading, setLoading] = useState(false);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const amenitiesOptions: string[] = [
        "Accès au parking intérieur",
        "Accès au parking intérieur et vidéo de surveillance",
        "Accès au parking privé et vidéo de surveillance",
        "Coffre fort sécursisé",
        "Télévision dans la chambre et accès canal +",
        "Wifi dans la chambre",
        "Wifi exclusif dans la chambre",
        "Accès à la piscine",
        "Sanitaire privatifs",
        "Eau chaude",
        "Chambre chauffeur gratuite",
        "Cadre exceptionnel",
        "2 petits lits ou un grand lit confortables",
        "1 grand lit confortable et un petit lit",
        "2 grand lit confortable, ou 1 grand lit 2 petit lits superposés",
        "2 grand lit confortable et 1 petit lit ou 1 grand lit, 1 lit superposé et 1 petit lit",
        "Une grande chambre avec lits (superposés, grand lit, petit lits,...)",
        "Lit king size très confortable",
        "Berceau disponibles à la demande (gratuit)",
        "Décoration champagne à la demande",
        "Chambres chauffeurs",
        "Chambre chauffeur gratuit",
        "Enfant de - de 5 ans n’est pas comptés dans le nombre de personnes dans la chambre = gratuit",
        "Salon à disposition dans la chambres avec mini frigo et collation (payant)",
        "Une grande chambre méticuleusement préparée pour vous",
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

  const handleUpdate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const toNumOrNull = (v: any) => (v === "" || v === null || v === undefined ? null : Number(v));
    const toStrOrNull = (v: any) => (v === "" || v === null || v === undefined ? null : String(v));
    const arraysEqual = (a?: any[], b?: any[]) => {
      if (!Array.isArray(a) && !Array.isArray(b)) return true;
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    };

    const payload: any = {};

    // Strings (allow null when cleared)
    if (form.name !== room.name) {
      payload.name = toStrOrNull(form.name);
    }
    if (form.type !== room.type) {
      payload.type = toStrOrNull(form.type);
    }

    // Numbers (allow null when cleared)
    const priceVal = toNumOrNull(form.price);
    const priceOrig = toNumOrNull((room as any).price);
    if (priceVal !== priceOrig) {
      payload.price = priceVal;
    }

    const sizeVal = toNumOrNull(form.size);
    const sizeOrig = toNumOrNull((room as any).size);
    if (sizeVal !== sizeOrig) {
      payload.size = sizeVal;
    }

    const capacityVal = toNumOrNull(form.capacity);
    const capacityOrig = toNumOrNull((room as any).capacity);
    if (capacityVal !== capacityOrig) {
      payload.capacity = capacityVal;
    }

    // Boolean
    if (!!form.featured !== !!room.featured) {
      payload.featured = !!form.featured;
    }

    // Arrays
    if (!arraysEqual(selectedAmenities, room.amenities)) {
      payload.amenities = Array.isArray(selectedAmenities) ? selectedAmenities : [];
    }

    // Description (allow null when cleared)
    const descVal = toStrOrNull(form.description);
    const descOrig = toStrOrNull((room as any).description);
    if (descVal !== descOrig) {
      payload.description = descVal;
    }

    // If nothing changed, close modal
    if (Object.keys(payload).length === 0) {
      setLoading(false);
      onClose();
      return;
    }

    const { error } = await supabase
      .from("rooms")
      .update(payload)
      .eq("id", form.id);

    setLoading(false);
    if (error) {
      console.error("Erreur de mise à jour:", error);
      toast.error("Erreur lors de la mise à jour");
    } else {
      toast.success("Chambre mise à jour avec succès");
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
                {(form.price !== "" && form.price !== null && form.price !== undefined) && (
                  <span className="ml-2">Ar</span>
                )}
            </div>
            <div className="flex items-center">
                <input type="number" name="size" value={form.size} onChange={handleChange} className='p-2 border border-gray-200 rounded-lg outline-none focus:border-accent' placeholder='Surface'/>
                {(form.size !== "" && form.size !== null && form.size !== undefined) && (
                  <span className="ml-2">m²</span>
                )}
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
                <button type="reset" onClick={onClose} className="px-4 py-2 bg-gray-400 rounded">
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
