"use client";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import EmailIcon from "@mui/icons-material/Email";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import LanguageIcon from "@mui/icons-material/Language";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import PhoneIcon from "@mui/icons-material/Phone";
import RedeemIcon from "@mui/icons-material/Redeem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BRAND, BRAND_CONTACTS, BRAND_EMAILS } from "@/data/defaultProducts";

const badges = [
  { icon: AutoAwesomeIcon, label: "Premium Quality" },
  { icon: LocalFloristIcon, label: "Natural Ingredients" },
  { icon: HealthAndSafetyIcon, label: "Dermatologically Tested" },
  { icon: FaceRetouchingNaturalIcon, label: "For All Skin Types" },
  { icon: RedeemIcon, label: "Complete Care Kit" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        background: "linear-gradient(180deg, #0D3B2E 0%, #0A1628 55%, #050D18 100%)",
        color: "#fff",
        pt: { xs: 4, md: 6 },
        pb: { xs: 11, sm: 5, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        {/* Trust badges */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: { xs: 2, md: 3 },
            mb: { xs: 4, md: 5 },
          }}
        >
          {badges.map(({ icon: Icon, label }) => (
            <Box
              key={label}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: 1,
                p: { xs: 1.5, md: 0 },
              }}
            >
              <Box
                sx={{
                  width: { xs: 48, md: 56 },
                  height: { xs: 48, md: 56 },
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(201, 162, 39, 0.12)",
                  border: "1px solid rgba(201, 162, 39, 0.35)",
                }}
              >
                <Icon sx={{ color: "primary.main", fontSize: { xs: 22, md: 26 } }} />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "primary.light",
                  fontWeight: 600,
                  lineHeight: 1.35,
                  fontSize: { xs: "0.68rem", sm: "0.75rem" },
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: "rgba(201,162,39,0.25)", mb: { xs: 3, md: 4 } }} />

        {/* Info columns */}
        <Grid container spacing={{ xs: 2.5, md: 4 }} sx={{ mb: { xs: 3, md: 4 } }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FooterSection title="Contact">
              <Stack spacing={1.5}>
                {BRAND_CONTACTS.map((contact) => (
                  <ContactCard
                    key={contact.phone}
                    href={`tel:${contact.phone}`}
                    icon={PhoneIcon}
                    primary={contact.display}
                    secondary={contact.name}
                  />
                ))}
                {BRAND_EMAILS.map((item) => (
                  <ContactCard
                    key={item.email}
                    href={`mailto:${item.email}`}
                    icon={EmailIcon}
                    primary={item.email}
                    secondary={item.label}
                    breakWord
                  />
                ))}
              </Stack>
            </FooterSection>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FooterSection title="Official Store">
              <ContactCard
                href={BRAND.website}
                icon={LanguageIcon}
                primary="merimothailand.com"
                secondary="Shop skincare, haircare & body care"
                external
              />
            </FooterSection>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <FooterSection title="About Merimo">
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.75,
                  maxWidth: 360,
                }}
              >
                {BRAND.name} {BRAND.country} — {BRAND.tagline}. Thai botanical
                luxury crafted for healthy skin and hair.
              </Typography>
            </FooterSection>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(201,162,39,0.15)", mb: 2.5 }} />

        {/* Bottom brand strip */}
        <Box sx={{ textAlign: "center", px: { xs: 1, sm: 2 } }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "primary.main",
              mb: 0.75,
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: "0.95rem", sm: "1rem" },
            }}
          >
            {BRAND.footerTagline}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.45)",
              fontStyle: "italic",
              mb: 1,
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
            }}
          >
            {BRAND.thaiTagline}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}
          >
            © {new Date().getFullYear()} Merimo Thailand · Internal Order System
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Typography
        variant="subtitle2"
        sx={{
          color: "primary.main",
          mb: { xs: 1.5, md: 2 },
          letterSpacing: "0.12em",
          fontWeight: 700,
          fontSize: { xs: "0.75rem", sm: "0.8rem" },
        }}
      >
        {title.toUpperCase()}
      </Typography>
      {children}
    </Box>
  );
}

function ContactCard({
  href,
  icon: Icon,
  primary,
  secondary,
  external,
  breakWord,
}: {
  href: string;
  icon: React.ComponentType<{ sx?: object }>;
  primary: string;
  secondary: string;
  external?: boolean;
  breakWord?: boolean;
}) {
  return (
    <Box
      component={Link}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        p: 1.5,
        borderRadius: 2,
        border: "1px solid rgba(201,162,39,0.2)",
        backgroundColor: "rgba(255,255,255,0.04)",
        transition: "all 0.2s",
        textDecoration: "none",
        "&:hover": {
          backgroundColor: "rgba(201,162,39,0.1)",
          borderColor: "primary.main",
        },
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(201,162,39,0.15)",
        }}
      >
        <Icon sx={{ fontSize: 18, color: "primary.main" }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="body2"
          sx={{
            color: "#fff",
            fontWeight: 600,
            lineHeight: 1.4,
            wordBreak: breakWord ? "break-all" : "normal",
            fontSize: { xs: "0.82rem", sm: "0.875rem" },
          }}
        >
          {primary}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}
        >
          {secondary}
        </Typography>
      </Box>
    </Box>
  );
}
