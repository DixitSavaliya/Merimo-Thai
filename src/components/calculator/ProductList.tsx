"use client";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "./ProductCard";
import ProductRow from "./ProductRow";

export default function ProductList() {
  const { products, pricingMode, quantities, setQuantity } = useProducts();

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid", borderColor: "divider" }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background: "linear-gradient(135deg, #C9A227 0%, #E8D48B 100%)",
                }}
              >
                <TableCell sx={{ color: "#0A1628", fontWeight: 700 }}>#</TableCell>
                <TableCell sx={{ color: "#0A1628", fontWeight: 700 }}>
                  Product
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color: "#0A1628",
                    fontWeight: 700,
                    display: { xs: "none", sm: "table-cell" },
                  }}
                >
                  Unit Price
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "#0A1628", fontWeight: 700 }}
                >
                  Qty
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ color: "#0A1628", fontWeight: 700 }}
                >
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product, index) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  index={index}
                  mode={pricingMode}
                  quantity={quantities[product.id] ?? 0}
                  onQuantityChange={(qty) => setQuantity(product.id, qty)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Stack spacing={2} sx={{ display: { xs: "flex", md: "none" } }}>
        <Typography variant="subtitle2" color="text.secondary">
          Tap + to add products to your order
        </Typography>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            mode={pricingMode}
            quantity={quantities[product.id] ?? 0}
            onQuantityChange={(qty) => setQuantity(product.id, qty)}
          />
        ))}
      </Stack>
    </>
  );
}
