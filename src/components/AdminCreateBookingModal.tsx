import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";

interface AdminCreateBookingModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminCreateBookingModal({ open, onClose }: AdminCreateBookingModalProps) {
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  // Client info
  const [clientName, setClientName] = useState("");
  const [clientSurName, setClientSurName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientBirth, setClientBirth] = useState<Date | null>(null);

  const [nights, setNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const selectedRoom = rooms.find(r => r.id == roomId);

  // Fetch rooms
  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase.from("rooms").select("id,name,type,price");
      setRooms(data ?? []);
    };
    fetchRooms();
  }, []);

  // Calculate nights and total price
  useEffect(() => {
    if (checkIn && checkOut && selectedRoom) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
      const calculatedNights = diff > 0 ? diff : 1;
      setNights(calculatedNights);
      setTotalPrice(calculatedNights * Number(selectedRoom.price));
    }
  }, [checkIn, checkOut, selectedRoom]);

  const handleCreateBooking = async () => {
    if (!roomId || !checkIn || !checkOut || !clientName || !clientEmail || !clientPhone) {
      return alert("Veuillez remplir tous les champs.");
    }

    const people = parseInt(adults) + parseInt(children);

    // 1) Insert booking first
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut,
        status: "pending",
        people,
        night: nights,
        total_price: totalPrice,
      })
      .select()  // get returned row
      .single();

    if (bookingError) throw bookingError;

    // 2) Insert user_info
    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_info")
      .insert({
        name: clientName,
        surname: clientName,
        birthday: formatDate(clientBirth),
        role: '',
        email: clientEmail,
        phone: clientPhone
      })
      .select()
      .single();

    if (userInfoError) throw userInfoError;

    // 3) Update booking to link the created user_info
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ user_info_id: userInfo.id })
      .eq("id", booking.id);

    if (updateError) throw updateError;

    console.log("✅ Booking and user_info successfully linked!");

    if (!bookingError && userInfoError && updateError) {
      alert("Réservation créée avec succès ✅");
      onClose();
      // Optionally reset form
      setRoomId(""); setCheckIn(""); setCheckOut("");
      setAdults("1"); setChildren("0");
      setClientName(""); setClientEmail(""); setClientPhone("");
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}-${dd}-${yyyy}`;
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"; // lock scroll
    } else {
      document.body.style.overflow = "auto";   // unlock scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-y-scroll max-h-screen">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Créer une réservation pour un client</h2>

        {/* Client Info */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Nom *</label>
              <input type="text" className="w-full border p-2 rounded" value={clientName} onChange={e => setClientName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Prénom *</label>
              <input type="text" className="w-full border p-2 rounded" value={clientSurName} onChange={e => setClientSurName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input type="email" className="w-full border p-2 rounded" value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Téléphone</label>
              <input type="tel" className="w-full border p-2 rounded" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-1">Date de naissance</label>
              <div className="relative">
                <DatePicker
                  selected={clientBirth}
                  onChange={(date: Date | null) => setClientBirth(date)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholderText="sélectionner la date"
                />
                <Calendar size={18} className="absolute right-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Room Selection */}
          <div>
            <label className="block text-sm mb-1">Chambre</label>
            <select className="w-full border p-2 rounded mb-4" value={roomId} onChange={e => setRoomId(e.target.value)}>
              <option value="">Sélectionner une chambre</option>
              {rooms.map(r => (
                <option key={r.id} value={r.id}>
                  {r.name || r.type} — {r.price}Ar
                </option>
              ))}
            </select>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm">Check-in</label>
                <input type="date" className="w-full border p-2 rounded" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Check-out</label>
                <input type="date" className="w-full border p-2 rounded" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
              </div>
            </div>

            {/* People */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm">Adultes</label>
                <input type="number" min="1" className="w-full border p-2 rounded" value={adults} onChange={e => setAdults(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm">Enfants</label>
                <input type="number" min="0" className="w-full border p-2 rounded" value={children} onChange={e => setChildren(e.target.value)} />
              </div>
            </div>
          </div>
        </div>

        {/* Price summary */}
        {selectedRoom && (
          <div className="bg-gray-100 p-3 rounded mb-4 text-sm">
            {nights} nuit(s) — Total: <strong>{totalPrice}€</strong>
          </div>
        )}

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded" onClick={handleCreateBooking}>
          Créer la réservation
        </button>
      </div>
    </div>
  );
}
