import { z } from "zod";

function parsePriceValue(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val === "string" && val.trim() !== "") return Number(val);
  return Number.NaN;
}

const priceField = z
  .union([z.number(), z.string()])
  .transform(parsePriceValue)
  .pipe(
    z
      .number({ error: "Enter a valid number" })
      .int("Use whole rupees only")
      .min(0, "Price cannot be negative")
      .max(999999, "Price is too high"),
  );

const productPriceSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    quantity: z.string(),
    wholesalePrice: priceField,
    retailPrice: priceField,
  })
  .refine((data) => data.retailPrice >= data.wholesalePrice, {
    message: "Retail must be equal to or higher than wholesale",
    path: ["retailPrice"],
  });

export const priceFormSchema = z
  .object({
    wholesaleKitPrice: priceField,
    retailKitPrice: priceField,
    products: z.array(productPriceSchema),
  })
  .refine((data) => data.retailKitPrice >= data.wholesaleKitPrice, {
    message: "Retail kit price must be equal to or higher than wholesale",
    path: ["retailKitPrice"],
  });

export type PriceFormInput = z.input<typeof priceFormSchema>;
export type PriceFormValues = z.output<typeof priceFormSchema>;
