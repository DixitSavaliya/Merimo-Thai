export interface PriceValidation {
  valid: boolean;
  error?: string;
}

const MAX_PRICE = 999999;

export function validatePrice(value: number): PriceValidation {
  if (Number.isNaN(value)) {
    return { valid: false, error: "Enter a valid number" };
  }
  if (value < 0) {
    return { valid: false, error: "Price cannot be negative" };
  }
  if (value > MAX_PRICE) {
    return { valid: false, error: `Maximum price is ₹${MAX_PRICE.toLocaleString("en-IN")}` };
  }
  if (!Number.isInteger(value)) {
    return { valid: false, error: "Use whole rupees only" };
  }
  return { valid: true };
}

export function validateRetailVsWholesale(
  wholesale: number,
  retail: number,
): PriceValidation {
  const wholesaleCheck = validatePrice(wholesale);
  if (!wholesaleCheck.valid) return wholesaleCheck;

  const retailCheck = validatePrice(retail);
  if (!retailCheck.valid) return retailCheck;

  if (retail < wholesale) {
    return {
      valid: false,
      error: "Retail price should be equal to or higher than wholesale",
    };
  }
  return { valid: true };
}

export function parsePriceInput(raw: string): number | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return null;
  return Math.round(value);
}
