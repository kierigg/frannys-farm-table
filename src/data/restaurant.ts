// Canonical restaurant data — single source of truth.
// Toast POS URLs resolved in Phase 0 (see DECISIONS.md). All are public
// customer-facing surfaces; open in a new tab with rel="noopener".

export const nap = {
  name: "Franny's Farm Table",
  streetAddress: '311 Main Street',
  locality: 'Placerville',
  region: 'CA',
  postalCode: '95667',
  phone: '(530) 748-3671',
  phoneHref: 'tel:+15307483671',
  email: 'frannysfarmtable@gmail.com',
  website: 'https://frannysfarmtable.co',
} as const;

// Canonical entity @id for the schema.org graph — all pages reference this so
// AI/search engines resolve one Restaurant entity. Geo + founding single-sourced.
export const entityId = 'https://frannysfarmtable.co/#restaurant';
export const geo = { latitude: 38.7296, longitude: -120.7985 } as const;
export const foundingDate = '2023';

// Toast canonical URLs (DECISIONS Phase 0).
export const toast = {
  order: 'https://order.toasttab.com/online/frannys-farm-table-311-main-street',
  reserve:
    'https://tables.toasttab.com/restaurants/8df7c581-dcdf-43b2-9191-453e9d8b140e/findTime',
  giftCards: 'https://order.toasttab.com/egiftcards/frannys-farm-table-311-main-street',
  loyalty: 'https://www.toasttab.com/frannys-farm-table-311-main-street/rewardsSignup',
} as const;

// Hours per live Toast/web listing (DECISIONS: trust live over old prototype).
// Display + schema kept in sync here.
export const hoursDisplay = [
  { days: 'Mon\u2013Fri', time: '11 AM \u2013 9 PM' },
  { days: 'Sat\u2013Sun', time: '9 AM \u2013 9 PM' },
  { days: 'Weekend Brunch', time: '9 AM \u2013 12 PM' },
] as const;

export const openingHoursSpec = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '11:00',
    closes: '21:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
];

export const features = [
  'Reservations',
  'Takeout',
  'Delivery',
  'Dog Friendly',
  'Free WiFi',
  'Wheelchair Accessible',
  'Wine & Beer',
  'Gift Cards',
] as const;

export const social = {
  instagram: 'https://instagram.com/frannysfarmtable',
  facebook: 'https://facebook.com/Frannysfarmtable',
  yelp: 'https://yelp.com/biz/frannys-farm-table-placerville',
} as const;

// Guest-favorite dishes surfaced on the home page. Prices reconciled to the
// menu page (single source of truth) to prevent cross-page drift — the home
// cards previously diverged (Burger $22.50 vs menu $18, Salmon $45 vs $36).
// <!-- MENU-VERIFY: owner to confirm names/prices against Toast admin -->
export const featuredDishes = [
  {
    name: 'Loaded Mac & Cheese',
    price: '$24',
    blurb: "Multiple guests call it the best they've ever had, gluten-free or not.",
  },
  {
    name: "Franny's Burger",
    price: '$18',
    blurb: 'Our #2 most-ordered item. Served with fries. GF bun available.',
  },
  {
    name: 'Atlantic Salmon',
    price: '$36',
    blurb: 'A Fork & Knife favorite. Pan-seared, served with pea & pancetta risotto.',
  },
] as const;

// Toast action surfaces used on the Visit hub and in the footer.
export const toastActions = [
  {
    href: toast.reserve,
    label: 'Reserve a Table',
    desc: 'Book online through Toast Tables.',
  },
  {
    href: toast.order,
    label: 'Order Online',
    desc: 'Takeout and delivery, straight from our kitchen.',
  },
  {
    href: toast.giftCards,
    label: 'Gift Cards',
    desc: 'Send a Franny\u2019s e-gift card.',
  },
  {
    href: toast.loyalty,
    label: 'Rewards',
    desc: 'Join our loyalty program and earn on every visit.',
  },
] as const;
