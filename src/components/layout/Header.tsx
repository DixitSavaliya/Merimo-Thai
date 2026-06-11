"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND } from "@/data/defaultProducts";
import { useProducts } from "@/context/ProductContext";

const navItems = [
  { label: "Order Calculator", href: "/", icon: ReceiptLongIcon },
  { label: "Manage Prices", href: "/settings", icon: SettingsIcon },
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
          <Toolbar disableGutters sx={{ py: 0.5, minHeight: { xs: 60, sm: 64 } }}>
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
                sx={{ mr: { xs: 1, md: 2 }, display: { md: "none" } }}
              >
                <ShoppingBagOutlinedIcon sx={{ color: "#fff" }} />
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
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              sx={{
                display: { md: "none" },
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 2,
                ml: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.45)",
                },
              }}
            >
              <MenuIcon sx={{ color: "#fff", fontSize: 26 }} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              background: "linear-gradient(180deg, #0A1628 0%, #0D3B2E 100%)",
              color: "#fff",
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid rgba(201,162,39,0.35)",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "primary.main", fontWeight: 700 }}
          >
            Menu
          </Typography>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
            sx={{
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <CloseIcon sx={{ color: "#fff", fontSize: 26 }} />
          </IconButton>
        </Box>

        <List sx={{ pt: 1 }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const selected = pathname === item.href;
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={selected}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    py: 1.5,
                    mx: 1,
                    borderRadius: 2,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(201,162,39,0.2)",
                      borderLeft: "3px solid",
                      borderColor: "primary.main",
                    },
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.08)",
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "primary.main" }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          color: selected ? "primary.light" : "#fff",
                          fontWeight: selected ? 700 : 500,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
