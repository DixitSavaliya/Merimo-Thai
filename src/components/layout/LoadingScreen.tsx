"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { BRAND } from "@/data/defaultProducts";

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0D3B2E 0%, #0A1628 100%)",
        gap: 2,
      }}
    >
      <CircularProgress sx={{ color: "primary.main" }} size={48} />
      <Typography
        variant="h6"
        sx={{
          color: "primary.main",
          fontFamily: '"Playfair Display", serif',
          letterSpacing: "0.1em",
        }}
      >
        {BRAND.name} {BRAND.country}
      </Typography>
    </Box>
  );
}
