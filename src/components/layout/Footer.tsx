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
        background: "linear-gradient(180deg, #0D3B2E 0%, #0A1628 50%, #050D18 100%)",
        color: "#fff",
        pt: { xs: 5, md: 6 },
        pb: { xs: 10, md: 4, lg: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mb: 4, justifyContent: "center" }}>
          {badges.map(({ icon: Icon, label }) => (
            <Grid key={label} size={{ xs: 6, sm: 4, md: 2.4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(201, 162, 39, 0.15)",
                    border: "1px solid rgba(201, 162, 39, 0.4)",
                  }}
                >
                  <Icon sx={{ color: "primary.main", fontSize: 26 }} />
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: "primary.light", fontWeight: 600 }}
                >
                  {label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(201,162,39,0.3)", mb: 3 }} />

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "primary.main", mb: 1.5, letterSpacing: "0.1em" }}
            >
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {BRAND_CONTACTS.map((contact) => (
                <Box key={contact.phone}>
                  <FooterLink href={`tel:${contact.phone}`} icon={PhoneIcon}>
                    {contact.display}
                  </FooterLink>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)", ml: 3.5 }}
                  >
                    {contact.name}
                  </Typography>
                </Box>
              ))}
              {BRAND_EMAILS.map((item) => (
                <Box key={item.email}>
                  <FooterLink href={`mailto:${item.email}`} icon={EmailIcon}>
                    {item.email}
                  </FooterLink>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.5)", ml: 3.5 }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "primary.main", mb: 1.5, letterSpacing: "0.1em" }}
            >
              Official Store
            </Typography>
            <FooterLink href={BRAND.website} icon={LanguageIcon} external>
              merimothailand.com
            </FooterLink>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.55)", mt: 1 }}
            >
              Shop the full Merimo Thailand collection — skincare, haircare &
              body care.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="subtitle2"
              sx={{ color: "primary.main", mb: 1.5, letterSpacing: "0.1em" }}
            >
              About
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              {BRAND.name} {BRAND.country} — {BRAND.tagline}. Thai botanical
              luxury for healthy skin and hair.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "rgba(201,162,39,0.2)", mb: 2 }} />

        <Typography
          align="center"
          variant="subtitle1"
          sx={{ color: "primary.main", mb: 0.5 }}
        >
          {BRAND.footerTagline}
        </Typography>
        <Typography
          align="center"
          variant="body2"
          sx={{ color: "rgba(255,255,255,0.5)", fontStyle: "italic", mb: 1 }}
        >
          {BRAND.thaiTagline}
        </Typography>
        <Typography
          align="center"
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.35)" }}
        >
          © {new Date().getFullYear()} Merimo Thailand. Internal Order System.
        </Typography>
      </Container>
    </Box>
  );
}

function FooterLink({
  href,
  icon: Icon,
  children,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ sx?: object }>;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      underline="hover"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        color: "rgba(255,255,255,0.85)",
        "&:hover": { color: "primary.main" },
      }}
    >
      <Icon sx={{ fontSize: 18, color: "primary.main" }} />
      {children}
    </Link>
  );
}
