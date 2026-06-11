"use client";

import { createTheme } from "@mui/material/styles";

const gold = "#C9A227";
const goldLight = "#E8D48B";
const navy = "#0A1628";
const navyLight = "#1A2D4A";
const sage = "#D4E4D4";
const sageDark = "#5A7A5A";
const cream = "#FAF8F5";
const forest = "#0D3B2E";

export const merimoTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: gold,
      light: goldLight,
      dark: "#9A7B1A",
      contrastText: navy,
    },
    secondary: {
      main: navy,
      light: navyLight,
      dark: "#050D18",
      contrastText: "#FFFFFF",
    },
    background: {
      default: cream,
      paper: "#FFFFFF",
    },
    success: {
      main: sageDark,
    },
    text: {
      primary: navy,
      secondary: "#4A5568",
    },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: "0.04em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: "10px 24px",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            background: `linear-gradient(135deg, ${goldLight} 0%, ${gold} 50%, #B8922A 100%)`,
            color: navy,
            boxShadow: "0 4px 14px rgba(201, 162, 39, 0.35)",
            "&:hover": {
              background: `linear-gradient(135deg, ${gold} 0%, #B8922A 100%)`,
            },
          },
        },
        {
          props: { variant: "contained", color: "secondary" },
          style: {
            boxShadow: "0 4px 14px rgba(10, 22, 40, 0.25)",
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(10, 22, 40, 0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: sage,
          color: forest,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px !important",
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
  },
});

export { gold, navy, sage, cream, forest };
