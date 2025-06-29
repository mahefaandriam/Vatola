import React from 'react';
import SectionTitle from '../components/SectionTitle';
import BookingForm from '../components/BookingForm';
import {Mail, Phone} from 'lucide-react';

const BookingPage: React.FC = () => {
  return (
    <div className="pt-24 md:pt-28">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Réservez Votre Séjour"
            subtitle="Réservez votre hébergement au HÔTEL VATOLAHY et préparez-vous à vivre une expérience inoubliable."
          />
          
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <SectionTitle
              title="Informations De Réservation"
              subtitle="Détails importants sur nos politiques de réservation et d’annulation."
            />
            
            <div className="bg-gray-50 rounded-lg shadow-luxury p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Arrivée / Départ</h3>
                  <p className="text-gray-600">
                   L’heure d’arrivée est à partir de 15h00, et l’heure de départ est avant 12h00. L’enregistrement anticipé et
                    le départ tardif peuvent être disponibles sur demande, sous réserve de disponibilité et moyennant des frais supplémentaires.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Conditions de réservation</h3>
                  <p className="text-gray-600 mb-3">
                    Pour sécuriser votre réservation, nous avons besoin :
                  </p>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>Carte de crédit valide pour la garantie</li>
                    <li>Pièce d’identité avec photo émise par le gouvernement lors de l’enregistrement</li>
                    <li>Âge minimum de 18 ans pour l’invité enregistré</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Conditions d'annulation</h3>
                  <p className="text-gray-600">
                    Les réservations peuvent être annulées jusqu’à 48 heures avant la date d’arrivée prévue sans pénalité. 
                    Les annulations effectuées dans les 48 heures avant la date d’arrivée entraîneront des frais égaux à une nuit de séjour. 
                    Les non-présentations seront facturées pour la totalité du séjour réservé.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">Demandes spéciales</h3>
                  <p className="text-gray-600">
                    Nous sommes heureux de répondre aux demandes spéciales telles que des emplacements de chambres spécifiques, des informations supplémentaires 
                    commodités, ou exigences d’accessibilité. Veuillez noter que ces demandes sont soumises à 
                    disponibilité et ne peut être garantie.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Besoin d'aide ?</h3>
                <p className="text-gray-600 mb-4">
                  Notre équipe de réservation est disponible pour vous aider avec toutes vos questions ou exigences spéciales.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div
                    className="inline-flex items-center text-accent hover:text-gold-700 transition duration-300"
                  >
                    <Phone size={16} className="mr-2" />
                    <div>
                      <p className="text-accent">
                        <a href="tel:+261376607863" className='hover:text-gold-700'>
                          +261 37 66 078 63
                        </a>&nbsp;|&nbsp;
                        <a href="tel:+261341193777" className='hover:text-gold-700'>
                          +261 34 11 937 77
                        </a>
                      </p>
                    </div>
                  </div>
                  <a
                    href="mailto:hotelvatola@outlook.com"
                    className="inline-flex items-center text-accent hover:text-gold-700 transition duration-300"
                  >
                    <Mail size={16} className="mr-2" />
                    hotelvatola@outlook.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;