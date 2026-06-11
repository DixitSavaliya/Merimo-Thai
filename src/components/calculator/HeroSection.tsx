"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { BRAND } from "@/data/defaultProducts";

export default function HeroSection() {
  return (
    <Box
      component="section"
      sx={{
        background: "linear-gradient(135deg, #0D3B2E 0%, #0A1628 50%, #1A2D4A 100%)",
        color: "#fff",
        py: { xs: 5, md: 7 },
        position: "relative",
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(201, 162, 39, 0.12)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(13, 59, 46, 0.5)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 5 }} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <Typography
              variant="overline"
              sx={{ color: "primary.main", letterSpacing: "0.25em" }}
            >
              {BRAND.tagline}
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                mt: 1,
                mb: 2,
                fontSize: { xs: "2rem", sm: "2.75rem", md: "3.25rem" },
                background: "linear-gradient(135deg, #E8D48B, #C9A227)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.15,
              }}
            >
              {BRAND.name} {BRAND.country}
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 1.5, fontWeight: 400, color: "rgba(255,255,255,0.92)" }}
            >
              {BRAND.subtitle}
            </Typography>
            <Box
              sx={{
                display: "inline-block",
                px: 3,
                py: 1.25,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 10,
                mb: 2.5,
                background: "rgba(201, 162, 39, 0.08)",
              }}
            >
              <Typography variant="body1" sx={{ letterSpacing: "0.05em" }}>
                {BRAND.description}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ color: "rgba(255,255,255,0.75)", maxWidth: 520, lineHeight: 1.7 }}
            >
              Premium Thai botanical skincare — internal order calculator with
              wholesale & retail pricing, invoice view, and complete kit
              discounts.
            </Typography>
            <Typography
              component="a"
              href={BRAND.website}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{
                display: "inline-block",
                mt: 2.5,
                color: "primary.light",
                textDecoration: "none",
                fontWeight: 600,
                "&:hover": { color: "primary.main" },
              }}
            >
              Visit merimothailand.com →
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Box
              sx={{
                position: "relative",
                mx: { xs: "auto", md: 0 },
                maxWidth: { xs: 420, md: "100%" },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  inset: -12,
                  borderRadius: 5,
                  background:
                    "linear-gradient(135deg, rgba(232,212,139,0.4), rgba(201,162,39,0.15))",
                  filter: "blur(2px)",
                }}
              />
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
                  border: "2px solid",
                  borderColor: "primary.main",
                  aspectRatio: { xs: "4/3", md: "5/4" },
                  minHeight: { xs: 260, md: 320 },
                }}
              >
                <Image
                  src="/images/products-hero.png"
                  alt="Merimo Thailand Premium Beauty Products"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 900px) 90vw, 42vw"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
