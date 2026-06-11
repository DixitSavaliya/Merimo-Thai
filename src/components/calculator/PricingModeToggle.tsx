"use client";

import StorefrontIcon from "@mui/icons-material/Storefront";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import type { PricingMode } from "@/types";

interface PricingModeToggleProps {
  mode: PricingMode;
  onChange: (mode: PricingMode) => void;
}

export default function PricingModeToggle({
  mode,
  onChange,
}: PricingModeToggleProps) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{ mb: 0.5, color: "text.secondary", letterSpacing: "0.1em" }}
      >
        Select Pricing Type
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 1.5 }}>
        Switching type clears your current order
      </Typography>
      <ToggleButtonGroup
        value={mode}
        exclusive
        fullWidth
        onChange={(_, val: PricingMode | null) => {
          if (val) onChange(val);
        }}
        sx={{
          "& .MuiToggleButton-root": {
            py: 1.5,
            borderColor: "primary.main",
            "&.Mui-selected": {
              background: (theme) =>
                `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              color: "secondary.main",
              fontWeight: 700,
              "&:hover": {
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              },
            },
          },
        }}
      >
        <ToggleButton value="retail">
          <StorefrontIcon sx={{ mr: 1 }} />
          Retail / Customer
        </ToggleButton>
        <ToggleButton value="wholesale">
          <WarehouseIcon sx={{ mr: 1 }} />
          Wholesale / Dealer
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
