"use client";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

interface CartQuantityControlsProps {
  quantity: number;
  onChange: (qty: number) => void;
  onRemove: () => void;
  min?: number;
  max?: number;
  /** Stretch to full container width (desktop cart rows) */
  fullWidth?: boolean;
}

export default function CartQuantityControls({
  quantity,
  onChange,
  onRemove,
  min = 0,
  max = 999,
  fullWidth = false,
}: CartQuantityControlsProps) {
  const clamp = (val: number) =>
    Math.max(min, Math.min(max, Math.floor(val) || 0));

  return (
    <Box
      role="group"
      aria-label="Cart item controls"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: fullWidth ? "space-between" : "center",
        gap: 0.5,
        width: fullWidth ? "100%" : "auto",
        maxWidth: "100%",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          flex: fullWidth ? 1 : "none",
          justifyContent: fullWidth ? "center" : "flex-start",
          minWidth: 0,
        }}
      >
        <IconButton
          size="small"
          onClick={() => onChange(clamp(quantity - 1))}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
          sx={btnSx}
        >
          <RemoveIcon sx={{ fontSize: 17 }} />
        </IconButton>

        <TextField
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            onChange(isNaN(val) ? min : clamp(val));
          }}
          size="small"
          aria-label="Quantity"
          slotProps={{
            htmlInput: {
              min,
              max,
              inputMode: "numeric",
              style: {
                textAlign: "center",
                padding: "6px 2px",
                fontWeight: 700,
                fontSize: "0.875rem",
              },
            },
          }}
          sx={{
            width: 48,
            flexShrink: 0,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
              backgroundColor: "#fff",
              "& fieldset": { borderColor: "primary.main", borderWidth: 1.5 },
              "&:hover fieldset": { borderColor: "primary.dark" },
              "&.Mui-focused fieldset": { borderColor: "primary.main" },
            },
          }}
        />

        <IconButton
          size="small"
          onClick={() => onChange(clamp(quantity + 1))}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          sx={btnSx}
        >
          <AddIcon sx={{ fontSize: 17 }} />
        </IconButton>
      </Box>

      <Tooltip title="Remove from cart">
        <IconButton
          size="small"
          onClick={onRemove}
          aria-label="Remove from cart"
          sx={{
            ...btnSx,
            borderColor: "error.light",
            color: "error.main",
            backgroundColor: "rgba(211,47,47,0.06)",
            flexShrink: 0,
            "&:hover": {
              backgroundColor: "error.main",
              color: "#fff",
              borderColor: "error.main",
            },
          }}
        >
          <DeleteIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

const btnSx = {
  border: "1.5px solid",
  borderColor: "primary.main",
  width: 34,
  height: 34,
  color: "secondary.main",
  backgroundColor: "#fff",
  "&:hover": { backgroundColor: "rgba(201,162,39,0.12)" },
  "&.Mui-disabled": { opacity: 0.35, borderColor: "divider" },
};
