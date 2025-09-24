import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    document.title = "Contactez-nous - Vatola Hotel";
    // Animation d'apparition au chargement
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.from('contacts').insert([formData]);

      if (error) {
        alert("Erreur lors de l'envoi.");
      } else {
        setIsSubmitted(true);
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
          });
          setIsSubmitted(false);
        }, 3000);
      }
    } catch (error) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "27H10 Rue Mahazoarivo sud, Antsirabe",
      link: "https://www.google.com/maps/place/Hotel+VATOLAHY",
      delay: "0ms"
    },
    {
      icon: Phone,
      title: "Numéro de téléphone",
      content: (
        <>
          <a href="tel:+261376607863" className="hover:text-accent transition duration-300 hover:scale-105 inline-block">
            +261 37 66 078 63
          </a>
          <span className="mx-2 text-accent">|</span>
          <a href="tel:+261341193777" className="hover:text-accent transition duration-300 hover:scale-105 inline-block">
            +261 34 11 937 77
          </a>
        </>
      ),
      delay: "100ms"
    },
    {
      icon: Mail,
      title: "Email",
      content: (
        <a href="mailto:hotelvatola@outlook.com" className="hover:text-accent transition duration-300 hover:scale-105 inline-block">
          hotelvatola@outlook.com
        </a>
      ),
      delay: "200ms"
    },
    {
      icon: Clock,
      title: "Heures de réception",
      content: "24/7 service de réception",
      delay: "300ms"
    }
  ];
  
  return (
    <div className="overflow-hidden">
      <Hero
        title="Contactez-nous"
        subtitle="Nous sommes là pour vous aider avec toutes les demandes ou réservations."
        image="/avion.webp"
        ctaText={undefined}
        height="h-[70vh]"
      />
      
      {/* Section principale de contact */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50/30 to-white relative">
        {/* Éléments décoratifs de fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-800/5 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
              
              {/* Formulaire de contact */}
              <div className={`xl:col-span-2 transform transition-all duration-1000 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <SectionTitle
                    title="Entrer en contact"
                    subtitle="Nous aimerions avoir de vos nouvelles. Veuillez remplir le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais."
                    alignment="left"
                  />
                  
                  <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-3 transition-colors group-focus-within:text-accent">
                          Votre Nom*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 hover:border-gray-300"
                          placeholder="Votre nom complet"
                        />
                      </div>
                      
                      <div className="group">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-3 transition-colors group-focus-within:text-accent">
                          Votre adresse Email*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 hover:border-gray-300"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-3 transition-colors group-focus-within:text-accent">
                          Numéro de téléphone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 hover:border-gray-300"
                          placeholder="+261 XX XXX XXX"
                        />
                      </div>
                      
                      <div className="group">
                        <label htmlFor="subject" className="block text-gray-700 font-medium mb-3 transition-colors group-focus-within:text-accent">
                          Sujet*
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 hover:border-gray-300 bg-white"
                        >
                          <option value="" disabled>Sélectionner un sujet</option>
                          <option value="reservation">Réservation de chambres</option>
                          <option value="spa">Demande de renseignements sur le spa</option>
                          <option value="spareservation">Réservation spa</option>
                          <option value="pub">Pub & Bar</option>
                          <option value="nailsalon">Salon de manucure</option>
                          <option value="feedback">Commentaire</option>
                          <option value="other">Autres</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="group">
                      <label htmlFor="message" className="block text-gray-700 font-medium mb-3 transition-colors group-focus-within:text-accent">
                        Votre Message*
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-300 hover:border-gray-300 resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={`group relative overflow-hidden font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-accent/20 ${
                        isSubmitted 
                          ? 'bg-green-500 text-white cursor-not-allowed' 
                          : isSubmitting 
                            ? 'bg-gray-400 text-white cursor-not-allowed' 
                            : 'bg-accent hover:bg-gold-700 text-white hover:shadow-lg active:scale-95'
                      }`}
                    >
                      <span className="relative flex items-center justify-center space-x-2">
                        {isSubmitted ? (
                          <>
                            <CheckCircle size={20} />
                            <span>Message envoyé ✅</span>
                          </>
                        ) : isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            <span>Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Envoyer le Message</span>
                          </>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Informations de contact */}
              <div className={`transform transition-all duration-1000 delay-200 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 sticky top-8">
                  <h3 className="font-serif text-2xl font-bold text-primary-800 mb-8 text-center">
                    Nos Contacts
                  </h3>
                  
                  <ul className="space-y-6">
                    {contactInfo.map((item, index) => (
                      <li 
                        key={index}
                        className="group transform transition-all duration-500 hover:scale-105"
                        style={{ animationDelay: item.delay }}
                      >
                        <div className="flex items-start bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                          <div className="bg-gradient-to-br from-accent to-gold-600 p-4 rounded-full mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <item.icon size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-primary-800 mb-2 group-hover:text-accent transition-colors">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section carte et directions */}
      <section id="map" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className={`transform transition-all duration-1000 delay-300 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <SectionTitle
              title="Notre emplacement"
              subtitle="Idéalement situé pour votre commodité, avec un accès facile aux principales attractions."
            />
          </div>
          
          <div className="max-w-6xl mx-auto">
            {/* Carte interactive */}
            <div className={`transform transition-all duration-1000 delay-500 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl p-2 hover:shadow-2xl transition-all duration-500 group">
                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden relative">
                  <iframe 
                    title="Hôtel VATOLAHY Location" 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5120.665207243884!2d47.030717!3d-19.859046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21e50e5bedb8cd11%3A0x7bfd8f5b462bb3e5!2sHotel%20VATOLAHY!5e1!3m2!1sen!2smg!4v1751471802819!5m2!1sen!2smg" 
                    width="100%" 
                    height="400" 
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-xl transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl pointer-events-none"></div>
                </div>
              </div>
            </div>
            
            {/* Section directions améliorée */}
            <div className={`mt-12 transform transition-all duration-1000 delay-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <h3 className="font-serif text-2xl font-bold text-primary-800 mb-8 text-center">
                  Comment nous rejoindre
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-accent/10 to-gold-600/10 rounded-xl p-6 border-l-4 border-accent">
                      <h4 className="font-bold text-primary-800 mb-3 text-lg flex items-center">
                        <MapPin className="mr-2 text-accent" size={20} />
                        Depuis le centre-ville
                      </h4>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        Notre position est idéale pour rejoindre rapidement le centre-ville et les principaux points d'intérêt d'Antsirabe.
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Itinéraire et distance en temps réel via Google Maps.
                      </p>
                      
                      <a
                        href="https://www.google.com/maps/dir/?api=1&origin=H%C3%B4tel+de+Ville+Antsirabe&destination=Hotel+VATOLAHY&travelmode=driving"
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center space-x-2 bg-gradient-to-r from-accent to-gold-600 hover:from-gold-600 hover:to-accent text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-medium"
                      >
                        <MapPin size={18} className="group-hover:animate-bounce" />
                        <span>Voir distance & itinéraire</span>
                      </a>
                    </div>

                    {/* Informations additionnelles */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                        <div className="text-2xl font-bold text-accent mb-1">5 min</div>
                        <div className="text-sm text-gray-600">Du centre-ville</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                        <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                        <div className="text-sm text-gray-600">Parking gratuit</div>
                      </div>
                    </div>
                  </div>

                  {/* Illustration ou image décorative */}
                  <div className="hidden lg:block">
                    <div className="bg-gradient-to-br from-accent/5 to-gold-600/5 rounded-2xl p-8 text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-accent to-gold-600 rounded-full flex items-center justify-center">
                        <MapPin size={40} className="text-white" />
                      </div>
                      <h4 className="font-serif text-lg font-semibold text-primary-800 mb-2">
                        Emplacement Premium
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Situé dans le quartier calme de Mahazoarivo sud, avec accès facile à tous les services.
                      </p>
                    </div>
                  </div>
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