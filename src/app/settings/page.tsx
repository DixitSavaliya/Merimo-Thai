"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PriceEditor from "@/components/settings/PriceEditor";

export default function SettingsPage() {
  return (
    <Box sx={{ py: { xs: 3, md: 5 } }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Manage Prices
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Update wholesale and retail prices for individual products and complete
          kit bundles. Changes are stored locally and reflected immediately in
          the order calculator.
        </Typography>
        <PriceEditor />
      </Container>
    </Box>
  );
}
