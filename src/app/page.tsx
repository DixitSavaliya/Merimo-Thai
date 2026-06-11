"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FixedInvoicePanel from "@/components/calculator/FixedInvoicePanel";
import HeroSection from "@/components/calculator/HeroSection";
import MobileOrderBar from "@/components/calculator/MobileOrderBar";
import PricingModeToggle from "@/components/calculator/PricingModeToggle";
import ProductList from "@/components/calculator/ProductList";
import { useProducts } from "@/context/ProductContext";

export default function HomePage() {
  const { pricingMode, setPricingMode } = useProducts();

  return (
    <>
      <HeroSection />

      <Box
        component="section"
        sx={{
          background: "linear-gradient(180deg, #FFFCF8 0%, #FAF8F5 100%)",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ py: { xs: 3, md: 5 }, pb: { xs: 12, lg: 5 } }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              gap: { xs: 3, lg: 4 },
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 3 },
                  mb: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 3,
                  background: "linear-gradient(180deg, #FFFFFF, #FFFCF8)",
                }}
              >
                <PricingModeToggle
                  mode={pricingMode}
                  onChange={setPricingMode}
                />
              </Paper>

              <Box sx={{ mb: 2.5 }}>
                <Typography variant="h5" gutterBottom>
                  Select Products
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add products individually at unit price, or use{" "}
                  <strong>Add Complete Kit</strong> for the discounted bundle
                  price. Manage quantities and remove items from the invoice
                  panel on the right.
                </Typography>
              </Box>

              <ProductList />
            </Box>

            <FixedInvoicePanel />
          </Box>
        </Container>
      </Box>

      <MobileOrderBar />
    </>
  );
}
