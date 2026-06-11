"use client";

import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SaveIcon from "@mui/icons-material/Save";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useCallback, useMemo, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import {
  parsePriceInput,
  validatePrice,
  validateRetailVsWholesale,
} from "@/lib/validation";

export default function PriceEditor() {
  const {
    products,
    kitPricing,
    updateProductPrice,
    updateKitPrice,
    resetToDefaults,
  } = useProducts();
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setError = useCallback((key: string, message?: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[key] = message;
      else delete next[key];
      return next;
    });
  }, []);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const handleProductPrice = (
    productId: string,
    field: "wholesalePrice" | "retailPrice",
    raw: string,
  ) => {
    const key = `${productId}-${field}`;
    const parsed = parsePriceInput(raw);
    if (parsed === null) {
      setError(key, "Enter a valid whole number");
      return;
    }

    const check = validatePrice(parsed);
    if (!check.valid) {
      setError(key, check.error);
      return;
    }

    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const wholesale =
      field === "wholesalePrice" ? parsed : product.wholesalePrice;
    const retail = field === "retailPrice" ? parsed : product.retailPrice;
    const pairCheck = validateRetailVsWholesale(wholesale, retail);
    if (!pairCheck.valid) {
      setError(key, pairCheck.error);
      return;
    }

    setError(key);
    setError(`${productId}-wholesalePrice`);
    setError(`${productId}-retailPrice`);
    updateProductPrice(productId, field, parsed);
  };

  const handleKitPrice = (
    field: "wholesaleKitPrice" | "retailKitPrice",
    raw: string,
  ) => {
    const key = `kit-${field}`;
    const parsed = parsePriceInput(raw);
    if (parsed === null) {
      setError(key, "Enter a valid whole number");
      return;
    }

    const check = validatePrice(parsed);
    if (!check.valid) {
      setError(key, check.error);
      return;
    }

    const wholesale =
      field === "wholesaleKitPrice" ? parsed : kitPricing.wholesaleKitPrice;
    const retail =
      field === "retailKitPrice" ? parsed : kitPricing.retailKitPrice;
    const pairCheck = validateRetailVsWholesale(wholesale, retail);
    if (!pairCheck.valid) {
      setError(key, pairCheck.error);
      return;
    }

    setError(key);
    setError("kit-wholesaleKitPrice");
    setError("kit-retailKitPrice");
    updateKitPrice(field, parsed);
  };

  const getFieldError = (key: string) => errors[key];

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Prices save automatically in your browser. Retail must be equal to or
        higher than wholesale. Changes apply instantly in the order calculator.
      </Alert>

      {hasErrors && (
        <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
          Please fix validation errors before saving.
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          mb: 4,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(135deg, #0D3B2E, #0A1628)",
          }}
        >
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Complete Kit Bundle Prices
          </Typography>
        </Box>
        <Box sx={{ p: 3, display: "flex", gap: 3, flexWrap: "wrap" }}>
          <TextField
            label="Wholesale Kit Price (₹)"
            type="number"
            value={kitPricing.wholesaleKitPrice}
            onChange={(e) =>
              handleKitPrice("wholesaleKitPrice", e.target.value)
            }
            error={Boolean(getFieldError("kit-wholesaleKitPrice"))}
            helperText={getFieldError("kit-wholesaleKitPrice")}
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          />
          <TextField
            label="Retail Kit Price (₹)"
            type="number"
            value={kitPricing.retailKitPrice}
            onChange={(e) => handleKitPrice("retailKitPrice", e.target.value)}
            error={Boolean(getFieldError("kit-retailKitPrice"))}
            helperText={getFieldError("kit-retailKitPrice")}
            slotProps={{ htmlInput: { min: 0, step: 1 } }}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          />
        </Box>
      </Paper>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            p: 2,
            background: "linear-gradient(135deg, #0D3B2E, #0A1628)",
          }}
        >
          <Typography variant="h6" sx={{ color: "primary.main" }}>
            Individual Product Prices
          </Typography>
        </Box>
        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#F5F0E6" }}>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Size</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Wholesale (₹)
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right">
                  Retail (₹)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#fff" : "#FAF8F5",
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 600 }}>
                      {product.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      size="small"
                      value={product.wholesalePrice}
                      onChange={(e) =>
                        handleProductPrice(
                          product.id,
                          "wholesalePrice",
                          e.target.value,
                        )
                      }
                      error={Boolean(
                        getFieldError(`${product.id}-wholesalePrice`),
                      )}
                      helperText={getFieldError(`${product.id}-wholesalePrice`)}
                      slotProps={{
                        htmlInput: {
                          min: 0,
                          step: 1,
                          style: { textAlign: "right" },
                        },
                      }}
                      sx={{ width: { xs: 100, sm: 120 } }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TextField
                      type="number"
                      size="small"
                      value={product.retailPrice}
                      onChange={(e) =>
                        handleProductPrice(
                          product.id,
                          "retailPrice",
                          e.target.value,
                        )
                      }
                      error={Boolean(getFieldError(`${product.id}-retailPrice`))}
                      helperText={getFieldError(`${product.id}-retailPrice`)}
                      slotProps={{
                        htmlInput: {
                          min: 0,
                          step: 1,
                          style: { textAlign: "right" },
                        },
                      }}
                      sx={{ width: { xs: 100, sm: 120 } }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="outlined"
          color="warning"
          startIcon={<RestartAltIcon />}
          onClick={() => {
            if (
              window.confirm(
                "Reset all prices and clear the current order? This cannot be undone.",
              )
            ) {
              resetToDefaults();
              setErrors({});
              setSaved(true);
            }
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={hasErrors}
          onClick={() => setSaved(true)}
        >
          Prices Saved
        </Button>
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        message="Prices updated successfully"
      />
    </Box>
  );
}
