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
    isPrimary: true,
    speciality: 'High-Pungency Kachi Ghani Kolhu & Single-Origin Spices',
    activeChakkis: 6,
    featuredNotice: '⭐ Primary Hub: Udyog Vihar Agro Extraction Facility, Gurugram'
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

export function findNearestOutlet(userLat: number, userLng: number): {
  outlet: FactoryOutlet;
  distanceKm: number;
} {
  let nearest = FACTORY_OUTLETS[0];
  let minDistance = Infinity;

  for (const outlet of FACTORY_OUTLETS) {
    const dist = calculateDistanceKm(userLat, userLng, outlet.latitude, outlet.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = outlet;
    }
  }

  return { outlet: nearest, distanceKm: minDistance };
}

// Known coordinates for fast client-side geocoding and reverse lookup
export const KNOWN_PINCODES: Record<string, { lat: number; lng: number; label: string; city: string }> = {
  // Ghaziabad & Rajnagar Extension
  '201017': { lat: 28.7058, lng: 77.4265, label: 'MCC Signature Heights / Rajnagar Extension', city: 'Ghaziabad' },
  '201002': { lat: 28.6692, lng: 77.4538, label: 'Ghaziabad City', city: 'Ghaziabad' },
  '201001': { lat: 28.6692, lng: 77.4538, label: 'Ghaziabad Central', city: 'Ghaziabad' },
  '201010': { lat: 28.6360, lng: 77.3820, label: 'Vasundhara, Ghaziabad', city: 'Ghaziabad' },
  '201014': { lat: 28.6433, lng: 77.3756, label: 'Kaushambi / Vaishali', city: 'Ghaziabad' },
  '201012': { lat: 28.6750, lng: 77.4120, label: 'Sanjay Nagar / Rajnagar', city: 'Ghaziabad' },

  // Noida & Greater Noida
  '201309': { lat: 28.6280, lng: 77.3649, label: 'Sector 62 / Electronic City', city: 'Noida' },
  '201301': { lat: 28.5700, lng: 77.3200, label: 'Sector 18 / Atta Market', city: 'Noida' },
  '201304': { lat: 28.5200, lng: 77.3800, label: 'Sector 137 / Express Highway', city: 'Noida' },
  '201307': { lat: 28.5900, lng: 77.3100, label: 'Sector 1 / Film City', city: 'Noida' },
  '201310': { lat: 28.4744, lng: 77.5040, label: 'Greater Noida Pari Chowk', city: 'Greater Noida' },

  // Gurugram & Haryana
  '122016': { lat: 28.5034, lng: 77.0865, label: 'Udyog Vihar Phase 4', city: 'Gurugram' },
  '122001': { lat: 28.4595, lng: 77.0266, label: 'Old Railway Road / Civil Lines', city: 'Gurugram' },
  '122002': { lat: 28.4700, lng: 77.0800, label: 'DLF Phase 1 / Phase 2 / Cyber Hub', city: 'Gurugram' },
  '122018': { lat: 28.4200, lng: 77.0400, label: 'Golf Course Extension / Sohna Rd', city: 'Gurugram' },

  // Delhi Central / South / East / North / West
  '110001': { lat: 28.6315, lng: 77.2167, label: 'Connaught Place / Central Delhi', city: 'New Delhi' },
  '110017': { lat: 28.5355, lng: 77.2100, label: 'Saket / Malviya Nagar', city: 'South Delhi' },
  '110019': { lat: 28.5420, lng: 77.2580, label: 'Kalkaji / Nehru Place', city: 'South Delhi' },
  '110024': { lat: 28.5680, lng: 77.2340, label: 'Lajpat Nagar / Defence Colony', city: 'South Delhi' },
  '110091': { lat: 28.6180, lng: 77.3050, label: 'Mayur Vihar Phase 1 / East Delhi', city: 'East Delhi' },
  '110092': { lat: 28.6300, lng: 77.3000, label: 'Anand Vihar / Laxmi Nagar', city: 'East Delhi' },
  '110085': { lat: 28.7100, lng: 77.1100, label: 'Rohini Sector 7', city: 'North West Delhi' },

  // Bengaluru
  '560038': { lat: 12.9719, lng: 77.6412, label: 'Indiranagar 12th Main', city: 'Bengaluru' },
  '560001': { lat: 12.9770, lng: 77.5950, label: 'MG Road / Brigade Road', city: 'Bengaluru' },
  '560034': { lat: 12.9340, lng: 77.6250, label: 'Koramangala 4th Block', city: 'Bengaluru' },
  '560102': { lat: 12.9120, lng: 77.6440, label: 'HSR Layout Sector 1', city: 'Bengaluru' },
  '560103': { lat: 12.9260, lng: 77.6760, label: 'Bellandur / Outer Ring Rd', city: 'Bengaluru' },
  '560066': { lat: 12.9698, lng: 77.7500, label: 'Whitefield', city: 'Bengaluru' }
};

export function lookupCoordsByQuery(query: string): {
  lat: number;
  lng: number;
  label: string;
} | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // Direct 6-digit match
  const pinMatch = clean.match(/\b\d{6}\b/);
  if (pinMatch && KNOWN_PINCODES[pinMatch[0]]) {
    const item = KNOWN_PINCODES[pinMatch[0]];
    return { lat: item.lat, lng: item.lng, label: `${item.label} (${pinMatch[0]})` };
  }

  // Pincode prefix match (e.g. 2010xx -> Ghaziabad, 2013xx -> Noida, 1220xx -> Gurugram, 1100xx -> Delhi, 5600xx -> Bengaluru)
  if (/^2010\d{2}$/.test(clean)) {
    return { lat: 28.7058, lng: 77.4265, label: `Ghaziabad / Rajnagar Region (${clean})` };
  }
  if (/^2013\d{2}$/.test(clean)) {
    return { lat: 28.6280, lng: 77.3649, label: `Noida Region (${clean})` };
  }
  if (/^1220\d{2}$/.test(clean)) {
    return { lat: 28.5034, lng: 77.0865, label: `Gurugram Region (${clean})` };
  }
  if (/^1100\d{2}$/.test(clean)) {
    return { lat: 28.6315, lng: 77.2167, label: `Delhi NCR Region (${clean})` };
  }
  if (/^5600\d{2}$/.test(clean) || /^5601\d{2}$/.test(clean)) {
    return { lat: 12.9719, lng: 77.6412, label: `Bengaluru Region (${clean})` };
  }

  // City or locality keyword search
  if (clean.includes('rajnagar') || clean.includes('signature') || clean.includes('ghaziabad')) {
    return { lat: 28.7058, lng: 77.4265, label: 'MCC Signature Heights, Rajnagar Extension' };
  }
  if (clean.includes('noida') || clean.includes('fortis') || clean.includes('sector 62')) {
    return { lat: 28.6280, lng: 77.3649, label: 'Noida Sector 62 Fresh Depot' };
  }
  if (clean.includes('gurgaon') || clean.includes('gurugram') || clean.includes('udyog vihar') || clean.includes('cyber')) {
    return { lat: 28.5034, lng: 77.0865, label: 'Gurugram Udyog Vihar Agro Facility' };
  }
  if (clean.includes('bengaluru') || clean.includes('bangalore') || clean.includes('indiranagar') || clean.includes('koramangala') || clean.includes('hsr')) {
    return { lat: 12.9719, lng: 77.6412, label: 'Bengaluru Indiranagar Milling Hub' };
  }
  if (clean.includes('delhi')) {
    return { lat: 28.6315, lng: 77.2167, label: 'Central Delhi NCR' };
  }

  return null;
}
