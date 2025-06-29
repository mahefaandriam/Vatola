import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const searchParams = new URLSearchParams(window.location.search);
  const subject = searchParams.get('subject') || '';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    // Initialize form data with subject if provided in URL
    if (subject) {
      setFormData((prevData) => ({
        ...prevData,
        subject: subject,
      }));
    }
  }, [subject]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app this would connect to a backend API
    console.log('Form submitted:', formData);
    alert('Merci de votre message ! Notre équipe vous contactera sous peu. ');
    
    const { error } = await supabase.from('contacts').insert([formData]);

    if (error) {
      alert("Erreur lors de l'envoi." );
    } else {
      alert("Message envoyé avec succès ✅" );
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
    // Reset form
    
  };
  
  return (
    <div>
      <Hero
        title="Contactez-nous"
        subtitle= "Nous sommes là pour vous aider avec toutes les demandes ou réservations."
        image="/avion.webp"
        ctaText={undefined}
        height="h-[70vh]"
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SectionTitle
                  title="Entrer en contact"
                  subtitle="Nous aimerions avoir de vos nouvelles. Veuillez remplir le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais."
                  alignment="left"
                />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Votre Nom*
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Votre adresse Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                        Sujet*
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Sélectionner un sujet</option>
                        <option value="reservation">Réservation de chambres</option>
                        <option value="spa">Demande de renseignements sur le spa</option>
                        <option value="pub">Pub & Bar</option>
                        <option value="nailsalon">Salon de manucure</option>
                        <option value="feedback">Commentaire</option>
                        <option value="other">Autres</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Votre Message*
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-accent hover:bg-gold-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                  >
                    Envoyer un Message
                  </button>
                </form>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-6">Informations de Contact</h3>
                  
                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-accent/10 p-3 rounded-full mr-4">
                        <MapPin size={18} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-800 mb-1">Adresse</h4>
                        <p className="text-gray-600">
                          27H10 Rue Mahazoarivo sud, Antsirabe
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-accent/10 p-3 rounded-full mr-4">
                        <Phone size={18} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-800 mb-1">Numéro de téléphone</h4>
                        <p className="text-gray-600">
                          <a href="tel:+261376607863" className="hover:text-accent transition duration-300">
                            +261 37 66 078 63
                          </a>&nbsp;|&nbsp;
                          <a href="tel:+261341193777" className="hover:text-accent transition duration-300">
                            +261 34 11 937 77
                          </a>
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-accent/10 p-3 rounded-full mr-4">
                        <Mail size={18} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-800 mb-1">Email</h4>
                        <p className="text-gray-600">
                          <a href="mailto:hotelvatola@outlook.com" className="hover:text-accent transition duration-300">
                            hotelvatola@outlook.com
                          </a>
                        </p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="bg-accent/10 p-3 rounded-full mr-4">
                        <Clock size={18} className="text-accent" />
                      </div>
                      <div>
                        <h4 className="font-medium text-primary-800 mb-1">Heures de réception</h4>
                        <p className="text-gray-600">
                          24/7 service de réception
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-8 bg-primary-800 rounded-lg p-6 text-white shadow-luxury">
                  <h3 className="font-serif text-xl font-semibold mb-4">Départements</h3>
                  
                  <ul className="space-y-4">
                    <li>
                      <h4 className="font-medium text-accent">Reservations</h4>
                      <p className="text-gray-300 text-sm">Pour les réservations de chambres et la disponibilité</p>
                      <a href="tel:+15551234567" className="text-white hover:text-accent transition duration-300">
                        +1 (555) 123-4567
                      </a>
                    </li>
                    
                    <li>
                      <h4 className="font-medium text-accent">Spa & Bien-être</h4>
                      <p className="text-gray-300 text-sm">Pour les rendez-vous et demandes de renseignements</p>
                      <a href="tel:+15551234568" className="text-white hover:text-accent transition duration-300">
                        +1 (555) 123-4568
                      </a>
                    </li>
                    
                    <li>
                      <h4 className="font-medium text-accent">Pub & Bar</h4>
                      <p className="text-gray-300 text-sm">Pour les réservations et les demandes de renseignements</p>
                      <a href="tel:+15551234569" className="text-white hover:text-accent transition duration-300">
                        +1 (555) 123-4569
                      </a>
                    </li>
                    
                    <li>
                      <h4 className="font-medium text-accent">Salon de manucure</h4>
                      <p className="text-gray-300 text-sm">Pour les rendez-vous et services</p>
                      <a href="tel:+15551234570" className="text-white hover:text-accent transition duration-300">
                        +1 (555) 123-4570
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Notre emplacement"
            subtitle="Idéalement situé pour votre commodité, avec un accès facile aux principales attractions."
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-luxury p-4">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                {/* Replace with an actual map in a real implementation */}
                <iframe
                  title="Hôtel VATOLAHY Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.393032176275!2d47.0307165!3d-19.8590461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21e50e5bedb8cd11%3A0x7bfd8f5b462bb3e5!2sHotel%20VATOLAHY!5e0!3m2!1sen!2smg!4v1718030000000!5m2!1sen!2smg"
                  width="100%"
                  height="384"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            
            <div className="mt-8 bg-white rounded-lg shadow-luxury p-6">
              <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Directions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-primary-800 mb-2">Depuis le centre-ville</h4>
                  <p className="text-gray-600">
                    Sur l’axe principal de la RN4, à 5 minutes en voiture du centre-ville d’Antsirabe.
                    L’hôtel est facilement accessible depuis la route principale, avec un grand parking disponible.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-primary-800 mb-2">Informations sur le stationnement</h4>
                  <p className="text-gray-600">
                    Pour votre tranquillité d’esprit, l’HÔTEL VATOLA met à la disposition de ses clients un grand parking intérieur sécurisé, 
                     entièrement gratuit et sous surveillance permanente. Vous pourrez ainsi profiter pleinement de
                     votre séjour, en toute sérénité, en sachant que votre véhicule est en sécurité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;