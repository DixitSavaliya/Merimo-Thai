"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PricingMode, Product } from "@/types";
import { getUnitPrice } from "@/lib/pricing";
import InvoiceCartLine from "./InvoiceCartLine";

interface InvoiceCartListProps {
  kitCount: number;
  kitPrice: number;
  kitTotal: number;
  cartProducts: Product[];
  quantities: Record<string, number>;
  pricingMode: PricingMode;
  setKitCount: (n: number) => void;
  removeKit: () => void;
  setQuantity: (id: string, n: number) => void;
  removeProduct: (id: string) => void;
}

export default function InvoiceCartList({
  kitCount,
  kitPrice,
  kitTotal,
  cartProducts,
  quantities,
  pricingMode,
  setKitCount,
  removeKit,
  setQuantity,
  removeProduct,
}: InvoiceCartListProps) {
  const itemCount = (kitCount > 0 ? 1 : 0) + cartProducts.length;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
        mb: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 1.75,
          py: 1.1,
          background: "linear-gradient(135deg, #F5F0E6, #EDE4CC)",
          borderBottom: "2px solid #C9A227",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 0.75,
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontWeight: 800, letterSpacing: "0.1em", color: "#0A1628" }}
          >
            ORDER ITEMS
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700, color: "text.secondary" }}>
            {itemCount} {itemCount === 1 ? "line" : "lines"}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
          Use − / + or type qty · tap{" "}
          <Box component="span" sx={{ color: "error.main", fontWeight: 600 }}>
            delete
          </Box>{" "}
          to remove
        </Typography>
      </Box>

      {/* Items */}
      <Box sx={{ p: 1.25 }}>
        <Stack spacing={1.25}>
          {kitCount > 0 && (
            <InvoiceCartLine
              sr={1}
              name="Complete Care Kit (11 Products)"
              size="Full Kit"
              rate={kitPrice}
              amount={kitTotal}
              quantity={kitCount}
              isKit
              onQuantityChange={(n) => (n <= 0 ? removeKit() : setKitCount(n))}
              onRemove={removeKit}
            />
          )}

          {cartProducts.map((product, idx) => {
            const qty = quantities[product.id] ?? 0;
            const rate = getUnitPrice(product, pricingMode);
            return (
              <InvoiceCartLine
                key={product.id}
                sr={(kitCount > 0 ? 1 : 0) + idx + 1}
                name={product.name}
                size={product.quantity}
                rate={rate}
                amount={rate * qty}
                quantity={qty}
                onQuantityChange={(n) =>
                  n <= 0 ? removeProduct(product.id) : setQuantity(product.id, n)
                }
                onRemove={() => removeProduct(product.id)}
              />
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
