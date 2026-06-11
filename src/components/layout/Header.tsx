"use client";

import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SpaIcon from "@mui/icons-material/Spa";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND } from "@/data/defaultProducts";
import { useProducts } from "@/context/ProductContext";

const navItems = [
  { label: "Order Calculator", href: "/" },
  { label: "Manage Prices", href: "/settings" },
];

export default function Header() {
  const pathname = usePathname();
  const { cartItemCount } = useProducts();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #0A1628 0%, #1A2D4A 100%)",
          borderBottom: "2px solid",
          borderColor: "primary.main",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 0.5 }}>
            <SpaIcon sx={{ color: "primary.main", mr: 1, fontSize: 32 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  textDecoration: "none",
                  color: "primary.main",
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  fontSize: { xs: "1.1rem", sm: "1.35rem" },
                }}
              >
                {BRAND.name}{" "}
                <Typography
                  component="span"
                  sx={{
                    color: "#fff",
                    fontSize: "0.75em",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                  }}
                >
                  {BRAND.country.toUpperCase()}
                </Typography>
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.2em",
                  display: { xs: "none", sm: "block" },
                }}
              >
                {BRAND.tagline}
              </Typography>
            </Box>

            {pathname === "/" && cartItemCount > 0 && (
              <Badge
                badgeContent={cartItemCount}
                color="primary"
                sx={{ mr: { xs: 1, md: 2 } }}
              >
                <ShoppingBagOutlinedIcon
                  sx={{ color: "primary.main", display: { md: "none" } }}
                />
              </Badge>
            )}

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  variant={pathname === item.href ? "contained" : "text"}
                  color={pathname === item.href ? "primary" : "inherit"}
                  sx={{
                    color: pathname === item.href ? undefined : "#fff",
                    "&:hover": {
                      color: pathname === item.href ? undefined : "primary.light",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            <IconButton
              color="inherit"
              sx={{ display: { md: "none" } }}
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 260, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={pathname === item.href}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
