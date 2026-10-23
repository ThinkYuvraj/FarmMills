export interface FactoryOutlet {
  id: string;
  name: string;
  landmark: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  phone: string;
  timing: string;
  isPrimary?: boolean;
  speciality: string;
  activeChakkis: number;
  featuredNotice?: string;
}

export const FACTORY_OUTLETS: FactoryOutlet[] = [
  {
    id: 'outlet-mcc-rajnagar',
    name: 'MCC Signature Heights Mill Hub',
    landmark: 'MCC Signature Heights',
    address: 'Shop G-08, Commercial Arcade, MCC Signature Heights, Rajnagar Extension',
    city: 'Ghaziabad (Delhi NCR)',
    state: 'Uttar Pradesh',
    pincode: '201017',
    latitude: 28.7058,
    longitude: 77.4265,
    phone: '+91 98110 54321',
    timing: '7:00 AM – 8:30 PM (Daily)',
    isPrimary: true,
    speciality: 'Cold Emery Stone Chakki Sharbati Atta & Live Woodpressed Mustard Oil',
    activeChakkis: 4,
    featuredNotice: '⭐ Sharing your selected outlet: MCC Signature Heights, Rajnagar Extension'
  },
  {
    id: 'outlet-gurugram-udyog',
    name: 'Udyog Vihar Agro Extraction Facility',
    landmark: 'Udyog Vihar Phase 4',
    address: 'Plot 48, Agro Flour & Oil Mill Complex, Udyog Vihar Phase 4',
    city: 'Gurugram (Delhi NCR)',
    state: 'Haryana',
    pincode: '122016',
    latitude: 28.5034,
    longitude: 77.0865,
    phone: '+91 98110 54322',
    timing: '7:00 AM – 7:00 PM (Mon – Sat)',
    speciality: 'High-Pungency Kachi Ghani Kolhu & Single-Origin Spices',
    activeChakkis: 6
  },
  {
    id: 'outlet-noida-sec62',
    name: 'Noida Electronic City Fresh Depot',
    landmark: 'Near Fortis / Tech Zone',
    address: 'Shop 14, C-Block Commercial Hub, Sector 62',
    city: 'Noida (Delhi NCR)',
    state: 'Uttar Pradesh',
    pincode: '201309',
    latitude: 28.6280,
    longitude: 77.3649,
    phone: '+91 98110 54323',
    timing: '8:00 AM – 9:00 PM (Daily)',
    speciality: 'Stoneground Mota Besan & Desi Gir Cow Ghee',
    activeChakkis: 3
  },
  {
    id: 'outlet-bengaluru-indiranagar',
    name: 'Indiranagar South Milling Hub',
    landmark: '12th Main Road',
    address: '42, 12th Main Road, HAL 2nd Stage, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    latitude: 12.9719,
    longitude: 77.6412,
    phone: '+91 98765 43210',
    timing: '7:30 AM – 8:00 PM (Daily)',
    speciality: 'Sprouted Ragi Flour & Cold Pressed Sesame Oil',
    activeChakkis: 4
  }
];

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return parseFloat((R * c).toFixed(1));
}
