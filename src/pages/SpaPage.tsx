import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import { spaServices } from '../data/services';
import { supabase } from '../lib/supabaseClient';
import { Leaf, Phone } from 'lucide-react';

const SpaPage: React.FC = () => {
  const [media, setMedia] = useState<{ id: number; url: string; type: 'image' | 'video'; published?: boolean | null; }[]>([]);
  const [assetMedia, setAssetMedia] = useState<{ id: number; url: string; type: 'image' | 'video'; published?: boolean | null; }[]>([]);
  const [tariffs, setTariffs] = useState<{ id: number; label: string; price: number; notes?: string | null; }[]>([]);

  useEffect(() => {
      document.title = "Spa & Bien-être - Vatola Hotel";
      const load = async () => {
        const [{ data: mediaData }, { data: tariffData }] = await Promise.all([
          supabase.from('spa_media').select('id, url, type, published').order('created_at', { ascending: false }),
          supabase.from('spa_tariffs').select('id, label, price, notes').order('created_at', { ascending: false })
        ]);
        setMedia((mediaData as any[]) || []);
        setTariffs((tariffData as any[]) || []);
        try {
          const { data: assetsData } = await supabase
            .from('media_assets')
            .select('id, url, type, category, published')
            .eq('category', 'spa')
            .order('created_at', { ascending: false });
          setAssetMedia(((assetsData as any[]) || []).map(a => ({ id: a.id, url: a.url, type: a.type as 'image' | 'video', published: a.published })));
        } catch (_) {}
      };
      load();
    }, []);

  const publishedMedia = [...media, ...assetMedia].filter(m => m.published === true);

  return (
    <div>
      <Hero
        title="Spa & Bien-être"
        subtitle="Offrez-vous un monde de détente et de revitalisation avec nos soins spa."
        image="/care.webp"
        ctaText='Réservez votre séance dès maintenant'
        ctaLink='/contact'
        height="h-[70vh]"
      />
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Notre service bien être"
                subtitle="Un havre de paix pour votre corps et votre esprit"
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Entrez dans notre sanctuaire de spa et laissez le monde derrière vous. Notre espace magnifiquement conçu offre une retraite paisible où vous pouvez échapper au stress de la vie quotidienne et se concentrer entièrement sur votre bien-être.
              </p>
              <p className="text-gray-600 mb-6">
                Notre équipe de thérapeutes expérimentés est dévouée à fournir des traitements personnalisés qui répondent à vos besoins spécifiques. En utilisant des produits haut de gamme et des techniques traditionnelles, nous créons des expériences qui rajeunissent et restaurent.
              </p>
              <p className="text-gray-600">
                Des massages revigorants aux soins du visage réparateurs, chaque soin est conçu pour favoriser le bien-être et la relaxation. Notre approche holistique garantit que vous quittez la maison rafraîchie, équilibrée et pleine de vitalité.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src={(publishedMedia[0]?.url) || "/spa2.webp"}
                alt="Spa Ambiance"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src={(publishedMedia[1]?.url) || "/spa3.webp"}
                alt="Spa Ambiance"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src={(publishedMedia[2]?.url) || "/care2.webp"}
                alt="Spa Bath"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src={(publishedMedia[3]?.url) || "spa4.webp"}
                alt="Spa Ambiance"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Nos traitements exclusifs"
            subtitle=""
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spaServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="mt-12 text-center flex item-center justify-center">
            <a
              href="tel:+15551234567"
            >
              <div className='flex bg-accent text-white py-3 px-5 rounded-md'>
                Réserver vos soins
                <Phone size={18} className="ml-2 mt-1" />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Galerie Spa" subtitle="Photos et vidéos publiées par l'administration" />
          {publishedMedia.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {publishedMedia.map((m, idx) => (
                <div key={m.id ?? idx} className="group relative overflow-hidden rounded-lg shadow-luxury">
                  {m.type === 'image' ? (
                    <img src={m.url} alt="Media Spa" loading="lazy" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <video src={m.url} controls className="w-full h-64 object-cover" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Aucun média publié pour le moment.</p>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Tarifs Piscine & Spa" subtitle="Tarification en Ariary (AR). Bonnet obligatoire pour la piscine." />
          {tariffs.length > 0 ? (
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
                <ul className="space-y-2 text-gray-700">
                  {tariffs.map(t => (
                    <li key={t.id} className="flex justify-between">
                      <span>{t.label}{t.notes ? ` – ${t.notes}` : ''}</span>
                      <span className="font-semibold text-primary-800">{t.price} Ar</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Piscine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Entrée piscine : 10 000 Ar / personne</li>
                  <li>Bonnet obligatoire (location 5 000 Ar · vente 10 000 Ar)</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-6 shadow-luxury">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Spa</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>Massage partiel (une seule partie du corps) : à partir de 30 000 Ar</li>
                  <li>Massage relaxant (60 min, tête aux pieds) : 60 000 Ar</li>
                  <li>Stone therapy (pierres chaudes, ~60 min) : 60 000 Ar</li>
                  <li>Massage holistique (90 min, ciblé sur une douleur) : 90 000 Ar</li>
                  <li>Sauna (vapeur sèche) : 35 000 Ar</li>
                  <li>Hammam (vapeur humide) : 25 000 Ar</li>
                  <li>Bains thermaux à l’eau de Ranovisy : 20 000 Ar</li>
                  <li>Jacuzzi (eau de Ranovisy ~42°) : 35 000 Ar / personne / heure</li>
                  <li>Séance de yoga : veuillez consulter les modalités d’inscription et de réservation</li>
                </ul>
                <div className="mt-4 text-gray-700">
                  <p className="font-semibold">Nos offres du moment</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Package holistique (≈2h) : 99 000 Ar — Massage relaxant (60 min), bain thermal (durée illimitée), sauna ou hammam au choix</li>
                    <li>Bain + massage : 35 000 Ar — Massage pieds & tête pendant le bain (~15 min), bain durée illimitée</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/*
      <section className="py-20 bg-primary-800 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Installations de spa"
            subtitle="Explorez notre gamme d’installations conçues pour améliorer votre bien-être. "
            light={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="spa7.webp"
                  alt="Salle de détente"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Détente dans le Sauna</h3>
              <p className="text-gray-300">
                Laissez-vous envelopper par la chaleur sèche du sauna, ce cocon bienfaisant où le temps semble suspendu.
                Sous l’effet de la température élevée, les tensions se dissipent, les muscles se relâchent, et l’esprit s’apaise.
              </p>
            </div>
            
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="spa2.webp"
                  alt="Sauna"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2"> L’instant où tout ralentit </h3>
              <p className="text-gray-300">
                Dans une atmosphère douce et enveloppante, le Spa vous invite à lâcher prise, à vous reconnecter à vous-même et à ressentir chaque instant.
                Bain chaud, sauna, hammam, soins du corps, rituels du monde… Chaque expérience est une invitation à la détente profonde et à la régénération intérieure.
              </p>
            </div>
            
            <div className="bg-primary-700 rounded-lg p-6 hover:bg-primary-600 transition duration-300">
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src="/sauna1.webp"
                  alt="Steam Room"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">Hammam aromatique</h3>
              <p className="text-gray-300">
                Notre hammam aromatique offre les bienfaits de la chaleur humide associée aux huiles essentielles pour ouvrir les pores, améliorer la circulation et favoriser une relaxation profonde.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Spa Packages"
            subtitle="Offrez-vous nos forfaits spa soigneusement conçus pour une expérience bien-être complète."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="relaxation.webp"
                  alt="Relaxation Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Relaxation
                </h3>
                <p className="text-gray-600 mb-4">
                  Détendez-vous avec notre forfait de relaxation signature comprenant un massage suédois, un visage rafraîchissant et l’accès à toutes les installations du spa.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$220</span>
                    <span className="text-sm text-gray-500"> / 2.5 heures</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="massageduo.webp"
                  alt="Couples Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Retraite en couple
                </h3>
                <p className="text-gray-600 mb-4">
                  Partagez une expérience spéciale avec des massages côte à côte, une séance privée de hammam et du champagne gratuit pour deux.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$380</span>
                    <span className="text-sm text-gray-500"> / 3 heures (pour deux)</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-luxury">
              <div className="h-48 overflow-hidden">
                <img
                  src="rajeunissement.webp"
                  alt="Rejuvenation Package"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-2">
                  Rajeunissement total
                </h3>
                <p className="text-gray-600 mb-4">
                  Revitalisez votre corps et votre esprit avec notre forfait complet comprenant un massage des tissus profonds, un soin du visage de luxe et un gommage corporel.
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-semibold text-primary-800 text-xl">$320</span>
                    <span className="text-sm text-gray-500"> / 3.5 heures</span>
                  </div>
                  <a
                    href="tel:+15551234567"
                    className="text-accent hover:text-gold-700 font-medium transition duration-300"
                  >
                    Réservez Maintenant
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      */}
         
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Salons d’esthétique – Beauté, soin et élégance"
                subtitle="Offrez-vous des soins de qualité."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
                Offrez-vous une parenthèse de beauté dans nos salons d’esthétique, où chaque détail est pensé pour sublimer votre apparence et révéler votre éclat naturel. Dans une atmosphère élégante et relaxante, nos professionnelles vous accueillent pour une expérience de soin complète et personnalisée.
              </p>
              <p className="text-gray-600 mb-6">
                Onglerie : Manucures soignées, poses de vernis classiques ou semi-permanents, nail art… chaque geste est réalisé avec précision pour des mains impeccables et raffinées.
              </p>
              <p className="text-gray-600 mb-6">
               Coiffure : Du simple brushing aux coupes tendances, en passant par les soins capillaires ou les coiffures événementielles, notre salon vous garantit des résultats à la hauteur de vos envies.
              </p>
              <p className="text-gray-600 mb-6">
                Pédicure : Accordez une attention particulière à vos pieds grâce à nos soins pédicure, alliant hygiène, confort et esthétisme, pour une sensation de légèreté absolue.
              </p>
              <p className="text-gray-600">
                Nos salons sont conçus comme un véritable cocon de bien-être, où la beauté devient un art, et chaque client(e) une priorité.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/nails.jpg"
                alt="Manicure Service"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/nails5.webp"
                alt="Pedicure Service"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="pedicure.jpg"
                alt="Gel Nails"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="coiffure.jpg"
                alt="Nail Art"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>
      
       <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="grid grid-cols-2 gap-4">
              <img
                src="/spa4.webp"
                alt="Manicure Service"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <img
                src="/spa1.webp"
                alt="Pedicure Service"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <div></div>
              <img
                src="spa2.webp"
                alt="Gel Nails"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              
            </div>

            <div>
              <SectionTitle
                title="Jacuzzi à l’eau de source ranovisy"
                subtitle="Offrez-vous des soins de qualité dans un environnement douce et relaxant."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
              Offrez-vous un moment de détente ultime dans notre jacuzzi exceptionnel, alimenté directement par la 
              célèbre eau de source de Ranovisy, réputée pour sa pureté et ses vertus bienfaisantes. Niché dans un 
              cadre naturel apaisant, notre jacuzzi combine les bienfaits de l’hydrothérapie avec ceux d’une eau
               naturellement riche en minéraux, pour une expérience de bien-être revitalisante.
              </p>
              <p className="text-gray-600 mb-6">
                Laissez les bulles vous masser en douceur pendant que l’eau de source vous enveloppe, procurant une sensation de 
                relaxation profonde. Que ce soit après une journée d’excursion ou simplement pour se reconnecter à soi-même, ce 
                moment dans notre jacuzzi est un véritable rituel de ressourcement.
              </p>
            </div>
            
            
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle
                title="Hammam & Sauna – Détente et purification"
                subtitle="Offrez à votre corps et votre esprit un moment de pure évasion dans notre espace Hammam & Sauna, dédié à la relaxation, à la purification et au lâcher-prise."
                alignment="left"
              />
              <p className="text-gray-600 mb-6">
               <Leaf /> Le Hammam, avec sa chaleur humide et enveloppante, nettoie la peau en profondeur, élimine les toxines et détend les muscles. Parfait pour relâcher les tensions et revitaliser le corps tout en douceur.
              </p>
              <p className="text-gray-600 mb-6">
                Le Sauna, grâce à sa chaleur sèche, stimule la circulation sanguine, renforce le système immunitaire et procure une sensation immédiate de bien-être. Un véritable rituel nordique pour recharger les batteries.
              </p>
              <p className="text-gray-600">
                En combinant ces deux traditions, vous offrez à votre organisme un soin complet, alternant chaleur, repos et fraîcheur. Un voyage sensoriel qui allie santé, beauté et sérénité.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src="/sauna.jpg"
                alt="Manicure Service"
                loading="lazy"
                className="w-full h-64 object-cover object-center rounded-lg shadow-luxury"
              />
              <img
                src="/harmony.jpg"
                alt="Pedicure Service"
                loading="lazy"
                className="w-full h-64 object-cover rounded-lg shadow-luxury"
              />
              <div></div>
              <img
                src="Hamam.jpg"
                alt="Nail Art"
                loading="lazy"
                className="w-full h-64 object-cover object-bottom rounded-lg shadow-luxury"
              />
            </div>
          </div>
        </div>
      </section>
      {/*
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle
            title="Spa Horaires & informations"
            subtitle="Planifiez votre visite à notre spa de luxe."
          />
          
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-luxury p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Horaires d'ouverture</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Lundi - Vendredi</span>
                    <span className="font-medium text-primary-800">9:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Samedi - Dimanche</span>
                    <span className="font-medium text-primary-800">10:00 AM - 7:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-semibold text-primary-800 mb-4">Etiquette du Spa </h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Veuillez arriver 15 minutes avant votre traitement prévu</li>
                  <li>Parlez doucement pour maintenir l’atmosphère tranquille</li>
                  <li>Éteindre les téléphones portables dans les zones de traitement et de relaxation</li>
                  <li>Informez-nous de tout problème de santé ou allergie</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 mb-4">
                Pour les rendez-vous et les demandes de renseignements, veuillez communiquer avec la réception du spa :
              </p>
              <a
                href="tel:+15551234567"
                className="bg-accent hover:bg-gold-700 text-white font-medium px-6 py-2 rounded-md transition duration-300"
              >
                Réservez votre expérience au spa
              </a>
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
};

export default SpaPage;
