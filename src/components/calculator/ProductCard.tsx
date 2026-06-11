"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { formatINR, getUnitPrice } from "@/lib/pricing";
import type { PricingMode, Product } from "@/types";

interface ProductCardProps {
  product: Product;
  index: number;
  mode: PricingMode;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

export default function ProductCard({
  product,
  index,
  mode,
  quantity,
  onQuantityChange,
}: ProductCardProps) {
  const unitPrice = getUnitPrice(product, mode);

  return (
    <Card
      variant="outlined"
      sx={{
        borderColor: quantity > 0 ? "primary.main" : "divider",
        borderWidth: quantity > 0 ? 2 : 1,
        transition: "border-color 0.2s",
      }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #E8D48B, #C9A227)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "0.8rem",
              flexShrink: 0,
            }}
          >
            {index + 1}
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {product.name}
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
              <Chip label={product.quantity} size="small" />
              <Typography variant="body2" color="primary.dark" sx={{ fontWeight: 600 }}>
                {formatINR(unitPrice)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onQuantityChange(quantity - 1)}
              disabled={quantity === 0}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onQuantityChange(isNaN(val) ? 0 : val);
              }}
              size="small"
              slotProps={{
                htmlInput: {
                  min: 0,
                  style: { textAlign: "center", width: 36 },
                },
              }}
              sx={{ width: 56 }}
            />
            <IconButton
              size="small"
              onClick={() => onQuantityChange(quantity + 1)}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }} color="secondary.main">
            {formatINR(unitPrice * quantity)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
