import { LabReport } from '../types';

export const LAB_REPORTS: Record<string, LabReport> = {
  'fm-atta-chakki': {
    id: 'LAB-FM-8921',
    productId: 'fm-atta-chakki',
    productName: 'Chakki Fresh Atta',
    batchNumber: 'BATCH-2026-CH89',
    testDate: 'Oct 15, 2026',
    labName: 'Shri Ram Institute for Industrial Research (NABL Accredited)',
    nablAccreditation: 'TC-5482 / FSSAI Recognized',
    parameters: [
      { name: '230+ Pesticide Residues (Organochlorine & Phosphates)', standard: '< 0.01 mg/kg', result: 'Not Detected (0.00)', status: 'Pass' },
      { name: 'Lead (Pb) & Heavy Metals', standard: '< 0.2 mg/kg', result: 'Not Detected (0.00)', status: 'Pass' },
      { name: 'Artificial Bleach (Benzoyl Peroxide)', standard: 'Absent', result: 'Negative (100% Zero)', status: 'Pass' },
      { name: 'Dietary Bran & Germ Content', standard: '> 11.5%', result: '12.8% (Intact)', status: 'Safe' },
      { name: 'Natural Moisture', standard: '< 13.0%', result: '11.4%', status: 'Safe' },
      { name: 'Gluten Strength / Index', standard: '> 80%', result: '88.5%', status: 'Pass' }
    ]
  },
  'fm-spice-turmeric': {
    id: 'LAB-FM-7740',
    productId: 'fm-spice-turmeric',
    productName: 'Turmeric (Haldi) Powder',
    batchNumber: 'BATCH-2026-HL41',
    testDate: 'Oct 14, 2026',
    labName: 'Eurofins Analytical Services India (NABL & EIC Approved)',
    nablAccreditation: 'TC-6291 / FSSAI Recognized',
    parameters: [
      { name: 'Active Curcumin Content (HPLC method)', standard: '> 2.50%', result: '3.82% w/w (Superior)', status: 'Pass' },
      { name: 'Lead Chromate & Artificial Yellow Dyes', standard: 'Negative', result: 'Absent (Zero)', status: 'Pass' },
      { name: 'Starch & Chalk Adulteration', standard: 'Negative', result: 'Absent', status: 'Pass' },
      { name: 'Aflatoxins B1, B2, G1, G2', standard: '< 10 mcg/kg', result: 'Not Detected', status: 'Pass' },
      { name: 'Volatile Essential Oils', standard: '> 3.5 ml/100g', result: '5.2 ml/100g (Intact)', status: 'Safe' }
    ]
  },
  'fm-flour-mota-besan': {
    id: 'LAB-FM-6312',
    productId: 'fm-flour-mota-besan',
    productName: 'Stoneground Mota Besan',
    batchNumber: 'BATCH-2026-BS19',
    testDate: 'Oct 16, 2026',
    labName: 'Vimta Labs Ltd. (NABL Accredited)',
    nablAccreditation: 'TC-5120 / FSSAI Recognized',
    parameters: [
      { name: 'Kesari Dal / Pea Flour Adulteration', standard: 'Negative', result: 'Absent (100% Chana)', status: 'Pass' },
      { name: 'Crude Protein (N x 6.25)', standard: '> 20.0%', result: '22.4% (High Protein)', status: 'Pass' },
      { name: 'Uric Acid / Insect Fragments', standard: '< 100 mg/kg', result: 'Not Detected', status: 'Pass' },
      { name: 'Particle Granularity (Danedar Mesh)', standard: 'Coarse 60 Mesh', result: 'Conforms to Mota', status: 'Safe' }
    ]
  },
  'fm-honey-raw': {
    id: 'LAB-FM-9410',
    productId: 'fm-honey-raw',
    productName: '100% Natural Honey',
    batchNumber: 'BATCH-2026-HN07',
    testDate: 'Oct 12, 2026',
    labName: 'Intertek Food Testing Services (Bruker NMR Profile)',
    nablAccreditation: 'TC-7043 / Export Council Approved',
    parameters: [
      { name: 'NMR (Nuclear Magnetic Resonance) Profile', standard: '100% Authentic', result: 'Pass (Natural Flora)', status: 'Pass' },
      { name: 'C4 & C3 Added Sugar Syrups (Rice/Corn/Cane)', standard: '< 7.0%', result: '0.0% (Zero Adulteration)', status: 'Pass' },
      { name: 'Diastase Enzyme Activity (Gothe scale)', standard: '> 8.0 DN', result: '14.6 DN (High Enzyme)', status: 'Safe' },
      { name: 'Hydroxymethylfurfural (HMF - Unheated check)', standard: '< 40 mg/kg', result: '6.4 mg/kg (Raw Unheated)', status: 'Pass' },
      { name: 'Pollen Grain Count', standard: '> 100,000 / 10g', result: '320,000 (Rich Pollen)', status: 'Safe' }
    ]
  },
  'fm-oil-mustard': {
    id: 'LAB-FM-5109',
    productId: 'fm-oil-mustard',
    productName: 'Wood Pressed Mustard Oil',
    batchNumber: 'BATCH-2026-MO33',
    testDate: 'Oct 17, 2026',
    labName: 'National Test House (Government of India)',
    nablAccreditation: 'TC-5834 / AGMARK Grade 1',
    parameters: [
      { name: 'Argemone Oil Test (Halphen / Ferric Chloride)', standard: 'Negative', result: 'Absent (Zero)', status: 'Pass' },
      { name: 'Natural Pungency (Allyl Isothiocyanate)', standard: '> 0.25%', result: '0.34% (Strong Kachi Ghani)', status: 'Pass' },
      { name: 'Free Fatty Acids (as Oleic Acid)', standard: '< 1.50%', result: '0.42% (Ultra Low)', status: 'Pass' },
      { name: 'Hexane / Chemical Solvent Residue', standard: 'Zero', result: 'Not Detected', status: 'Pass' }
    ]
  }
};
