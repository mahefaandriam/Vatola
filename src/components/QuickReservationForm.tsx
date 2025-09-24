import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Phone, Mail, User, ClipboardList, Send } from 'lucide-react';

const QuickReservationForm: React.FC = () => {
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    roomType: '',
    people: 1,
    extraService: '',
  });

  useEffect(() => {
    const loadRoomTypes = async () => {
      const { data } = await supabase.from('rooms').select('type');
      if (data) {
        const unique = Array.from(new Set((data as any[]).map((r: any) => r.type))).filter(Boolean);
        setRoomTypes(unique);
      }
    };
    loadRoomTypes();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'people' ? Number(value) : value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        name: form.name.trim(),
        contact: form.contact.trim(),
        room_type: form.roomType,
        people: form.people,
        extra_service: form.extraService.trim(),
        status: 'pending',
        created_at: new Date().toISOString(),
      };
      const { error } = await supabase.from('web_reservations').insert([payload]);
      if (error) {
        alert("Impossible d'enregistrer votre demande pour le moment. Veuillez nous contacter par téléphone ou email.");
      } else {
        alert('Merci, votre demande a bien été envoyée. Notre équipe vous contactera rapidement.');
        setForm({ name: '', contact: '', roomType: '', people: 1, extraService: '' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-luxury p-6">
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary-800 mb-4">Réservation rapide</h3>
      <p className="text-gray-600 mb-6">Laissez-nous vos coordonnées et vos préférences. Nous vous recontactons pour confirmer.</p>
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nom & prénom</label>
          <div className="relative">
            <input name="name" value={form.name} onChange={onChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
            <User size={18} className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Téléphone ou e‑mail</label>
          <div className="relative">
            <input name="contact" value={form.contact} onChange={onChange} required className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
            <Phone size={18} className="absolute right-9 top-3.5 text-gray-400" />
            <Mail size={18} className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Type de chambre</label>
          <select name="roomType" value={form.roomType} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent">
            <option value="">Indifférent</option>
            {roomTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nombre de personnes</label>
          <input type="number" min={1} max={10} name="people" value={form.people} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-2">Service complémentaire souhaité</label>
          <div className="relative">
            <textarea rows={3} name="extraService" value={form.extraService} onChange={onChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent" />
            <ClipboardList size={18} className="absolute right-3 top-3.5 text-gray-400" />
          </div>
        </div>
        <div className="md:col-span-2">
          <button disabled={submitting} type="submit" className="w-full bg-accent hover:bg-gold-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 disabled:opacity-50">
            <span className="inline-flex items-center justify-center gap-2"><Send size={18} /> Envoyer ma demande</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickReservationForm;
