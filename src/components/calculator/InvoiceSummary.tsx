"use client";

import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useMemo, useRef } from "react";
import { BRAND } from "@/data/defaultProducts";
import { useProducts } from "@/context/ProductContext";
import {
  calculateOrder,
  formatINR,
  formatInvoiceDate,
  getIndividualSum,
  getKitPrice,
} from "@/lib/pricing";

export default function InvoiceSummary() {
  const {
    products,
    kitPricing,
    pricingMode,
    quantities,
    cartItemCount,
    addCompleteKit,
    clearCart,
  } = useProducts();

  const breakdown = useMemo(
    () => calculateOrder(products, quantities, pricingMode, kitPricing),
    [products, quantities, pricingMode, kitPricing],
  );

  const hasItems = breakdown.grandTotal > 0;
  const modeLabel =
    pricingMode === "wholesale" ? "Wholesale / Dealer" : "Retail / Customer";
  const kitPrice = getKitPrice(kitPricing, pricingMode);
  const individualSum = getIndividualSum(products, pricingMode);
  const invoiceIdRef = useRef(
    `MR-${Date.now().toString(36).toUpperCase().slice(-6)}`,
  );

  return (
    <Paper
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(10, 22, 40, 0.12)",
      }}
    >
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          background: "linear-gradient(135deg, #0D3B2E 0%, #0A1628 100%)",
          borderBottom: "3px solid",
          borderColor: "primary.main",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
          <ReceiptLongIcon sx={{ color: "primary.main", fontSize: 28 }} />
          <Typography variant="h6" sx={{ color: "#fff" }}>
            Order Invoice
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
            #{invoiceIdRef.current} · {formatInvoiceDate()}
          </Typography>
          <Chip
            label={modeLabel}
            size="small"
            sx={{
              background: "linear-gradient(135deg, #E8D48B, #C9A227)",
              color: "#0A1628",
              fontWeight: 700,
              fontSize: "0.7rem",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#FFFCF8" }}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
            flexWrap: "wrap",
          }}
        >
          <StatBox
            label="Products"
            value={String(breakdown.invoiceLines.filter((l) => l.type !== "savings").length)}
          />
          <StatBox label="Total Units" value={String(breakdown.totalUnits)} />
          <StatBox
            label="Cart Items"
            value={String(cartItemCount)}
            icon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
          />
        </Box>

        {!hasItems ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            <ReceiptLongIcon sx={{ fontSize: 48, opacity: 0.25, mb: 1 }} />
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              No products selected
            </Typography>
            <Typography variant="body2">
              Add items to generate your invoice
            </Typography>
          </Box>
        ) : (
          <>
            <TableContainer
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 2,
                maxHeight: { xs: 320, sm: 400 },
                overflow: "auto",
              }}
            >
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        backgroundColor: "#F5F0E6",
                        minWidth: 36,
                      }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        backgroundColor: "#F5F0E6",
                        minWidth: 140,
                      }}
                    >
                      Product
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: 700,
                        backgroundColor: "#F5F0E6",
                        display: { xs: "none", sm: "table-cell" },
                      }}
                    >
                      Size
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: 700, backgroundColor: "#F5F0E6" }}
                    >
                      Qty
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: "#F5F0E6",
                        display: { xs: "none", md: "table-cell" },
                      }}
                    >
                      Rate
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontWeight: 700, backgroundColor: "#F5F0E6" }}
                    >
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {breakdown.invoiceLines.map((line) => (
                    <TableRow
                      key={`${line.type}-${line.sr}-${line.description}`}
                      sx={{
                        backgroundColor:
                          line.type === "kit" ? "rgba(201,162,39,0.08)" : "#fff",
                      }}
                    >
                      <TableCell>{line.sr}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: line.type === "kit" ? 700 : 600,
                            color:
                              line.type === "kit" ? "primary.dark" : "text.primary",
                          }}
                        >
                          {line.description}
                        </Typography>
                        {line.size && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: { xs: "block", sm: "none" } }}
                          >
                            {line.size}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ display: { xs: "none", sm: "table-cell" } }}
                      >
                        {line.size ?? "—"}
                      </TableCell>
                      <TableCell align="center">{line.qty}</TableCell>
                      <TableCell
                        align="right"
                        sx={{ display: { xs: "none", md: "table-cell" } }}
                      >
                        {formatINR(line.rate)}
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ fontWeight: 700 }}>
                          {formatINR(line.amount)}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: { xs: "block", md: "none" } }}
                        >
                          @ {formatINR(line.rate)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {breakdown.kitSavings > 0 && (
              <Alert
                severity="success"
                icon={<LocalOfferIcon />}
                sx={{ mb: 2, borderRadius: 2 }}
              >
                Complete Kit savings:{" "}
                <strong>{formatINR(breakdown.kitSavings)}</strong>
              </Alert>
            )}

            <Stack spacing={1} sx={{ mb: 2 }}>
              <SummaryRow label="Subtotal (MRP)" value={formatINR(breakdown.subtotal)} />
              {breakdown.kitSavings > 0 && (
                <SummaryRow
                  label="Kit Discount"
                  value={`− ${formatINR(breakdown.kitSavings)}`}
                  highlight
                />
              )}
            </Stack>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2.5,
            borderRadius: 2,
            background:
              "linear-gradient(135deg, #0A1628 0%, #0D3B2E 50%, #1A2D4A 100%)",
            border: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "primary.light", letterSpacing: "0.15em" }}
            >
              Grand Total
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {BRAND.name} {BRAND.country}
            </Typography>
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "primary.light",
              fontWeight: 800,
              fontSize: { xs: "1.75rem", sm: "2.125rem" },
            }}
          >
            {formatINR(breakdown.grandTotal)}
          </Typography>
        </Box>

        <Stack spacing={1.5} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={addCompleteKit}
            startIcon={<LocalOfferIcon />}
          >
            Add Complete Kit (+1 each)
          </Button>
          <Typography variant="caption" color="text.secondary" align="center">
            Kit {formatINR(kitPrice)} · Save{" "}
            {formatINR(individualSum - kitPrice)} vs individual
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              if (
                hasItems &&
                window.confirm("Clear entire order? This cannot be undone.")
              ) {
                clearCart();
              }
            }}
            disabled={!hasItems}
          >
            Reset Order
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

function StatBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 90,
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
        }}
      >
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "secondary.main" }}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: highlight ? "success.main" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
