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
  /** Compact layout for narrow table cells */
  compact?: boolean;
}

export default function CartQuantityControls({
  quantity,
  onChange,
  onRemove,
  min = 0,
  max = 999,
  compact = false,
}: CartQuantityControlsProps) {
  const clamp = (val: number) =>
    Math.max(min, Math.min(max, Math.floor(val) || 0));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: compact ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        gap: compact ? 0.75 : 0.25,
        width: "100%",
        mx: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.25,
        }}
      >
        {!compact && (
          <Tooltip title="Remove item">
            <IconButton
              size="small"
              color="error"
              onClick={onRemove}
              aria-label="Remove item"
              sx={{ mr: 0.25 }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        )}
        <IconButton
          size="small"
          onClick={() => onChange(clamp(quantity - 1))}
          disabled={quantity <= min}
          aria-label="Decrease quantity"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 32,
            height: 32,
          }}
        >
          <RemoveIcon sx={{ fontSize: 18 }} />
        </IconButton>
        <TextField
          value={quantity}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            onChange(clamp(isNaN(parsed) ? 0 : parsed));
          }}
          size="small"
          slotProps={{
            htmlInput: {
              min,
              max,
              "aria-label": "Quantity",
              style: {
                textAlign: "center",
                width: compact ? 28 : 32,
                padding: "6px 2px",
              },
            },
          }}
          sx={{
            width: compact ? 48 : 52,
            "& .MuiOutlinedInput-root": {
              borderRadius: 1.5,
            },
          }}
        />
        <IconButton
          size="small"
          onClick={() => onChange(clamp(quantity + 1))}
          disabled={quantity >= max}
          aria-label="Increase quantity"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 32,
            height: 32,
          }}
        >
          <AddIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
      {compact && (
        <Tooltip title="Remove item">
          <IconButton
            size="small"
            color="error"
            onClick={onRemove}
            aria-label="Remove item"
          >
            <DeleteIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
