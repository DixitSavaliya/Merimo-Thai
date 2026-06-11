"use client";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import { useProducts } from "@/context/ProductContext";
import { calculateOrder, formatINR } from "@/lib/pricing";

export default function MobileOrderBar() {
  const { products, kitPricing, pricingMode, quantities, cartItemCount } =
    useProducts();

  const breakdown = useMemo(
    () => calculateOrder(products, quantities, pricingMode, kitPricing),
    [products, quantities, pricingMode, kitPricing],
  );

  if (cartItemCount === 0) return null;

  const scrollToInvoice = () => {
    document
      .getElementById("order-invoice")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Paper
      elevation={8}
      sx={{
        display: { xs: "flex", lg: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        p: 1.5,
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        borderTop: "2px solid",
        borderColor: "primary.main",
        background: "linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)",
      }}
    >
      <Box>
        <Typography variant="caption" color="text.secondary">
          {cartItemCount} item{cartItemCount !== 1 ? "s" : ""} · Grand Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, color: "secondary.main" }}>
          {formatINR(breakdown.grandTotal)}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        startIcon={<ReceiptLongIcon />}
        onClick={scrollToInvoice}
        sx={{ whiteSpace: "nowrap" }}
      >
        View Invoice
      </Button>
    </Paper>
  );
}
