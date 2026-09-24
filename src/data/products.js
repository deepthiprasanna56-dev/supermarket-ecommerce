export const products = [
  {
    id: 1,
    name: 'Organic Hass Avocados',
    slug: 'organic-hass-avocados',
    category: 'Fresh Produce',
    brand: 'Green Valley Farms',
    price: 4.99,
    oldPrice: 6.49,
    discount: 23,
    rating: 4.9,
    reviewsCount: 148,
    unit: '4 pack',
    variants: [
      { label: '4 pack (approx 600g)', price: 4.99, unit: '4 pack' },
      { label: 'Single Avocado (~150g)', price: 1.49, unit: '1 pc' },
      { label: 'Jumbo Box (8 pack)', price: 8.99, unit: '8 pack' }
    ],
    images: [
      'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601039641847-7857b994d704?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Best Seller',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 45,
    emoji: '🥑',
    color: '#e2f0d9',
    description: 'Freshly harvested California Hass avocados with a rich, creamy texture and nutty flavor. Hand-picked at perfect maturity for guacamole, avocado toast, and salads.',
    specs: {
      origin: 'Ventura County, California',
      storage: 'Keep at room temp until ripe, then refrigerate',
      shelfLife: '4-6 days after delivery',
      certifications: 'USDA Certified Organic & Non-GMO'
    },
    nutrition: {
      servingSize: '1/3 medium (50g)',
      calories: '80 kcal',
      fat: '7g',
      carbs: '4g',
      fiber: '3g',
      protein: '1g'
    }
  },
  {
    id: 2,
    name: 'Crisp Honeycrisp Apples',
    slug: 'crisp-honeycrisp-apples',
    category: 'Fresh Produce',
    brand: 'Orchard Peak',
    price: 5.29,
    oldPrice: 6.99,
    discount: 24,
    rating: 4.8,
    reviewsCount: 112,
    unit: '1 kg bag',
    variants: [
      { label: '1 kg bag (~5 apples)', price: 5.29, unit: '1 kg' },
      { label: '2 kg family tote', price: 9.79, unit: '2 kg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Fresh Harvest',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 60,
    emoji: '🍎',
    color: '#fde8e8',
    description: 'Juicy, exceptionally crunchy Honeycrisp apples with an exquisite balance of sweetness and tartness. Excellent for snacking, cider, or baking.',
    specs: {
      origin: 'Yakima Valley, Washington',
      storage: 'Refrigerate in crisper drawer',
      shelfLife: 'Up to 3 weeks',
      certifications: 'Non-GMO Verified'
    },
    nutrition: {
      servingSize: '1 medium apple (182g)',
      calories: '95 kcal',
      fat: '0.3g',
      carbs: '25g',
      fiber: '4.4g',
      protein: '0.5g'
    }
  },
  {
    id: 3,
    name: 'Organic Baby Spinach',
    slug: 'organic-baby-spinach',
    category: 'Fresh Produce',
    brand: 'Green Valley Farms',
    price: 3.49,
    oldPrice: 4.19,
    discount: 16,
    rating: 4.7,
    reviewsCount: 94,
    unit: '300 g tub',
    variants: [
      { label: '300 g tub', price: 3.49, unit: '300 g' },
      { label: '500 g jumbo tub', price: 5.49, unit: '500 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Organic',
    isDeal: false,
    isFeatured: false,
    isOrganic: true,
    stock: 35,
    emoji: '🥬',
    color: '#dcfce7',
    description: 'Tender, triple-washed organic baby spinach leaves packed with vitamins A, C, and iron. Pre-washed and ready to toss directly into salads, smoothies, or sautés.',
    specs: {
      origin: 'Salinas Valley, California',
      storage: 'Keep refrigerated at 34-38°F',
      shelfLife: '5-7 days',
      certifications: 'USDA Organic'
    },
    nutrition: {
      servingSize: '2 cups (85g)',
      calories: '20 kcal',
      fat: '0g',
      carbs: '3g',
      fiber: '2g',
      protein: '2g'
    }
  },
  {
    id: 4,
    name: 'Rainbow Cherry Tomatoes',
    slug: 'rainbow-cherry-tomatoes',
    category: 'Fresh Produce',
    brand: 'Nature Choice',
    price: 3.99,
    oldPrice: 4.89,
    discount: 18,
    rating: 4.8,
    reviewsCount: 88,
    unit: '400 g pack',
    variants: [
      { label: '400 g clamshell', price: 3.99, unit: '400 g' },
      { label: '800 g twin pack', price: 6.99, unit: '800 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Deal of the Day',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 50,
    emoji: '🍅',
    color: '#fee2e2',
    description: 'Vibrant mix of sweet ruby red, sunburst yellow, and chocolate heirloom grape and cherry tomatoes. Bursting with sun-ripened flavor.',
    specs: {
      origin: 'Baja Peninsula Greenhouse',
      storage: 'Room temperature for best sweetness',
      shelfLife: '7 days',
      certifications: 'Pesticide Free'
    },
    nutrition: {
      servingSize: '1 cup (149g)',
      calories: '27 kcal',
      fat: '0.3g',
      carbs: '5.8g',
      fiber: '1.8g',
      protein: '1.3g'
    }
  },
  {
    id: 5,
    name: 'Free-Range Golden Brown Eggs',
    slug: 'free-range-golden-brown-eggs',
    category: 'Dairy & Eggs',
    brand: 'Meadow Gold Pastures',
    price: 5.49,
    oldPrice: 6.89,
    discount: 20,
    rating: 4.9,
    reviewsCount: 230,
    unit: 'Dozen (12 pcs)',
    variants: [
      { label: 'Dozen (12 large eggs)', price: 5.49, unit: '12 pcs' },
      { label: '18 Egg Value Pack', price: 7.89, unit: '18 pcs' }
    ],
    images: [
      'https://images.unsplash.com/photo-1641999161954-f6a92e137b84?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Best Seller',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 75,
    emoji: '🥚',
    color: '#fef3c7',
    description: 'Eggs from hens raised on open green pastures with 108+ sq ft per bird. Rich amber yolks high in omega-3s, rich flavor, and sturdy egg whites perfect for poaching.',
    specs: {
      origin: 'Lancaster County, Pennsylvania',
      storage: 'Refrigerate at 40°F or below',
      shelfLife: '3-4 weeks',
      certifications: 'Certified Humane & Non-GMO'
    },
    nutrition: {
      servingSize: '1 large egg (50g)',
      calories: '70 kcal',
      fat: '5g',
      carbs: '0g',
      fiber: '0g',
      protein: '6g'
    }
  },
  {
    id: 6,
    name: 'Grass-Fed Whole Whole Milk',
    slug: 'grass-fed-whole-milk',
    category: 'Dairy & Eggs',
    brand: 'Meadow Gold Pastures',
    price: 4.79,
    oldPrice: 5.69,
    discount: 15,
    rating: 4.8,
    reviewsCount: 167,
    unit: 'Half Gallon (1.89 L)',
    variants: [
      { label: 'Half Gallon (1.89 L)', price: 4.79, unit: '1.89 L' },
      { label: '1 Gallon Jug (3.78 L)', price: 7.99, unit: '3.78 L' }
    ],
    images: [
      'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Local Dairy',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 40,
    emoji: '🥛',
    color: '#e0f2fe',
    description: '100% grass-fed whole milk, low-temperature vat pasteurized to preserve beneficial enzymes and vitamins. Incredibly silky with cream on top.',
    specs: {
      origin: 'Sonoma Valley Family Farm',
      storage: 'Refrigerate promptly',
      shelfLife: '12 days',
      certifications: 'American Grassfed Certified'
    },
    nutrition: {
      servingSize: '1 cup (240ml)',
      calories: '150 kcal',
      fat: '8g',
      carbs: '12g',
      fiber: '0g',
      protein: '8g'
    }
  },
  {
    id: 7,
    name: 'Authentic Greek Strained Yogurt',
    slug: 'authentic-greek-strained-yogurt',
    category: 'Dairy & Eggs',
    brand: 'Oasis Greek',
    price: 4.29,
    oldPrice: 5.19,
    discount: 17,
    rating: 4.9,
    reviewsCount: 195,
    unit: '500 g tub',
    variants: [
      { label: '500 g tub (Plain 5%)', price: 4.29, unit: '500 g' },
      { label: '1 kg tub (Family Size)', price: 7.49, unit: '1 kg' },
      { label: '4-pack (150g Single Serve)', price: 5.99, unit: '4x150g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'High Protein',
    isDeal: true,
    isFeatured: false,
    isOrganic: false,
    stock: 55,
    emoji: '🥣',
    color: '#f0fdf4',
    description: 'Triple-strained traditional Greek yogurt with an ultra-thick, decadent consistency. Packed with 17g of bio-available protein per serving and live probiotics.',
    specs: {
      origin: 'Sparta region tradition',
      storage: 'Keep cold at 36-40°F',
      shelfLife: '18 days',
      certifications: 'Active Live Cultures'
    },
    nutrition: {
      servingSize: '3/4 cup (170g)',
      calories: '160 kcal',
      fat: '9g',
      carbs: '6g',
      fiber: '0g',
      protein: '17g'
    }
  },
  {
    id: 8,
    name: 'Artisan Sourdough Country Loaf',
    slug: 'artisan-sourdough-country-loaf',
    category: 'Bakery & Bread',
    brand: 'Hearth & Grain',
    price: 5.99,
    oldPrice: 6.99,
    discount: 14,
    rating: 4.9,
    reviewsCount: 310,
    unit: '750 g loaf',
    variants: [
      { label: 'Whole Loaf (Uncut)', price: 5.99, unit: '750 g' },
      { label: 'Pre-Sliced Country Loaf', price: 6.29, unit: '750 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Baked Fresh Today',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 25,
    emoji: '🍞',
    color: '#ffedd5',
    description: 'Naturally leavened using a 36-hour slow fermentation sourdough starter. Blistered caramelized crust with a moist, wild, custard-like open crumb.',
    specs: {
      origin: 'In-house Hearth Bakery',
      storage: 'Wrap in linen bread bag or paper bag',
      shelfLife: '4-5 days',
      certifications: 'Organic Stone-Ground Flour'
    },
    nutrition: {
      servingSize: '1 slice (50g)',
      calories: '120 kcal',
      fat: '0.5g',
      carbs: '24g',
      fiber: '2g',
      protein: '4g'
    }
  },
  {
    id: 9,
    name: 'French Butter Croissants',
    slug: 'french-butter-croissants',
    category: 'Bakery & Bread',
    brand: 'Hearth & Grain',
    price: 6.49,
    oldPrice: 7.99,
    discount: 18,
    rating: 4.8,
    reviewsCount: 142,
    unit: '4 pack',
    variants: [
      { label: '4 Butter Croissants', price: 6.49, unit: '4 pack' },
      { label: '8 Baker’s Box', price: 11.99, unit: '8 pack' }
    ],
    images: [
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Best Seller',
    isDeal: true,
    isFeatured: true,
    isOrganic: false,
    stock: 20,
    emoji: '🥐',
    color: '#fef3c7',
    description: 'Hand-rolled with 82% Normandy-style cultured butter. 27 delicate layers baked to deep golden perfection. Flaky on the outside and airy inside.',
    specs: {
      origin: 'Freshly baked at 5 AM daily',
      storage: 'Store airtight or warm in oven 3 min at 350°F',
      shelfLife: '2-3 days',
      certifications: 'Pure Dairy Butter, No Palm Oil'
    },
    nutrition: {
      servingSize: '1 croissant (65g)',
      calories: '260 kcal',
      fat: '14g',
      carbs: '29g',
      fiber: '1.5g',
      protein: '5g'
    }
  },
  {
    id: 10,
    name: 'Wild Alaskan Salmon Fillets',
    slug: 'wild-alaskan-salmon-fillets',
    category: 'Meat & Seafood',
    brand: 'Ocean Crest Seafood',
    price: 15.99,
    oldPrice: 19.99,
    discount: 20,
    rating: 4.9,
    reviewsCount: 178,
    unit: '2 fillets (~450g)',
    variants: [
      { label: '2 Fillets (~450g)', price: 15.99, unit: '450 g' },
      { label: 'Family Portion (4 Fillets ~900g)', price: 29.99, unit: '900 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d0?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Flash Deal',
    isDeal: true,
    isFeatured: true,
    isOrganic: false,
    stock: 28,
    emoji: '🐟',
    color: '#ffe4e6',
    description: 'Sustainably hook-and-line caught in the pristine waters of Bristol Bay, Alaska. Rich in astaxanthin and omega-3 fatty acids, delivering a deep ruby hue and clean, flaky taste.',
    specs: {
      origin: 'Bristol Bay, Alaska',
      storage: 'Refrigerate immediately; consume or freeze within 48h',
      shelfLife: '2 days fresh',
      certifications: 'MSC Certified Sustainable'
    },
    nutrition: {
      servingSize: '1 fillet (150g)',
      calories: '220 kcal',
      fat: '11g',
      carbs: '0g',
      fiber: '0g',
      protein: '31g'
    }
  },
  {
    id: 11,
    name: 'Organic Free-Range Chicken Breast',
    slug: 'organic-free-range-chicken-breast',
    category: 'Meat & Seafood',
    brand: 'Nature Choice',
    price: 10.49,
    oldPrice: 12.99,
    discount: 19,
    rating: 4.8,
    reviewsCount: 160,
    unit: '650 g pack',
    variants: [
      { label: 'Standard Pack (650g)', price: 10.49, unit: '650 g' },
      { label: 'Jumbo Club Pack (1.3 kg)', price: 19.99, unit: '1.3 kg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Organic',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 35,
    emoji: '🍗',
    color: '#ffedd5',
    description: 'Air-chilled, skinless chicken breast raised on organic vegetarian grain feed without antibiotics or added growth hormones ever. Juicy, lean, and tender.',
    specs: {
      origin: 'Shenandoah Valley Farms',
      storage: 'Keep chilled below 38°F',
      shelfLife: '3-4 days',
      certifications: 'USDA Organic & Non-GMO Project'
    },
    nutrition: {
      servingSize: '4 oz (112g)',
      calories: '130 kcal',
      fat: '1.5g',
      carbs: '0g',
      fiber: '0g',
      protein: '26g'
    }
  },
  {
    id: 12,
    name: 'Extra Virgin Olive Oil (Cold-Pressed)',
    slug: 'cold-pressed-extra-virgin-olive-oil',
    category: 'Pantry Staples',
    brand: 'Villa Rosa Groves',
    price: 13.99,
    oldPrice: 17.50,
    discount: 20,
    rating: 4.9,
    reviewsCount: 320,
    unit: '750 ml bottle',
    variants: [
      { label: '500 ml Glass Bottle', price: 10.49, unit: '500 ml' },
      { label: '750 ml Glass Bottle', price: 13.99, unit: '750 ml' },
      { label: '2 Liter Tin (Chef Reserve)', price: 32.99, unit: '2 L' }
    ],
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Best Seller',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 45,
    emoji: '🫒',
    color: '#ecfccb',
    description: 'Single-estate early harvest olives, cold-extracted within 4 hours of harvest. Acidity under 0.2% with vibrant notes of fresh green herbs, pepper, and artichoke.',
    specs: {
      origin: 'Chania, Crete, Greece',
      storage: 'Cool, dark pantry away from heat sources',
      shelfLife: '18 months from harvest',
      certifications: 'PDO Protected Designation of Origin'
    },
    nutrition: {
      servingSize: '1 tbsp (15ml)',
      calories: '120 kcal',
      fat: '14g',
      carbs: '0g',
      fiber: '0g',
      protein: '0g'
    }
  },
  {
    id: 13,
    name: 'Stone-Ground Roasted Almond Butter',
    slug: 'stone-ground-almond-butter',
    category: 'Pantry Staples',
    brand: 'Nuts About',
    price: 8.99,
    oldPrice: 10.99,
    discount: 18,
    rating: 4.9,
    reviewsCount: 240,
    unit: '454 g jar',
    variants: [
      { label: '454 g Smooth Jar', price: 8.99, unit: '454 g' },
      { label: '454 g Crunchy with Sea Salt', price: 8.99, unit: '454 g' },
      { label: '1 kg Bulk Jar', price: 16.49, unit: '1 kg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1654747780295-aa29ff49f5c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1654747781271-a2b6992c7b52?auto=format&fit=crop&w=800&q=80'
    ],
    badge: '100% Pure',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 55,
    emoji: '🥜',
    color: '#fef3c7',
    description: 'Only 2 ingredients: dry-roasted California heirloom almonds and a trace of pink Himalayan salt. Slow ground on granite stones for pure nutty decadence.',
    specs: {
      origin: 'Central Valley, California',
      storage: 'Stir well; refrigerate to prevent oil separation',
      shelfLife: '12 months',
      certifications: 'Non-GMO, Gluten-Free, Vegan'
    },
    nutrition: {
      servingSize: '2 tbsp (32g)',
      calories: '190 kcal',
      fat: '17g',
      carbs: '6g',
      fiber: '4g',
      protein: '7g'
    }
  },
  {
    id: 14,
    name: 'Raw Organic Wildflower Honey',
    slug: 'raw-organic-wildflower-honey',
    category: 'Pantry Staples',
    brand: 'Nectar Blossom',
    price: 9.49,
    oldPrice: 11.99,
    discount: 21,
    rating: 4.8,
    reviewsCount: 185,
    unit: '500 g jar',
    variants: [
      { label: '500 g Glass Hex Jar', price: 9.49, unit: '500 g' },
      { label: '1 kg Family Tub', price: 16.99, unit: '1 kg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Unfiltered',
    isDeal: true,
    isFeatured: false,
    isOrganic: true,
    stock: 42,
    emoji: '🍯',
    color: '#fef08a',
    description: 'Unpasteurized and gently gravity-filtered raw honey, retaining natural bee pollen, enzymes, and floral notes collected from mountain wildflower meadows.',
    specs: {
      origin: 'Blue Ridge Mountains, NC',
      storage: 'Keep at room temp. If crystallized, warm gently in warm water bath',
      shelfLife: 'Does not expire',
      certifications: 'True Source Certified'
    },
    nutrition: {
      servingSize: '1 tbsp (21g)',
      calories: '60 kcal',
      fat: '0g',
      carbs: '17g',
      fiber: '0g',
      protein: '0g'
    }
  },
  {
    id: 15,
    name: 'Cold-Pressed Green Glow Juice',
    slug: 'cold-pressed-green-glow-juice',
    category: 'Beverages & Juices',
    brand: 'Good Roots Botanicals',
    price: 6.49,
    oldPrice: 7.99,
    discount: 19,
    rating: 4.7,
    reviewsCount: 104,
    unit: '473 ml bottle',
    variants: [
      { label: 'Single 473 ml Bottle', price: 6.49, unit: '473 ml' },
      { label: '6-Pack Detox Cleanse', price: 34.99, unit: '6x473ml' }
    ],
    images: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Raw & Fresh',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 30,
    emoji: '🧃',
    color: '#dcfce7',
    description: 'Hydrating cold-pressed powerhouse of organic kale, crisp cucumber, granny smith apple, celery, ginger root, and fresh lime. Zero added sugar or preservatives.',
    specs: {
      origin: 'Cold-pressed in Los Angeles',
      storage: 'Keep chilled below 38°F',
      shelfLife: '7 days',
      certifications: 'Non-GMO, HPP Preserved Fresh'
    },
    nutrition: {
      servingSize: '1 bottle (473ml)',
      calories: '110 kcal',
      fat: '0g',
      carbs: '26g',
      fiber: '2g',
      protein: '3g'
    }
  },
  {
    id: 16,
    name: 'Sparkling Citrus Water (8-Pack)',
    slug: 'sparkling-citrus-water-8-pack',
    category: 'Beverages & Juices',
    brand: 'Bright Day Springs',
    price: 5.49,
    oldPrice: 6.99,
    discount: 21,
    rating: 4.6,
    reviewsCount: 92,
    unit: '8 x 355 ml cans',
    variants: [
      { label: '8-Pack Lime & Lemon', price: 5.49, unit: '8 cans' },
      { label: '8-Pack Blood Orange Grapefruit', price: 5.49, unit: '8 cans' },
      { label: '24 Can Variety Pack', price: 14.99, unit: '24 cans' }
    ],
    images: [
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Popular',
    isDeal: false,
    isFeatured: false,
    isOrganic: false,
    stock: 65,
    emoji: '🍋',
    color: '#fef9c3',
    description: 'Mountain spring water with lively bubbles and essence extracted from sun-ripened Meyer lemons and Key limes. Zero sodium, zero sugar, zero calories.',
    specs: {
      origin: 'Cascade Mountain Spring Source',
      storage: 'Store cool; serve chilled or over ice',
      shelfLife: '12 months',
      certifications: 'BPA-Free Cans'
    },
    nutrition: {
      servingSize: '1 can (355ml)',
      calories: '0 kcal',
      fat: '0g',
      carbs: '0g',
      fiber: '0g',
      protein: '0g'
    }
  },
  {
    id: 17,
    name: 'Roasted Salted California Pistachios',
    slug: 'roasted-salted-california-pistachios',
    category: 'Snacks & Organic',
    brand: 'Nuts About',
    price: 7.99,
    oldPrice: 9.99,
    discount: 20,
    rating: 4.9,
    reviewsCount: 214,
    unit: '400 g bag',
    variants: [
      { label: '400 g In-Shell Bag', price: 7.99, unit: '400 g' },
      { label: '300 g Shelled Kernels', price: 9.49, unit: '300 g' },
      { label: '1 kg Party Bag', price: 18.99, unit: '1 kg' }
    ],
    images: [
      'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1704079662049-d00890d21a69?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Best Seller',
    isDeal: true,
    isFeatured: true,
    isOrganic: false,
    stock: 50,
    emoji: '🥜',
    color: '#dcfce7',
    description: 'Naturally opened jumbo California pistachios slow-roasted with sea salt. Wonderful crunch, rich in antioxidants, plant protein, and healthy monounsaturated fats.',
    specs: {
      origin: 'San Joaquin Valley, CA',
      storage: 'Reseal bag; keep cool and dry',
      shelfLife: '9 months',
      certifications: 'Heart-Check Certified'
    },
    nutrition: {
      servingSize: '1/2 cup with shells (30g kernels)',
      calories: '160 kcal',
      fat: '13g',
      carbs: '8g',
      fiber: '3g',
      protein: '6g'
    }
  },
  {
    id: 18,
    name: 'Artisan Dark Chocolate (72% Single Origin)',
    slug: 'artisan-dark-chocolate-72',
    category: 'Snacks & Organic',
    brand: 'Cacao Reserve',
    price: 4.49,
    oldPrice: 5.49,
    discount: 18,
    rating: 4.9,
    reviewsCount: 164,
    unit: '85 g bar',
    variants: [
      { label: 'Single 85g Bar', price: 4.49, unit: '85 g' },
      { label: '3-Bar Tasting Pack (Sea Salt, Espresso, Pure)', price: 11.99, unit: '3x85g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Award Winner',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 40,
    emoji: '🍫',
    color: '#fae8ff',
    description: 'Bean-to-bar fair trade dark chocolate crafted with single-origin Ecuadorian Arriba Nacional cacao and raw organic cane sugar. Deep fruit and floral finish.',
    specs: {
      origin: 'Esmeraldas, Ecuador',
      storage: 'Keep between 60-68°F away from sunlight',
      shelfLife: '14 months',
      certifications: 'Fair Trade Certified & B-Corp'
    },
    nutrition: {
      servingSize: '1/2 bar (42.5g)',
      calories: '220 kcal',
      fat: '16g',
      carbs: '18g',
      fiber: '4g',
      protein: '3g'
    }
  },
  {
    id: 19,
    name: 'Organic Sweet Strawberries',
    slug: 'organic-sweet-strawberries',
    category: 'Fresh Produce',
    brand: 'Berry Bliss Farms',
    price: 4.79,
    oldPrice: 5.99,
    discount: 20,
    rating: 4.8,
    reviewsCount: 133,
    unit: '454 g clamshell',
    variants: [
      { label: '454 g clamshell', price: 4.79, unit: '454 g' },
      { label: '908 g twin pack', price: 8.49, unit: '908 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Sweet & Juicy',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 30,
    emoji: '🍓',
    color: '#ffe4e6',
    description: 'Hand-picked organic red strawberries from coastal strawberry fields. Exceptionally aromatic, tender, and naturally sweet.',
    specs: {
      origin: 'Watsonville, California',
      storage: 'Do not wash until ready to eat; keep refrigerated',
      shelfLife: '4-5 days',
      certifications: 'USDA Organic'
    },
    nutrition: {
      servingSize: '1 cup sliced (166g)',
      calories: '53 kcal',
      fat: '0.5g',
      carbs: '12.7g',
      fiber: '3.3g',
      protein: '1.1g'
    }
  },
  {
    id: 20,
    name: 'Wild Caught Jumbo Gulf Shrimp',
    slug: 'wild-caught-jumbo-gulf-shrimp',
    category: 'Meat & Seafood',
    brand: 'Ocean Crest Seafood',
    price: 16.99,
    oldPrice: 21.99,
    discount: 23,
    rating: 4.9,
    reviewsCount: 122,
    unit: '454 g (16/20 count)',
    variants: [
      { label: '454 g (Peeled & Deveined)', price: 16.99, unit: '454 g' },
      { label: '908 g Value Bag', price: 29.99, unit: '908 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1700659393124-ef499dde9411?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Flash Deal',
    isDeal: true,
    isFeatured: false,
    isOrganic: false,
    stock: 22,
    emoji: '🦐',
    color: '#ffedd5',
    description: 'Colossal wild brown shrimp harvested from Gulf waters. Cleaned, peeled, and tail-on for quick garlic butter sauté, grilling, or pasta dishes.',
    specs: {
      origin: 'Gulf of Mexico',
      storage: 'Refrigerate immediately; use within 36 hours',
      shelfLife: '2 days fresh',
      certifications: 'Wild & Chemical-Free'
    },
    nutrition: {
      servingSize: '4 oz (113g)',
      calories: '110 kcal',
      fat: '1.5g',
      carbs: '0g',
      fiber: '0g',
      protein: '24g'
    }
  },
  {
    id: 21,
    name: 'Artisan Aged White Cheddar Cheese',
    slug: 'artisan-aged-white-cheddar-cheese',
    category: 'Dairy & Eggs',
    brand: 'Meadow Gold Pastures',
    price: 6.99,
    oldPrice: 8.49,
    discount: 18,
    rating: 4.9,
    reviewsCount: 175,
    unit: '250 g block',
    variants: [
      { label: '250 g Sharp Wedge', price: 6.99, unit: '250 g' },
      { label: '500 g Family Block', price: 12.49, unit: '500 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Aged 18 Months',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 38,
    emoji: '🧀',
    color: '#fef08a',
    description: 'Crafted from pastured whole milk and cave-aged for 18 months. Notable calcium lactate crunch crystals, complex nutty undertones, and sharp tang.',
    specs: {
      origin: 'Vermont Artisan Creamery',
      storage: 'Wrap tightly in cheese paper or wax wrap',
      shelfLife: '4 months refrigerated',
      certifications: 'rBST Hormone Free'
    },
    nutrition: {
      servingSize: '1 oz (28g)',
      calories: '115 kcal',
      fat: '9.5g',
      carbs: '0.5g',
      fiber: '0g',
      protein: '7g'
    }
  },
  {
    id: 22,
    name: 'Toasted Pecan & Maple Granola',
    slug: 'toasted-pecan-maple-granola',
    category: 'Pantry Staples',
    brand: 'Hearth & Grain',
    price: 6.79,
    oldPrice: 8.29,
    discount: 18,
    rating: 4.8,
    reviewsCount: 140,
    unit: '340 g bag',
    variants: [
      { label: '340 g Bag', price: 6.79, unit: '340 g' },
      { label: '700 g Big Batch Bag', price: 12.49, unit: '700 g' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517093707570-34989679caee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Small Batch',
    isDeal: false,
    isFeatured: false,
    isOrganic: true,
    stock: 45,
    emoji: '🥣',
    color: '#ffedd5',
    description: 'Rolled organic oats, Georgia pecans, pumpkin seeds, and pure Vermont Grade A maple syrup, slow baked with coconut oil and vanilla bean until golden crisp.',
    specs: {
      origin: 'Burlington, Vermont',
      storage: 'Keep sealed in a cool, dry pantry',
      shelfLife: '6 months',
      certifications: 'Organic & Glyphosate Residue Free'
    },
    nutrition: {
      servingSize: '1/2 cup (55g)',
      calories: '240 kcal',
      fat: '12g',
      carbs: '28g',
      fiber: '4g',
      protein: '6g'
    }
  },
  {
    id: 23,
    name: 'Organic Cavendish Bananas',
    slug: 'organic-cavendish-bananas',
    category: 'Fresh Produce',
    brand: 'Green Valley Farms',
    price: 1.89,
    oldPrice: 2.29,
    discount: 17,
    rating: 4.8,
    reviewsCount: 280,
    unit: 'Bunch (~1 kg / 5-7 bananas)',
    variants: [
      { label: 'Bunch (5-7 bananas ~1 kg)', price: 1.89, unit: '1 bunch' },
      { label: 'Case of 4 Bunches', price: 6.49, unit: '4 bunches' }
    ],
    images: [
      'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Staple',
    isDeal: false,
    isFeatured: true,
    isOrganic: true,
    stock: 90,
    emoji: '🍌',
    color: '#fef08a',
    description: 'Sustainably farmed Fair Trade organic bananas, rich in potassium and dietary fiber. Harvested at the green-yellow stage for ideal ripeness at home.',
    specs: {
      origin: 'Costa Rica Rainforest Alliance certified',
      storage: 'Store at room temperature; do not refrigerate',
      shelfLife: '5-7 days',
      certifications: 'Fair Trade & USDA Organic'
    },
    nutrition: {
      servingSize: '1 medium banana (118g)',
      calories: '105 kcal',
      fat: '0.4g',
      carbs: '27g',
      fiber: '3.1g',
      protein: '1.3g'
    }
  },
  {
    id: 24,
    name: 'Artisan Cold Brew Coffee',
    slug: 'artisan-cold-brew-coffee',
    category: 'Beverages & Juices',
    brand: 'Good Roots Botanicals',
    price: 5.99,
    oldPrice: 7.49,
    discount: 20,
    rating: 4.9,
    reviewsCount: 167,
    unit: '946 ml bottle',
    variants: [
      { label: '946 ml Glass Growler', price: 5.99, unit: '946 ml' },
      { label: '2 Liter Fridge Keg', price: 11.99, unit: '2 L' }
    ],
    images: [
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80'
    ],
    badge: 'Smooth & Bold',
    isDeal: true,
    isFeatured: true,
    isOrganic: true,
    stock: 35,
    emoji: '☕',
    color: '#e2e8f0',
    description: 'Slow-steeped for 20 hours with single-origin Ethiopian and Colombian Arabica beans. Exceptionally smooth, low acid, with chocolate and hazelnut notes.',
    specs: {
      origin: 'Freshly steeped micro-roastery',
      storage: 'Keep refrigerated',
      shelfLife: '3 weeks',
      certifications: '100% Organic Arabica'
    },
    nutrition: {
      servingSize: '1 cup (240ml)',
      calories: '5 kcal',
      fat: '0g',
      carbs: '0g',
      fiber: '0g',
      protein: '0.5g'
    }
  }
];
