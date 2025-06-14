export interface Room {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  size: number;
  capacity: number;
  amenities: string[];
  images: string[];
  featured: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: number;
  duration?: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  date: string;
}

export interface BookingDetails {
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  roomType: string;
}