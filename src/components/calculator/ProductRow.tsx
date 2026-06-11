"use client";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { formatINR, getUnitPrice } from "@/lib/pricing";
import type { PricingMode, Product } from "@/types";

interface ProductRowProps {
  product: Product;
  index: number;
  mode: PricingMode;
  quantity: number;
  onQuantityChange: (qty: number) => void;
}

const categoryColors: Record<Product["category"], string> = {
  hair: "#E8F0E8",
  face: "#FFF8E7",
  body: "#E8F4F8",
  sun: "#FFF0E8",
};

export default function ProductRow({
  product,
  index,
  mode,
  quantity,
  onQuantityChange,
}: ProductRowProps) {
  const unitPrice = getUnitPrice(product, mode);
  const lineTotal = unitPrice * quantity;

  return (
    <TableRow
      hover
      sx={{
        backgroundColor: index % 2 === 0 ? "#fff" : "#FAF8F5",
        "&:last-child td": { borderBottom: 0 },
      }}
    >
      <TableCell sx={{ width: 48 }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #E8D48B, #C9A227)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
            color: "#0A1628",
          }}
        >
          {index + 1}
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          {product.name}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
          <Chip
            label={product.quantity}
            size="small"
            sx={{ backgroundColor: categoryColors[product.category] }}
          />
          <Chip
            label={product.category}
            size="small"
            variant="outlined"
            sx={{ textTransform: "capitalize" }}
          />
        </Box>
      </TableCell>
      <TableCell align="right" sx={{ display: { xs: "none", sm: "table-cell" } }}>
        <Typography sx={{ fontWeight: 600 }} color="secondary.main">
          {formatINR(unitPrice)}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          <IconButton
            size="small"
            onClick={() => onQuantityChange(quantity - 1)}
            disabled={quantity === 0}
            aria-label="Decrease quantity"
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
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
                max: 999,
                style: { textAlign: "center", width: 40, padding: "8px 4px" },
              },
            }}
            sx={{ width: 64 }}
          />
          <IconButton
            size="small"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
            sx={{
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="right">
        <Typography
          sx={{
            fontWeight: 700,
            color: quantity > 0 ? "primary.dark" : "text.disabled",
          }}
        >
          {formatINR(lineTotal)}
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          @ {formatINR(unitPrice)}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
