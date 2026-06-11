"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { formatINR } from "@/lib/pricing";
import CartQuantityControls from "./CartQuantityControls";

interface InvoiceCartLineProps {
  sr: number;
  name: string;
  size?: string;
  rate: number;
  amount: number;
  quantity: number;
  isKit?: boolean;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}

export default function InvoiceCartLine({
  sr,
  name,
  size,
  rate,
  amount,
  quantity,
  isKit,
  onQuantityChange,
  onRemove,
}: InvoiceCartLineProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        borderColor: isKit ? "primary.main" : "divider",
        borderWidth: isKit ? 2 : 1,
        backgroundColor: isKit ? "rgba(201,162,39,0.06)" : "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        <Box
          sx={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            flexShrink: 0,
            background: "linear-gradient(135deg, #E8D48B, #C9A227)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.8rem",
            color: "#0A1628",
          }}
        >
          {sr}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {name}
          </Typography>
          {size && (
            <Typography variant="caption" color="text.secondary">
              Size: {size}
            </Typography>
          )}
          {isKit && (
            <Chip
              label="Kit Price"
              size="small"
              sx={{ mt: 0.5, height: 20, fontSize: "0.65rem" }}
            />
          )}
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "secondary.main" }}>
          {formatINR(amount)}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
          px: 0.5,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Rate
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          {formatINR(rate)}
        </Typography>
      </Box>

      <Divider sx={{ mb: 1.5 }} />

      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: "block", textAlign: "center" }}
        >
          Quantity
        </Typography>
        <CartQuantityControls
          quantity={quantity}
          onChange={onQuantityChange}
          onRemove={onRemove}
          compact
        />
      </Box>
    </Paper>
  );
}
