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
  mode: PricingMode,
  kit: KitPricing,
  kitBundles: number,
  kitTotal: number,
  kitSavings: number,
): InvoiceLine[] {
  const lines: InvoiceLine[] = [];
  let sr = 1;
  const kitPrice = getKitPrice(kit, mode);

  if (kitBundles > 0) {
    lines.push({
      sr: sr++,
      description: "Premium Complete Care Kit (All 11 Products)",
      qty: kitBundles,
      rate: kitPrice,
      amount: kitTotal,
      type: "kit",
    });

    for (const product of products) {
      const totalQty = quantities[product.id] ?? 0;
      const extraQty = totalQty - kitBundles;
      if (extraQty <= 0) continue;

      const unitPrice = getUnitPrice(product, mode);
      lines.push({
        sr: sr++,
        description: product.name,
        size: product.quantity,
        qty: extraQty,
        rate: unitPrice,
        amount: unitPrice * extraQty,
        type: "product",
      });
    }
  } else {
    for (const product of products) {
      const qty = quantities[product.id] ?? 0;
      if (qty <= 0) continue;
      const unitPrice = getUnitPrice(product, mode);
      lines.push({
        sr: sr++,
        description: product.name,
        size: product.quantity,
        qty,
        rate: unitPrice,
        amount: unitPrice * qty,
        type: "product",
      });
    }
  }

  void kitSavings;
  return lines.map((line, index) => ({ ...line, sr: index + 1 }));
}

export function calculateOrder(
  products: Product[],
  quantities: Record<string, number>,
  mode: PricingMode,
  kit: KitPricing,
): CalculationBreakdown {
  const activeItems = products.filter((p) => (quantities[p.id] ?? 0) > 0);

  if (activeItems.length === 0) {
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

  const allSelected =
    products.length > 0 &&
    products.every((p) => (quantities[p.id] ?? 0) > 0);

  let kitBundles = 0;
  let extraItemsTotal = 0;
  const itemLines: ItemLine[] = [];

  if (allSelected) {
    kitBundles = Math.min(...products.map((p) => quantities[p.id] ?? 0));
  }

  const kitPrice = getKitPrice(kit, mode);
  const individualSum = getIndividualSum(products, mode);
  const kitTotal = kitBundles * kitPrice;
  const kitSavings =
    kitBundles > 0 ? kitBundles * (individualSum - kitPrice) : 0;

  for (const product of activeItems) {
    const qty = quantities[product.id] ?? 0;
    const unitPrice = getUnitPrice(product, mode);
    const kitPortion = kitBundles;
    const extraQty = qty - kitPortion;

    if (kitPortion > 0) {
      itemLines.push({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        unitPrice,
        quantityOrdered: kitPortion,
        lineTotal: 0,
        isKitPortion: true,
      });
    }

    if (extraQty > 0) {
      itemLines.push({
        productId: product.id,
        name: product.name,
        quantity: product.quantity,
        unitPrice,
        quantityOrdered: extraQty,
        lineTotal: unitPrice * extraQty,
        isKitPortion: false,
      });
      extraItemsTotal += unitPrice * extraQty;
    }
  }

  const subtotal = activeItems.reduce(
    (sum, p) => sum + getUnitPrice(p, mode) * (quantities[p.id] ?? 0),
    0,
  );

  const grandTotal = kitTotal + extraItemsTotal;
  const totalUnits = activeItems.reduce(
    (sum, p) => sum + (quantities[p.id] ?? 0),
    0,
  );

  const invoiceLines = buildInvoiceLines(
    products,
    quantities,
    mode,
    kit,
    kitBundles,
    kitTotal,
    kitSavings,
  );

  return {
    subtotal,
    kitBundles,
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
