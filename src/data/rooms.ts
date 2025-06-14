import type { Room } from '../types';

export const rooms: Room[] = [
  {
    id: 'standard-room',
    name: 'Chambre standard',
    type: 'Standard',
    description: 'Notre chambre standard offre un espace spacieux de 25 m2 avec toutes les commodités modernes pour un séjour confortable. Il dispose d’un lit confortable, bureau, télévision à écran plat et une salle de bains privative avec douche. ',
    price: 80,
    size: 25,
    capacity: 2,
    amenities: [
      'Wi-Fi Gratuit',
      'Ecran-plat TV',
      'Climatisation',
      'Bureau de travail',
      'Salle de bain privée',
      'Douche',
      'Toilette',
      'Mini frigo'
    ],
    images: [
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      'https://images.pexels.com/photos/237371/pexels-photo-237371.jpeg'
    ],
    featured: false
  },
  {
    id: 'superior-room',
    name: 'Chambre supérieure',
    type: 'Superior',
    description: 'Notre chambre supérieure offre 35 m2 d’élégance et de confort avec un mobilier haut de gamme. Profitez d’un lit king-size, de linge de maison de luxe, d’un espace de travail spacieux et d’une salle de bain moderne avec des équipements haut de gamme.',
    price: 120,
    size: 35,
    capacity: 2,
    amenities: [
      'Wi-Fi haut débit gratuit',
      'Lit king size',
      '55-inch Smart TV',
      'Minibar gratuit',
      'Machine à café',
      'Bureau de travail',
      'Salle de bain spacieuse',
      'Douche de pluie',
      'Articles de toilette haut de gamme',
      'Peignoir et pantoufles',
      'Room service',
      'Climatisation'
    ],
    images: [
      'https://images.pexels.com/photos/262048/pexels-photo-262048.jpeg',
      'https://images.pexels.com/photos/2029719/pexels-photo-2029719.jpeg',
      'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg'
    ],
    featured: true
  },
  {
    id: 'deluxe-suite',
    name: 'Suite de luxe',
    type: 'Suite',
    description: 'Découvrez le luxe dans notre suite de luxe de 55 m 2. Avec un salon séparé, une vue panoramique, un lit king-size et une salle de bain spa avec douche et baignoire. Parfait pour les séjours prolongés ou les occasions spéciales.',
    price: 220,
    size: 55,
    capacity: 3,
    amenities: [
      'Wi-Fi ultra rapide gratuit',
      'Lit king size premium',
      'Espace de vie séparé',
      'Deux téléviseurs intelligents de 65 pouces',
      'Minibar premium entièrement approvisionné',
      'Machine à expresso',
      'Bureau de travail exécutif',
      'Salle de bains luxueuse',
      'Baignoire à trempage profond',
      'Douche à l’italienne',
      'Articles de toilette de luxe',
      'Peignoir et pantoufles',
      'service de chambre 24 heures sur 24',
      'climatiseur',
      'Vue de la ville'
    ],
    images: [
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      'https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg',
      'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg'
    ],
    featured: true
  },
  {
    id: 'family-room',
    name: 'Chambre familiale',
    type: 'Family',
    description: 'Notre chambre familiale spacieuse de 45m2 est conçue pour le confort et la commodité. Avec deux lits queen ou un lit king size plus un canapé-lit, elle est parfaite pour les familles. Caractéristiques comprennent une petite salle à manger et salle de bains avec douche et baignoire.',
    price: 150,
    size: 45,
    capacity: 4,
    amenities: [
      'Wi-Fi gratuit',
      'Deux lits queen ou lit king avec canapé-lit',
      '55-inch Smart TV',
      'Petite salle à manger',
      'Mini réfrigérateur',
      'Cafetière/théière',
      'Salle de bain spacieuse',
      'Baignoire et douche combinées',
      'Articles de toilette',
      'Climatisation',
      'Espace de stockage supplémentaire'
    ],
    images: [
      'https://images.pexels.com/photos/4825701/pexels-photo-4825701.jpeg',
      'https://images.pexels.com/photos/1648771/pexels-photo-1648771.jpeg',
      'https://images.pexels.com/photos/3754594/pexels-photo-3754594.jpeg'
    ],
    featured: false
  },
  {
    id: 'presidential-suite',
    name: 'Suite présidentielle',
    type: 'Suite',
    description: 'Notre suite présidentielle de 120 m2 représente le summum du luxe. Avec une chambre principale, des espaces de vie et de salle à manger séparés, un espace de bureau et une salle de bain palatiale. Profitez d’un service personnalisé et d’équipements exclusifs.',
    price: 450,
    size: 120,
    capacity: 4,
    amenities: [
      'Wi-Fi ultra rapide gratuit',
      'Lit de luxe king size',
      'Salon séparé',
      'Salle à manger pour 6',
      'Espace de bureau',
      'Plusieurs téléviseurs intelligents de 75 pouces',
      'Système audio haut de gamme',
      'Minibar gourmet entièrement approvisionné',
      'Réfrigérateur à vin',
      ' Cuisine complète »',
      'Machine à expresso',
      'Salle de bains Palatial',
      'Baignoire à trempage profond',
      'Douche à vapeur',
      'Dual vanities',
      'Articles de toilette de luxe',
      'Peignoirs et pantoufles haut de gamme',
      'Service de majordome 24 heures sur 24',
      'climatiseur',
      'Vues panoramiques'
    ],
    images: [
      'https://images.pexels.com/photos/5417293/pexels-photo-5417293.jpeg',
      'https://images.pexels.com/photos/6969866/pexels-photo-6969866.jpeg',
      'https://images.pexels.com/photos/6585757/pexels-photo-6585757.jpeg'
    ],
    featured: true
  }
];