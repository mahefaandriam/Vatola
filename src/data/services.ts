import type { Service } from '../types';

export const pubServices: Service[] = [
  {
    id: 'classic-cocktails',
    name: 'Cocktails classiques',
    description: 'Nos experts en mixologie créent des cocktails classiques parfaits à partir de spiritueux de qualité supérieure et d’ingrédients frais.',
    image: '/une-verre2.jpg'
  },
  {
    id: 'craft-beers',
    name: 'Bières artisanales',
    description: 'Profitez de notre sélection de bières artisanales locales et internationales, soigneusement sélectionnées pour leur qualité et leur goût. ',
    image: '/clients1.jpg'
  },
  {
    id: 'wine-selection',
    name: 'Vins raffinés',
    description: 'Notre carte des vins propose des bouteilles exceptionnelles provenant de vignobles renommés du monde entier.',
    image: '/tab-de-vin.JPG'
  },
  {
    id: 'gourmet-bites',
    name: 'Bouchées gastronomiques au bar',
    description: 'Délicieux petits plats et apéritifs parfaits pour partager tout en savourant vos boissons préférées.',
    image: '/plat3.jpg'
  }
];

export const spaServices: Service[] = [
  {
    id: 'swedish-massage',
    name: 'Massage suédois',
    description: 'Un massage classique du corps entier utilisant une pression douce à ferme pour favoriser la relaxation et soulager la tension musculaire.',
    price: 120,
    duration: '60 minutes',
    image: 'https://images.pexels.com/photos/3865676/pexels-photo-3865676.jpeg'
  },
  {
    id: 'deep-tissue-massage',
    name: 'L’art du massage en pleine conscience',
    description: 'Nous pratiquons l’art du massage en pleine conscience : une approche où le corps est écouté, respecté, honoré.',
    price: 150,
    duration: '60 minutes',
    image: '/spa5.jpg'
  },
  {
    id: 'facial-treatment',
    name: 'Luxury Facial',
    description: 'Revitalisez votre peau avec notre soin du visage premium à base de produits bio adaptés à votre type de peau.',
    price: 130,
    duration: '75 minutes',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg'
  },
  {
    id: 'body-scrub',
    name: 'Gommage corporel exotique',
    description: 'Un soin exfoliant luxueux qui laisse votre peau éclatante et rajeunie. ',
    price: 110,
    duration: '45 minutes',
    image: '/spa6.jpg'
  }
];

export const nailServices: Service[] = [
  {
    id: 'classic-manicure',
    name: 'Manucure classique',
    description: 'Notre manucure classique comprend la mise en forme des ongles, le soin des cuticules, le massage des mains et l’application du vernis.',
    price: 40,
    duration: '45 minutes',
    image: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg'
  },
  {
    id: 'luxury-pedicure',
    name: 'Pédicure de luxe',
    description: 'L’expérience ultime de soins des pieds avec exfoliation, élimination des callosités, massage et polissage parfait.',
    price: 60,
    duration: '60 minutes',
    image: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg'
  },
  {
    id: 'gel-nails',
    name: 'Ongles en gel',
    description: 'Gel-polish longue tenue, résistant aux copeaux et à la brillance parfaite qui dure des semaines.',
    price: 55,
    duration: '60 minutes',
    image: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg'
  },
  {
    id: 'nail-art',
    name: 'Art personnalisé',
    description: 'Exprimez votre style avec des designs de nail art personnalisés créés par nos techniciens talentueux.',
    price: 70,
    duration: '75 minutes',
    image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg'
  }
];