import type {
  CalculationBreakdown,
  InvoiceLine,
  ItemLine,
  KitPricing,
  PricingMode,
  Product,
} from "@/types";

export function getUnitPrice(
  product: Product,
  mode: PricingMode,
): number {
  return mode === "wholesale" ? product.wholesalePrice : product.retailPrice;
}

export function getKitPrice(kit: KitPricing, mode: PricingMode): number {
  return mode === "wholesale" ? kit.wholesaleKitPrice : kit.retailKitPrice;
}

export function getIndividualSum(products: Product[], mode: PricingMode): number {
  return products.reduce((sum, p) => sum + getUnitPrice(p, mode), 0);
}

function buildInvoiceLines(
  products: Product[],
  quantities: Record<string, number>,
  kitCount: number,
  mode: PricingMode,
  kit: KitPricing,
  kitTotal: number,
): InvoiceLine[] {
  const lines: InvoiceLine[] = [];
  const kitPrice = getKitPrice(kit, mode);

  if (kitCount > 0) {
    lines.push({
      sr: 0,
      description: "Premium Complete Care Kit (All 11 Products)",
      qty: kitCount,
      rate: kitPrice,
      amount: kitTotal,
      type: "kit",
    });
  }

  for (const product of products) {
    const qty = quantities[product.id] ?? 0;
    if (qty <= 0) continue;
    const unitPrice = getUnitPrice(product, mode);
    lines.push({
      sr: 0,
      description: product.name,
      size: product.quantity,
      qty,
      rate: unitPrice,
      amount: unitPrice * qty,
      type: "product",
    });
  }

  return lines.map((line, index) => ({ ...line, sr: index + 1 }));
}

export function calculateOrder(
  products: Product[],
  quantities: Record<string, number>,
  kitCount: number,
  mode: PricingMode,
  kit: KitPricing,
): CalculationBreakdown {
  const individualItems = products.filter((p) => (quantities[p.id] ?? 0) > 0);
  const safeKitCount = Math.max(0, kitCount);

  if (safeKitCount === 0 && individualItems.length === 0) {
    return {
      subtotal: 0,
      kitBundles: 0,
      kitSavings: 0,
      kitTotal: 0,
      extraItemsTotal: 0,
      grandTotal: 0,
      totalUnits: 0,
      itemLines: [],
      invoiceLines: [],
    };
  }

  const kitPrice = getKitPrice(kit, mode);
  const individualSum = getIndividualSum(products, mode);
  const kitTotal = safeKitCount * kitPrice;
  const kitSavings =
    safeKitCount > 0 ? safeKitCount * (individualSum - kitPrice) : 0;

  const extraItemsTotal = individualItems.reduce(
    (sum, p) => sum + getUnitPrice(p, mode) * (quantities[p.id] ?? 0),
    0,
  );

  const grandTotal = kitTotal + extraItemsTotal;
  const subtotal = safeKitCount * individualSum + extraItemsTotal;

  const totalUnits =
    safeKitCount * products.length +
    individualItems.reduce((sum, p) => sum + (quantities[p.id] ?? 0), 0);

  const itemLines: ItemLine[] = [];

  if (safeKitCount > 0) {
    for (const product of products) {
      itemLines.push({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        unitPrice: getUnitPrice(product, mode),
        quantityOrdered: safeKitCount,
        lineTotal: 0,
        isKitPortion: true,
      });
    }
  }

  for (const product of individualItems) {
    const qty = quantities[product.id] ?? 0;
    const unitPrice = getUnitPrice(product, mode);
    itemLines.push({
      productId: product.id,
      name: product.name,
      quantity: product.quantity,
      unitPrice,
      quantityOrdered: qty,
      lineTotal: unitPrice * qty,
      isKitPortion: false,
    });
  }

  const invoiceLines = buildInvoiceLines(
    products,
    quantities,
    safeKitCount,
    mode,
    kit,
    kitTotal,
  );

  return {
    subtotal,
    kitBundles: safeKitCount,
    kitSavings,
    kitTotal,
    extraItemsTotal,
    grandTotal,
    totalUnits,
    itemLines,
    invoiceLines,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInvoiceDate(): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}
