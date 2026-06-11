import type { KitPricing, Product } from "@/types";

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "body-wash",
    name: "Shower Gel / Body Wash",
    quantity: "150ml",
    wholesalePrice: 145,
    retailPrice: 200,
    category: "body",
  },
  {
    id: "shampoo",
    name: "Shampoo",
    quantity: "180ml",
    wholesalePrice: 199,
    retailPrice: 250,
    category: "hair",
  },
  {
    id: "conditioner",
    name: "Conditioner",
    quantity: "180ml",
    wholesalePrice: 199,
    retailPrice: 250,
    category: "hair",
  },
  {
    id: "face-scrub",
    name: "Face Scrub",
    quantity: "100ml",
    wholesalePrice: 155,
    retailPrice: 200,
    category: "face",
  },
  {
    id: "facewash",
    name: "Facewash",
    quantity: "50ml",
    wholesalePrice: 145,
    retailPrice: 220,
    category: "face",
  },
  {
    id: "gel-cleanser",
    name: "Gel Cleanser",
    quantity: "70ml",
    wholesalePrice: 85,
    retailPrice: 220,
    category: "face",
  },
  {
    id: "day-cream",
    name: "Day Cream",
    quantity: "25ml",
    wholesalePrice: 115,
    retailPrice: 220,
    category: "face",
  },
  {
    id: "night-cream",
    name: "Night Cream",
    quantity: "25ml",
    wholesalePrice: 115,
    retailPrice: 220,
    category: "face",
  },
  {
    id: "night-body-lotion",
    name: "Night Body Lotion",
    quantity: "70ml",
    wholesalePrice: 91,
    retailPrice: 199,
    category: "body",
  },
  {
    id: "spf-50",
    name: "Sunscreen SPF 50+",
    quantity: "50ml",
    wholesalePrice: 135,
    retailPrice: 200,
    category: "sun",
  },
  {
    id: "spf-60",
    name: "Sunscreen SPF 60+",
    quantity: "50ml",
    wholesalePrice: 115,
    retailPrice: 220,
    category: "sun",
  },
];

export const DEFAULT_KIT_PRICING: KitPricing = {
  wholesaleKitPrice: 1499,
  retailKitPrice: 2199,
};

export const BRAND = {
  name: "Merimo",
  country: "Thailand",
  tagline: "Radiance Redefined",
  subtitle: "Premium Beauty & Skincare Kit",
  description: "Complete Care for Hair, Face & Body",
  footerTagline: "Quality You Trust, Beauty You Deserve",
  thaiTagline: "สวยใสอย่างมั่นใจด้วย MERIMO",
  website: "https://merimothailand.com/",
  phone: "+91 99989 99923",
  email: "Merimothailand@gmail.com",
} as const;

export const BRAND_EMAILS = [
  {
    email: "merimothaiindia.official@gmail.com",
    label: "India Official",
  },
] as const;

export const BRAND_CONTACTS = [
  {
    name: "Siddhant Savaliya",
    phone: "+918758163832",
    display: "+91 87581 63832",
  },
  {
    name: "Dixit Savaliya",
    phone: "+919726275280",
    display: "+91 97262 75280",
  },
] as const;
