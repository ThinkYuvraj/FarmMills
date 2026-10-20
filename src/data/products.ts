import { Product, Review } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'fm-pickle-mango',
    slug: 'home-made-raw-mango-pickle',
    name: 'Home Made Raw Mango Pickle',
    category: 'Honey & Pickles',
    subCategory: 'Pickles',
    tagline: 'Home Made · Made With Woodpressed Mustard Oil',
    shortDesc: 'Bold and authentic flavours from our kitchen to yours. Made in small batches with cold-woodpressed mustard oil and aromatic spices.',
    fullDesc: 'Our Home Made Raw Mango Pickle is handcrafted using hand-picked raw mangoes from sun-drenched regional orchards. We preserve each wedge in our own cold woodpressed black mustard oil, slow-aged naturally with whole fenugreek, cracked mustard seeds, rock salt, turmeric and warming spices. Zero vinegar, zero preservatives, 100% natural goodness that takes you straight back to traditional nani-dadi pickling traditions.',
    ingredients: 'Raw Mango, Pure Woodpressed Cold Mustard Oil, Whole Fenugreek (Methi), Mustard Seeds (Rai), Turmeric Powder, Red Chilli, Fennel Seeds (Saunf), Rock Salt, Hing (Asafoetida) & Love.',
    storageTips: 'Store in a cool dry place. Always use a clean dry spoon. Keep the mango pieces submerged in mustard oil for lasting freshness.',
    shelfLife: '12 Months from batch date',
    farmOrigin: 'Alphonso & Ramkela Mango Orchards, Ratnagiri & Western Ghats',
    millingProcess: 'Sun-dried mango slices cured in traditional earthen Martaban jars with cold woodpressed kachi ghani mustard oil.',
    badges: ['No Preservatives', 'No Chemicals', '100% Natural', 'Woodpressed Mustard Oil'],
    rating: 4.9,
    reviewCount: 148,
    image: '/images/raw-mango-pickle.jpg',
    galleryImages: [
      '/images/raw-mango-pickle.jpg',
      '/images/489fd6f3-27f0-479c-b0b9-d3404597f705.jpeg',
      '/images/c88df554-2350-4a18-aa10-44248cb2a078.jpeg'
    ],
    packOptions: [
      { size: '250 g', price: 180, originalPrice: 210 },
      { size: '500 g', price: 340, originalPrice: 390 },
      { size: '1 kg', price: 640, originalPrice: 750 }
    ],
    nutrition: [
      { label: 'Energy', value: '185 kcal / 100g' },
      { label: 'Natural Oils', value: '14.2 g' },
      { label: 'Carbohydrates', value: '12.8 g' },
      { label: 'Dietary Fiber', value: '4.5 g' },
      { label: 'Protein', value: '1.9 g' },
      { label: 'Preservatives', value: '0.0 mg (Zero)' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-spice-turmeric',
    slug: 'turmeric-haldi-stoneground',
    name: 'Turmeric (Haldi) Powder',
    category: 'Spices',
    subCategory: 'Turmeric',
    tagline: 'Stone Ground · No Additives & Preservatives · With Natural Oils',
    shortDesc: 'Slow stone-ground whole turmeric rhizomes rich in natural curcumin (3.5%+). Never extracted or heat treated.',
    fullDesc: 'Farmers Mill Turmeric is made by slowly stone-grinding carefully cured, whole Salem and Waigaon turmeric fingers on traditional stone mills. Industrial mills operate at high friction heat that evaporates delicate curcumin and volatile aromatic oils. Our low-rpm stone grinding keeps the golden natural essential oils intact, giving an intense warm aroma, rich earthy flavour, and potent natural immunity boosting qualities.',
    ingredients: '100% Pure Single-Origin Whole Turmeric (Curcuma Longa) Rhizomes. No artificial color, starch or fillers.',
    storageTips: 'Store in an airtight container away from direct sunlight to preserve the volatile curcumin oils.',
    shelfLife: '9 Months from milling date',
    farmOrigin: 'Erode & Waigaon Certified Organic Turmeric Farms, Maharashtra & Tamil Nadu',
    millingProcess: 'Traditional low-RPM stone mill grinding under 35°C, ensuring zero volatile oil loss.',
    badges: ['Stone Ground', 'High Curcumin (3.8%)', 'Natural Volatile Oils', 'Lab Certified Pure'],
    rating: 4.95,
    reviewCount: 312,
    image: '/images/haldi-turmeric.jpg',
    galleryImages: [
      '/images/haldi-turmeric.jpg',
      '/images/14136f19-333f-489d-87fa-c590d89d9acd.jpeg',
      '/images/e9a45544-d3f4-4f52-863b-9e49c1f7e5c5.jpeg'
    ],
    packOptions: [
      { size: '100 g', price: 85, originalPrice: 99 },
      { size: '200 g', price: 160, originalPrice: 190 },
      { size: '500 g', price: 380, originalPrice: 450 }
    ],
    nutrition: [
      { label: 'Active Curcumin', value: '3.82% w/w' },
      { label: 'Energy', value: '354 kcal / 100g' },
      { label: 'Protein', value: '7.8 g' },
      { label: 'Carbohydrates', value: '64.9 g' },
      { label: 'Essential Oils', value: '5.2 ml / 100g' },
      { label: 'Lead / Chromate', value: 'Not Detected (0 ppm)' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-flour-mota-besan',
    slug: 'stoneground-mota-besan',
    name: 'Stoneground Mota Besan',
    category: 'Besan & Flours',
    subCategory: 'Besan',
    tagline: 'Stone Ground · Whole Gram · Low Gluten High Fibers',
    shortDesc: 'Coarsely stone-milled from whole desi unpolished chana dal. Grainy texture that makes the fluffiest dhoklas and melt-in-mouth laddoos.',
    fullDesc: 'Unlike commercial besan which is finely pulverized from split pulse powders, our Mota Besan is coarsely ground between traditional granite millstones from premium Desi Chana (Bengal Gram). This artisanal coarse grind produces that beloved "danedar" crumb texture required for authentic Besan Ke Laddoo, Mysore Pak, crispy pakoras, Khandvi, and aromatic Kadhi without forming gluten lumps.',
    ingredients: '100% Whole Unpolished Desi Chana (Bengal Gram). Zero pea flour adulteration.',
    storageTips: 'Store in an airtight container in a dry pantry. Best consumed within 60 days of stone milling.',
    shelfLife: '3 Months (Milled fresh on order)',
    farmOrigin: 'Bikaner & Malwa Organic Gram Clusters, Rajasthan & MP',
    millingProcess: 'Coarse granite chakki stone ground with hull nutrients retained.',
    badges: ['No Preservatives', 'Whole Gram', 'Low Gluten & High Fiber', 'Milled Fresh'],
    rating: 4.88,
    reviewCount: 220,
    image: '/images/mota-besan.jpg',
    galleryImages: [
      '/images/mota-besan.jpg',
      '/images/db3ce4aa-37c0-4385-93db-bf7fcc9f8cd9.jpeg',
      '/images/3c52ba34-6871-4b19-a278-6056f0545ffa.jpeg'
    ],
    packOptions: [
      { size: '500 g', price: 80, originalPrice: 95 },
      { size: '1 kg', price: 150, originalPrice: 180 },
      { size: '5 kg', price: 720, originalPrice: 850 }
    ],
    nutrition: [
      { label: 'Protein', value: '22.4 g / 100g' },
      { label: 'Dietary Fiber', value: '11.8 g' },
      { label: 'Energy', value: '387 kcal' },
      { label: 'Total Carbohydrates', value: '57.8 g' },
      { label: 'Iron', value: '4.8 mg' },
      { label: 'Potassium', value: '840 mg' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-honey-raw',
    slug: 'unprocessed-unfiltered-honey',
    name: '100% Natural Honey',
    category: 'Honey & Pickles',
    subCategory: 'Honey',
    tagline: '100% Natural · Unprocessed | Unfiltered Wild Flora Honey',
    shortDesc: 'Single-source raw apiary honey directly from honeycomb boxes. Naturally rich in bee pollen, active enzymes and trace minerals.',
    fullDesc: 'Pure nectar collected by indigenous honeybees foraging on wild mustard blossoms and forest flora. We do not heat, ultra-pasteurize, or fine-filter our honey. As a result, it retains its natural pollen particles, propolis, live diastase enzymes, and delicate floral bouquet. Crystallization over time is the ultimate hallmark of raw, real, unadulterated honey.',
    ingredients: '100% Pure Raw Wild Flora Bee Honey. No corn syrup, no invert sugar, no antibiotics.',
    storageTips: 'Store at room temperature. Do not refrigerate. If crystallized, place the glass jar in warm water (under 45°C) to reliquefy naturally.',
    shelfLife: '24 Months (Pure honey never spoils)',
    farmOrigin: 'Forest Flora & Mustard Orchards, Shivalik Foothills & Chambal Valley',
    millingProcess: 'Gravity-strained through clean cotton mesh straight into sterilized glass jars.',
    badges: ['100% Raw & Wild', 'Unpasteurized', 'NMR Tested Pure', 'Preserves Active Enzymes'],
    rating: 4.97,
    reviewCount: 284,
    image: '/images/pure-honey.jpg',
    galleryImages: [
      '/images/pure-honey.jpg',
      '/images/c88df554-2350-4a18-aa10-44248cb2a078.jpeg'
    ],
    packOptions: [
      { size: '250 g', price: 240, originalPrice: 280 },
      { size: '500 g', price: 450, originalPrice: 520 },
      { size: '1 kg', price: 850, originalPrice: 990 }
    ],
    nutrition: [
      { label: 'Natural Sugars', value: '82 g / 100g' },
      { label: 'Added Sugars', value: '0.0 g (Zero)' },
      { label: 'Energy', value: '304 kcal' },
      { label: 'Diastase Enzyme Activity', value: '14.6 DN Units' },
      { label: 'C4 Sugar Content', value: '0% (FSSAI Compliant)' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-spice-dhaniya',
    slug: 'dhaniya-coriander-powder',
    name: 'Dhaniya Powder (Coriander)',
    category: 'Spices',
    subCategory: 'Coriander',
    tagline: 'Stone Ground · No Additives & Preservatives · With Natural Oils',
    shortDesc: 'Fragrant Ramganj Mandi coriander seeds stone ground slowly to preserve floral linalool aroma and crisp freshness.',
    fullDesc: 'The secret to authentic curry depth lies in cold-ground whole coriander seeds. Farmers Mill Dhaniya Powder is milled exclusively from plump green-hued seeds harvested in Ramganj Mandi, Rajasthan. By avoiding industrial high-speed pulverizers, we safeguard the natural aromatic oil pockets that give Indian curries, dals, and rasam their distinct refreshing fragrant finish.',
    ingredients: '100% Pure Whole Green Coriander (Coriandrum Sativum) Seeds. No stalk or extraneous matter.',
    storageTips: 'Keep tightly sealed in an opaque container in a cool cupboard to preserve the volatile linalool fragrance.',
    shelfLife: '9 Months from stone milling',
    farmOrigin: 'Ramganj Mandi Coriander Belt, Kota, Rajasthan',
    millingProcess: 'Cold-temperature stone milling with pre-cleaning and destoning.',
    badges: ['Stone Ground', 'Essential Linalool Oils', 'Rich Green Fragrance', 'Zero Stalk Fillers'],
    rating: 4.91,
    reviewCount: 175,
    image: '/images/dhaniya-powder.jpg',
    galleryImages: [
      '/images/dhaniya-powder.jpg',
      '/images/a8a00810-50ad-4586-b8b9-35232052097a.jpeg'
    ],
    packOptions: [
      { size: '100 g', price: 75, originalPrice: 89 },
      { size: '200 g', price: 140, originalPrice: 165 },
      { size: '500 g', price: 330, originalPrice: 390 }
    ],
    nutrition: [
      { label: 'Dietary Fiber', value: '41.9 g / 100g' },
      { label: 'Volatile Essential Oil', value: '0.45% v/w' },
      { label: 'Energy', value: '298 kcal' },
      { label: 'Protein', value: '12.3 g' },
      { label: 'Calcium', value: '709 mg' },
      { label: 'Iron', value: '16.3 mg' }
    ],
    featured: true,
    isBestseller: false
  },
  {
    id: 'fm-atta-chakki',
    slug: 'chakki-fresh-whole-wheat-atta',
    name: 'Chakki Fresh Atta',
    category: 'Fresh Atta',
    subCategory: 'Chakki Atta',
    tagline: 'Whole Grain · 100% Bran & Germ · Milled On Order',
    shortDesc: 'Traditional stone-ground whole wheat chakki atta. Milled within 24 hours of dispatch for fluffy, naturally sweet rotis.',
    fullDesc: 'Experience the real taste of pure whole wheat. In commercial factory mills, high-heat steel rollers strip off the nutrient-dense wheat germ and dietary bran to extend warehouse shelf life. At Farmers Mill, we crush 100% of the golden whole grain between hand-chiseled emery stones at low speed. All three layers—bran, endosperm, and germ—remain intact, providing exceptional fiber, natural wheat sweetness, and rotis that stay soft all day.',
    ingredients: '100% Whole Wheat Grain (Triticum Aestivum). Zero maida, zero starch, zero chemical bleaching.',
    storageTips: 'Store in a clean dry stainless steel container. Consume within 30-45 days for peak freshness.',
    shelfLife: '45 Days (No artificial shelf-life extenders)',
    farmOrigin: 'Sehore & Malwa Plateau, Madhya Pradesh',
    millingProcess: 'Traditional emery stone chakki at low RPM to prevent nutrient caramelization.',
    badges: ['Same-Day Fresh', '100% Whole Grain', 'No Preservatives', 'Milling Date on Pack'],
    rating: 4.96,
    reviewCount: 540,
    image: '/images/2a790d48-0812-4400-a06d-7958748f8da7.jpeg',
    galleryImages: [
      '/images/2a790d48-0812-4400-a06d-7958748f8da7.jpeg',
      '/images/629253da-3e8b-4287-8867-28af87737d97.jpeg',
      '/images/c7702f34-2d4c-4994-9757-ac0571c00f78.jpeg'
    ],
    packOptions: [
      { size: '1 kg', price: 60, originalPrice: 70 },
      { size: '5 kg', price: 280, originalPrice: 330 },
      { size: '10 kg', price: 540, originalPrice: 650 }
    ],
    nutrition: [
      { label: 'Dietary Fiber', value: '12.6 g / 100g' },
      { label: 'Protein', value: '13.2 g' },
      { label: 'Complex Carbs', value: '71.5 g' },
      { label: 'Energy', value: '349 kcal' },
      { label: 'Iron', value: '3.9 mg' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-atta-sharbati',
    slug: 'mp-sharbati-wheat-flour',
    name: 'MP Sharbati Wheat Flour',
    category: 'Fresh Atta',
    subCategory: 'Sharbati Wheat',
    tagline: 'Premium Golden Sharbati · Rain-Fed Soils of Sehore',
    shortDesc: 'The gold standard in wheat. Rain-fed Sehore Sharbati grains known for their high natural moisture absorption and velvety soft rotis.',
    fullDesc: 'Sharbati wheat grains from the black fertile soil of Sehore, MP are heavy, golden, and naturally rich in slow-burning complex carbohydrates. When stone ground, the flour absorbs more water, yielding dough that is pliable and doughy, producing exceptionally tender, fragrant phulkas that remain moist for hours in your lunchbox.',
    ingredients: '100% Pure MP Sehore Sharbati Wheat. Unadulterated and unpolished.',
    storageTips: 'Store in an airtight bin in a dry place. Keep away from moisture.',
    shelfLife: '45 Days from stone milling',
    farmOrigin: 'Sehore District, Black Cotton Soil, Madhya Pradesh',
    millingProcess: 'Slow chakki stone milled on order.',
    badges: ['Sehore Origin', 'Super Soft Rotis', 'Naturally Sweet', 'High Water Absorption'],
    rating: 4.93,
    reviewCount: 388,
    image: '/images/598f000a-1790-4cd8-8fde-bdbc8aca96dd.jpeg',
    galleryImages: [
      '/images/598f000a-1790-4cd8-8fde-bdbc8aca96dd.jpeg',
      '/images/440947c8-f4d1-4f2b-8826-28389b08aaae.jpeg'
    ],
    packOptions: [
      { size: '5 kg', price: 320, originalPrice: 375 },
      { size: '10 kg', price: 620, originalPrice: 720 }
    ],
    nutrition: [
      { label: 'Protein', value: '13.8 g / 100g' },
      { label: 'Dietary Fiber', value: '13.1 g' },
      { label: 'Energy', value: '358 kcal' },
      { label: 'Moisture Absorbed', value: '+18% vs regular' }
    ],
    featured: false,
    isBestseller: true
  },
  {
    id: 'fm-flour-ragi',
    slug: 'sprouted-ragi-flour',
    name: 'Ragi (Finger Millet) Flour',
    category: 'Besan & Flours',
    subCategory: 'Millet Flours',
    tagline: 'Stone Ground Chakki Fresh · Calcium & Mineral Powerhouse',
    shortDesc: 'Nutrient-rich finger millet stone milled under low temperatures. Ideal for ragi rotis, mudde, dosa, and wholesome porridge.',
    fullDesc: 'Ragi is one of nature’s richest plant sources of calcium, providing 10 times more calcium than rice or wheat. Our Ragi flour is crafted from whole brown finger millets grown in Karnataka, carefully cleaned, sun-dried, and ground on stone chakki to maintain its vital dietary minerals and polyphenols.',
    ingredients: '100% Whole Finger Millet (Eleusine Coracana). Gluten-Free Grain.',
    storageTips: 'Keep in an airtight container in a cool spot. For longer storage, you may keep it refrigerated.',
    shelfLife: '3 Months',
    farmOrigin: 'Mandya & Hassan Rainfed Farms, Karnataka',
    millingProcess: 'Stone milled whole grain including pericarp and embryo.',
    badges: ['High Calcium (344mg)', '100% Gluten-Free', 'Low Glycemic Index', 'Pure Millet'],
    rating: 4.87,
    reviewCount: 164,
    image: '/images/b7fe7168-630f-44b6-9c7e-e4141509c124.jpeg',
    galleryImages: [
      '/images/b7fe7168-630f-44b6-9c7e-e4141509c124.jpeg',
      '/images/5cfced04-a9dd-4e2e-b0ef-2a92fc7d16a2.jpeg'
    ],
    packOptions: [
      { size: '500 g', price: 65, originalPrice: 75 },
      { size: '1 kg', price: 120, originalPrice: 145 }
    ],
    nutrition: [
      { label: 'Calcium', value: '344 mg / 100g' },
      { label: 'Dietary Fiber', value: '18.8 g' },
      { label: 'Protein', value: '7.3 g' },
      { label: 'Iron', value: '3.9 mg' }
    ],
    featured: false,
    isBestseller: false
  },
  {
    id: 'fm-oil-mustard',
    slug: 'wood-pressed-mustard-oil',
    name: 'Wood Pressed Mustard Oil',
    category: 'Oils & Ghee',
    subCategory: 'Wood Pressed Oils',
    tagline: 'Kachi Ghani · Black Mustard Seeds · Single Filtered',
    shortDesc: 'Pungent, authentic raw mustard oil cold extracted in traditional Marachekku wooden kolhus. Unheated and unrefined.',
    fullDesc: 'True Kachi Ghani mustard oil extracted with heavy wooden pestles at speeds under 16 RPM. The oil temperature never exceeds room temperature, retaining the sinus-clearing natural allyl isothiocyanate pungency, natural Omega-3 and Omega-6 ratios, and deep golden clarity. Sediment is gently gravity-filtered through natural cotton cloth without any chemical bleaching or high-temperature deodorization.',
    ingredients: '100% Pure First-Press Black Mustard Seeds (Brassica Nigra). Unrefined, solvent-free.',
    storageTips: 'Store in a cool dark pantry. A light natural seed sediment at the base is normal proof of unrefined cold pressing.',
    shelfLife: '12 Months',
    farmOrigin: 'Bharatpur & Morena Mustard Corridors, Rajasthan & MP',
    millingProcess: 'Slow wooden marachekku kolhu press at room temperature (<35°C).',
    badges: ['Wood Pressed (Kolhu)', 'Rich In Omega-3', 'Unrefined & Single Filtered', 'High Pungency'],
    rating: 4.94,
    reviewCount: 410,
    image: '/images/d2c37772-bb26-4dff-96f8-57fcb5a8510f.jpeg',
    galleryImages: [
      '/images/d2c37772-bb26-4dff-96f8-57fcb5a8510f.jpeg',
      '/images/ccd854fd-1d04-4c82-8ee6-5df37f3b2e94.jpeg'
    ],
    packOptions: [
      { size: '500 ml', price: 130, originalPrice: 155 },
      { size: '1 L', price: 240, originalPrice: 285 },
      { size: '5 L', price: 1150, originalPrice: 1350 }
    ],
    nutrition: [
      { label: 'Monounsaturated Fat', value: '60 g / 100g' },
      { label: 'Polyunsaturated Fat', value: '21 g' },
      { label: 'Omega-3 Fatty Acids', value: '9.8 g' },
      { label: 'Energy', value: '884 kcal' },
      { label: 'Trans Fat', value: '0.0 g (Zero)' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-ghee-a2',
    slug: 'a2-desi-cow-ghee-bilona',
    name: 'A2 Desi Gir Cow Ghee',
    category: 'Oils & Ghee',
    subCategory: 'Ghee',
    tagline: 'Vedic Bilona Churned · Free Grazed Desi Cows · Granular Texture',
    shortDesc: 'Handcrafted cultured ghee made from curd of free-grazing indigenous Gir cows using traditional two-way wooden bilona churning.',
    fullDesc: 'Our A2 Desi Cow Ghee is prepared strictly in accordance with ancient Ayurvedic Vedic rituals. We simmer whole A2 milk, culture it overnight into whole curd, hand-churn with wooden bilonas in clockwise and anticlockwise motions to separate Makkhan, and slowly clarify the butter over gentle firewood. The result is a heavenly golden ghee with granular (danedar) texture and an unmistakable nutty aroma that transforms everyday rotis, dals, and khichdi.',
    ingredients: '100% Cultured Butterfat from Free-Grazing Desi Gir Cow Whole Milk Curd.',
    storageTips: 'Store in the glass jar at room temperature. Always use a dry spoon.',
    shelfLife: '12 Months',
    farmOrigin: 'Vedic Gaushala & Pastures, Saurashtra, Gujarat',
    millingProcess: 'Curd-based Bilona method with low-heat mud chulha clarification.',
    badges: ['A2 Certified Beta-Casein', 'Traditional Bilona Method', 'Granular Danedar Texture', 'Grass-Fed Cows'],
    rating: 4.98,
    reviewCount: 390,
    image: '/images/53484dc6-caa9-4c08-b913-b608d0a552ee.jpeg',
    galleryImages: [
      '/images/53484dc6-caa9-4c08-b913-b608d0a552ee.jpeg',
      '/images/fd71a830-45f0-45ea-ac3c-02d6d4ab475b.jpeg'
    ],
    packOptions: [
      { size: '500 ml', price: 850, originalPrice: 990 },
      { size: '1 L', price: 1650, originalPrice: 1890 }
    ],
    nutrition: [
      { label: 'A2 Beta-Casein Protein', value: 'Positive' },
      { label: 'Butyric Acid', value: '4.2 g / 100g' },
      { label: 'Energy', value: '897 kcal' },
      { label: 'Vitamin A', value: '320 mcg' },
      { label: 'Lactose & Casein', value: '< 0.1% (Virtually Zero)' }
    ],
    featured: true,
    isBestseller: true
  },
  {
    id: 'fm-spice-mirch',
    slug: 'lal-mirch-powder-mathania',
    name: 'Lal Mirch Powder (Red Chilli)',
    category: 'Spices',
    subCategory: 'Red Chilli',
    tagline: 'Mathania Chillies · Stone Ground · Vibrant Natural Red',
    shortDesc: 'Stemless sun-dried Mathania red chillies stone ground for balanced piquant heat, smoky richness, and deep natural crimson color.',
    fullDesc: 'World-renowned Mathania chillies are celebrated for their distinctive sweet, smoky undertone and deep red hue that lends rich natural color to gravies without extreme burning heat. Milled without stem parts or added oils, this stone-ground red chilli powder delivers pure authentic Rajasthani taste to every dish.',
    ingredients: '100% Pure Stemless Mathania Red Chillies (Capsicum Annuum). No artificial sudan dyes.',
    storageTips: 'Store in an airtight container in a dark cool shelf.',
    shelfLife: '9 Months from milling date',
    farmOrigin: 'Mathania Village, Jodhpur District, Rajasthan',
    millingProcess: 'Stem removed, sun-dried, cold stone ground.',
    badges: ['Mathania Heritage', 'Stemless Quality', 'Vibrant Natural Crimson', 'No Artificial Dyes'],
    rating: 4.89,
    reviewCount: 192,
    image: '/images/d59ea6bc-71d4-4de0-97ae-6705100da488.jpeg',
    galleryImages: [
      '/images/d59ea6bc-71d4-4de0-97ae-6705100da488.jpeg'
    ],
    packOptions: [
      { size: '100 g', price: 95, originalPrice: 110 },
      { size: '200 g', price: 180, originalPrice: 215 },
      { size: '500 g', price: 420, originalPrice: 490 }
    ],
    nutrition: [
      { label: 'Capsaicin', value: '0.22% w/w (Moderate Heat)' },
      { label: 'Vitamin C', value: '143 mg / 100g' },
      { label: 'Energy', value: '318 kcal' },
      { label: 'Dietary Fiber', value: '34.2 g' }
    ],
    featured: false,
    isBestseller: false
  }
];

export const CATEGORIES = [
  {
    name: 'All',
    count: PRODUCTS.length,
    icon: '🌾',
    desc: 'Explore everything freshly milled'
  },
  {
    name: 'Fresh Atta',
    count: PRODUCTS.filter(p => p.category === 'Fresh Atta').length,
    icon: '🌾',
    desc: 'Chakki Atta · Sharbati Wheat',
    image: '/images/2a790d48-0812-4400-a06d-7958748f8da7.jpeg'
  },
  {
    name: 'Besan & Flours',
    count: PRODUCTS.filter(p => p.category === 'Besan & Flours').length,
    icon: '🥣',
    desc: 'Stoneground Besan · Millet Flours',
    image: '/images/mota-besan.jpg'
  },
  {
    name: 'Spices',
    count: PRODUCTS.filter(p => p.category === 'Spices').length,
    icon: '🌶️',
    desc: 'Turmeric · Coriander · Red Chilli',
    image: '/images/haldi-turmeric.jpg'
  },
  {
    name: 'Oils & Ghee',
    count: PRODUCTS.filter(p => p.category === 'Oils & Ghee').length,
    icon: '🫒',
    desc: 'Wood Pressed Oils · A2 Desi Ghee',
    image: '/images/d2c37772-bb26-4dff-96f8-57fcb5a8510f.jpeg'
  },
  {
    name: 'Honey & Pickles',
    count: PRODUCTS.filter(p => p.category === 'Honey & Pickles').length,
    icon: '🍯',
    desc: 'Raw Honey · Home Made Pickles',
    image: '/images/raw-mango-pickle.jpg'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sunita Sharma',
    location: 'New Delhi',
    rating: 5,
    date: '3 days ago',
    comment: 'The Chakki Fresh Atta is noticeably different from store brands. The rotis are fragrant and puff up like balloons without needing any oil. The date of milling stamped on the pack gave me so much confidence!',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Rajesh Varma',
    location: 'Gurugram',
    rating: 5,
    date: '1 week ago',
    comment: 'The Raw Mango Pickle reminds me of my grandmother’s kitchen in Uttar Pradesh. The aroma of cold-pressed mustard oil with whole methi seeds is unbelievable. Ordered 1kg for my parents too!',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Meenakshi Iyer',
    location: 'Bengaluru',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Turmeric powder has this intense bright hue and earthy scent. You only need half a teaspoon compared to store turmeric because it hasn’t been stripped of its natural curcumin oils.',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'Vikram Joshi',
    location: 'Pune',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Mota Besan is hands-down the best for laddoos. Granular danedar finish that doesn’t turn into a sticky paste in the mouth. Outstanding quality!',
    verified: true
  }
];
