export type PricingMode = "wholesale" | "retail";

export interface Product {
  id: string;
  name: string;
  quantity: string;
  wholesalePrice: number;
  retailPrice: number;
  category: "hair" | "face" | "body" | "sun";
}

export interface KitPricing {
  wholesaleKitPrice: number;
  retailKitPrice: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface PriceOverrides {
  products: Record<string, { wholesalePrice?: number; retailPrice?: number }>;
  kit?: { wholesaleKitPrice?: number; retailKitPrice?: number };
}

export interface InvoiceLine {
  sr: number;
  description: string;
  size?: string;
  qty: number;
  rate: number;
  amount: number;
  type: "kit" | "product" | "savings";
}

export interface CalculationBreakdown {
  subtotal: number;
  kitBundles: number;
  kitSavings: number;
  kitTotal: number;
  extraItemsTotal: number;
  grandTotal: number;
  totalUnits: number;
  itemLines: ItemLine[];
  invoiceLines: InvoiceLine[];
}

export interface ItemLine {
  productId: string;
  name: string;
  quantity: string;
  unitPrice: number;
  quantityOrdered: number;
  lineTotal: number;
  isKitPortion: boolean;
}
