import type { Service } from '../types';

export const pubServices: Service[] = [
  {
    id: 'classic-cocktails',
    name: 'Cocktails classiques',
    description: 'Nos experts en mixologie créent des cocktails classiques parfaits à partir de spiritueux de qualité supérieure et d’ingrédients frais.',
    image: '/une-verre2.webp'
  },
  {
    id: 'craft-beers',
    name: 'Bières artisanales',
    description: 'Profitez de notre sélection de bières artisanales locales et internationales, soigneusement sélectionnées pour leur qualité et leur goût. ',
    image: '/clients1.webp'
  },
  {
    id: 'wine-selection',
    name: 'Vins raffinés',
    description: 'Notre carte des vins propose des bouteilles exceptionnelles provenant de vignobles renommés du monde entier.',
    image: '/tab-de-vin.webp'
  },
  {
    id: 'gourmet-bites',
    name: 'Bouchées gastronomiques au bar',
    description: 'Délicieux petits plats et apéritifs parfaits pour partager tout en savourant vos boissons préférées.',
    image: '/plat3.webp'
  }
];

export const spaServices: Service[] = [
  {
    id: 'holistique',
    name: 'Massage holistique – Harmonie du corps et de l’esprit',
    description: 'Un soin complet qui harmonise le corps, l’esprit et les émotions. À travers des gestes intuitifs et personnalisés, ce massage libère les tensions profondes et rééquilibre votre énergie.',
    duration: '60 minutes',
    image: '/massage2.webp'
  },
  {
    id: 'deep-tissue-massage',
    name: 'Massage aux ventouses',
    description: 'Une technique ancestrale qui stimule la circulation, détoxifie le corps et soulage les tensions profondes. Grâce à l’action des ventouses, ce massage réactive l’énergie et libère les blocages musculaires.',
    duration: '60 minutes',
    image: '/ventouse.webp'
  },
  {
    id: 'facial-treatment',
    name: 'Massage partiel',
    description: 'Ciblé sur une zone précise (dos, jambes, nuque…), ce massage soulage les tensions localisées et procure une relaxation rapide et efficace. Idéal pour les besoins ponctuels ou le manque de temps.',
    duration: '75 minutes',
    image: '/massage3.webp',
    price: 30000,
    priceDetail: 'A partir de 30 000 ar'
  },
  {
    id: 'body-scrub',
    name: 'Massage aux pierres chaudes',
    description: 'Un soin profondément relaxant où la chaleur douce des pierres volcaniques pénètre les muscles, libérant les tensions et favorisant la circulation. Une expérience apaisante qui allie chaleur et bien-être total.',
    duration: '45 minutes',
    image: '/chaudp.jpg'
  }
];

export const nailServices: Service[] = [
  {
    id: 'classic-manicure',
    name: 'Manucure classique',
    description: 'Notre manucure classique comprend la mise en forme des ongles, le soin des cuticules, le massage des mains et l’application du vernis.',
    price: 40,
    duration: '45 minutes',
    image: 'nails.jpg'
  },
  {
    id: 'luxury-pedicure',
    name: 'Pédicure de luxe',
    description: 'L’expérience ultime de soins des pieds avec exfoliation, élimination des callosités, massage et polissage parfait.',
    price: 60,
    duration: '60 minutes',
    image: 'nails5.webp'
  },
  {
    id: 'gel-nails',
    name: 'Ongles en gel',
    description: 'Gel-polish longue tenue, résistant aux copeaux et à la brillance parfaite qui dure des semaines.',
    price: 55,
    duration: '60 minutes',
    image: 'nails3.jpg'
  },
  {
    id: 'nail-art',
    name: 'Art personnalisé',
    description: 'Exprimez votre style avec des designs de nail art personnalisés créés par nos techniciens talentueux.',
    price: 70,
    duration: '75 minutes',
    image: 'nails2.webp'
  }
];

export const restaurantHighlights: Service[] = [
  {
    id: 'entrees-salades',
    name: 'Entrées & salades',
    description: 'Fraîcheur et saisonnalité, options légères disponibles.',
    image: '/clients1.webp'
  },
  {
    id: 'plats-specialites',
    name: 'Plats & spécialités',
    description: 'Saveurs locales et internationales, options vegan/allégé sur demande.',
    image: '/plat3.webp'
  },
  {
    id: 'desserts-boissons',
    name: 'Desserts & boissons',
    description: 'Gourmandises maison et sélection de boissons.',
    image: '/une-verre2.webp'
  }
];
