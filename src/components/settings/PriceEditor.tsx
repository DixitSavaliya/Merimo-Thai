"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useProducts } from "@/context/ProductContext";
import {
  priceFormSchema,
  type PriceFormInput,
  type PriceFormValues,
} from "@/lib/priceFormSchema";

function buildDefaultValues(
  products: ReturnType<typeof useProducts>["products"],
  kitPricing: ReturnType<typeof useProducts>["kitPricing"],
): PriceFormValues {
  return {
    wholesaleKitPrice: kitPricing.wholesaleKitPrice,
    retailKitPrice: kitPricing.retailKitPrice,
    products: products.map((p) => ({
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      wholesalePrice: p.wholesalePrice,
      retailPrice: p.retailPrice,
    })),
  };
}

export default function PriceEditor() {
  const { products, kitPricing, saveAllPrices, resetToDefaults } =
    useProducts();
  const [saved, setSaved] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PriceFormInput, unknown, PriceFormValues>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: buildDefaultValues(products, kitPricing),
    mode: "onBlur",
  });

  useEffect(() => {
    reset(buildDefaultValues(products, kitPricing));
  }, [products, kitPricing, reset]);

  const onSubmit = (values: PriceFormValues) => {
    saveAllPrices(values);
    reset(values);
    setSaved(true);
  };

  const productErrors = errors.products;

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
        Edit prices below and click <strong>Save Prices</strong>. Retail must
        be equal to or higher than wholesale. Changes apply to the order
        calculator after saving.
      </Alert>

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
        <Box
          sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          <Controller
            name="wholesaleKitPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Wholesale Kit Price (₹)"
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={Boolean(errors.wholesaleKitPrice)}
                helperText={errors.wholesaleKitPrice?.message}
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
                fullWidth
              />
            )}
          />
          <Controller
            name="retailKitPrice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Retail Kit Price (₹)"
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                error={Boolean(errors.retailKitPrice)}
                helperText={errors.retailKitPrice?.message}
                slotProps={{ htmlInput: { min: 0, step: 1 } }}
                fullWidth
              />
            )}
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
              {products.map((product, index) => {
                const rowError = productErrors?.[index];
                return (
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
                      <Controller
                        name={`products.${index}.wholesalePrice`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            size="small"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(rowError?.wholesalePrice)}
                            helperText={rowError?.wholesalePrice?.message}
                            slotProps={{
                              htmlInput: {
                                min: 0,
                                step: 1,
                                style: { textAlign: "right" },
                              },
                            }}
                            sx={{ width: { xs: 100, sm: 130 } }}
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Controller
                        name={`products.${index}.retailPrice`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            type="number"
                            size="small"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            error={Boolean(rowError?.retailPrice)}
                            helperText={rowError?.retailPrice?.message}
                            slotProps={{
                              htmlInput: {
                                min: 0,
                                step: 1,
                                style: { textAlign: "right" },
                              },
                            }}
                            sx={{ width: { xs: 100, sm: 130 } }}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
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
          type="button"
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
              setSaved(true);
            }
          }}
        >
          Reset to Defaults
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          disabled={isSubmitting || !isDirty}
        >
          Save Prices
        </Button>
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        message="Prices saved successfully"
      />
    </Box>
  );
}
