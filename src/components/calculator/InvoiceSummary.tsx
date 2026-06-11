"use client";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useMemo, useRef, useState } from "react";
import { BRAND } from "@/data/defaultProducts";
import { useProducts } from "@/context/ProductContext";
import {
  calculateOrder,
  formatINR,
  formatInvoiceDate,
  getIndividualSum,
  getKitPrice,
  getUnitPrice,
} from "@/lib/pricing";
import CartQuantityControls from "./CartQuantityControls";
import InvoiceCartLine from "./InvoiceCartLine";

const headerCellSx = {
  fontWeight: 700,
  backgroundColor: "#F5F0E6",
  color: "#0A1628",
  borderBottom: "2px solid #C9A227",
  whiteSpace: "nowrap" as const,
};

export default function InvoiceSummary() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [expanded, setExpanded] = useState(true);

  const {
    products,
    kitPricing,
    pricingMode,
    quantities,
    kitCount,
    cartItemCount,
    setQuantity,
    setKitCount,
    removeProduct,
    removeKit,
    addCompleteKit,
    clearCart,
  } = useProducts();

  const breakdown = useMemo(
    () =>
      calculateOrder(products, quantities, kitCount, pricingMode, kitPricing),
    [products, quantities, kitCount, pricingMode, kitPricing],
  );

  const hasItems = breakdown.grandTotal > 0;
  const modeLabel =
    pricingMode === "wholesale" ? "Wholesale / Dealer" : "Retail / Customer";
  const kitPrice = getKitPrice(kitPricing, pricingMode);
  const individualSum = getIndividualSum(products, pricingMode);

  const cartProducts = useMemo(
    () => products.filter((p) => (quantities[p.id] ?? 0) > 0),
    [products, quantities],
  );

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
      {/* Invoice header — tap to collapse on mobile */}
      <Box
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          background: "linear-gradient(135deg, #0D3B2E 0%, #0A1628 100%)",
          borderBottom: "3px solid",
          borderColor: "primary.main",
          cursor: isMobile ? "pointer" : "default",
        }}
        onClick={isMobile ? () => setExpanded((v) => !v) : undefined}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <ReceiptLongIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: "#fff" }}>
              Order Invoice
            </Typography>
          </Box>
          {isMobile && (
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((v) => !v);
              }}
              aria-label={expanded ? "Collapse invoice" : "Expand invoice"}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.12)" },
              }}
            >
              {expanded ? (
                <ExpandLessIcon sx={{ color: "#fff", fontSize: 26 }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#fff", fontSize: 26 }} />
              )}
            </IconButton>
          )}
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
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.75)" }}>
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

        {isMobile && !expanded && hasItems && (
          <Typography
            variant="subtitle2"
            sx={{ color: "primary.light", mt: 1.5, fontWeight: 700 }}
          >
            Total: {formatINR(breakdown.grandTotal)}
          </Typography>
        )}
      </Box>

      <Collapse in={!isMobile || expanded} timeout="auto">
        <Box sx={{ p: { xs: 2, sm: 3 }, backgroundColor: "#FFFCF8" }}>
          {/* Invoice meta */}
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              mb: 2.5,
              borderRadius: 2,
              borderColor: "divider",
              backgroundColor: "#fff",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ letterSpacing: "0.12em" }}
                >
                  Bill From
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {BRAND.name} {BRAND.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {BRAND.subtitle}
                </Typography>
              </Box>
              <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
                <Typography
                  variant="overline"
                  color="text.secondary"
                  sx={{ letterSpacing: "0.12em" }}
                >
                  Invoice Details
                </Typography>
                <Typography variant="body2">
                  <strong>Invoice #:</strong> {invoiceIdRef.current}
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong> {formatInvoiceDate()}
                </Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {modeLabel}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr 1fr", sm: "1fr 1fr 1fr" },
              gap: 1.5,
              mb: 2.5,
            }}
          >
            <StatBox
              label="Line Items"
              value={String((kitCount > 0 ? 1 : 0) + cartProducts.length)}
            />
            <StatBox label="Total Units" value={String(breakdown.totalUnits)} />
            <StatBox
              label="Cart Items"
              value={String(cartItemCount)}
              icon={<ShoppingCartIcon sx={{ fontSize: 16 }} />}
            />
          </Box>

          {!hasItems ? (
            <Box sx={{ py: 5, textAlign: "center", color: "text.secondary" }}>
              <ReceiptLongIcon sx={{ fontSize: 48, opacity: 0.25, mb: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                No products selected
              </Typography>
              <Typography variant="body2">
                Add items individually or use the Complete Kit button
              </Typography>
            </Box>
          ) : (
            <>
              {/* Desktop / tablet table */}
              <Box sx={{ display: { xs: "none", md: "block" }, mb: 2 }}>
                <TableContainer
                  sx={{
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    maxHeight: 460,
                    overflow: "auto",
                  }}
                >
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          align="center"
                          sx={{ ...headerCellSx, width: 48 }}
                        >
                          #
                        </TableCell>
                        <TableCell sx={{ ...headerCellSx, minWidth: 160 }}>
                          Product
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...headerCellSx, width: 90 }}
                        >
                          Size
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...headerCellSx, minWidth: 200, width: 200 }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...headerCellSx, width: 100 }}
                        >
                          Rate (₹)
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{ ...headerCellSx, width: 110 }}
                        >
                          Amount (₹)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {kitCount > 0 && (
                        <TableRow
                          sx={{ backgroundColor: "rgba(201,162,39,0.1)" }}
                        >
                          <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                            1
                          </TableCell>
                          <TableCell sx={{ verticalAlign: "middle" }}>
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              Complete Care Kit (11 Products)
                            </Typography>
                            <Chip
                              label="Kit Price"
                              size="small"
                              sx={{ mt: 0.5, height: 20, fontSize: "0.65rem" }}
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                            Full Kit
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{ verticalAlign: "middle", px: 1 }}
                          >
                            <CartQuantityControls
                              quantity={kitCount}
                              onChange={(n) =>
                                n <= 0 ? removeKit() : setKitCount(n)
                              }
                              onRemove={removeKit}
                            />
                          </TableCell>
                          <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                            <Typography sx={{ fontWeight: 600 }}>
                              {formatINR(kitPrice)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                            <Typography sx={{ fontWeight: 700 }}>
                              {formatINR(breakdown.kitTotal)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}

                      {cartProducts.map((product, idx) => {
                        const qty = quantities[product.id] ?? 0;
                        const rate = getUnitPrice(product, pricingMode);
                        const sr = (kitCount > 0 ? 1 : 0) + idx + 1;
                        return (
                          <TableRow key={product.id} hover>
                            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                              {sr}
                            </TableCell>
                            <TableCell sx={{ verticalAlign: "middle" }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {product.name}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                              {product.quantity}
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{ verticalAlign: "middle", px: 1 }}
                            >
                              <CartQuantityControls
                                quantity={qty}
                                onChange={(n) =>
                                  n <= 0
                                    ? removeProduct(product.id)
                                    : setQuantity(product.id, n)
                                }
                                onRemove={() => removeProduct(product.id)}
                              />
                            </TableCell>
                            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                              <Typography sx={{ fontWeight: 600 }}>
                                {formatINR(rate)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center" sx={{ verticalAlign: "middle" }}>
                              <Typography sx={{ fontWeight: 700 }}>
                                {formatINR(rate * qty)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Mobile card list */}
              <Stack spacing={1.5} sx={{ display: { xs: "flex", md: "none" }, mb: 2 }}>
                {kitCount > 0 && (
                  <InvoiceCartLine
                    sr={1}
                    name="Complete Care Kit (11 Products)"
                    size="Full Kit"
                    rate={kitPrice}
                    amount={breakdown.kitTotal}
                    quantity={kitCount}
                    isKit
                    onQuantityChange={(n) =>
                      n <= 0 ? removeKit() : setKitCount(n)
                    }
                    onRemove={removeKit}
                  />
                )}
                {cartProducts.map((product, idx) => {
                  const qty = quantities[product.id] ?? 0;
                  const rate = getUnitPrice(product, pricingMode);
                  return (
                    <InvoiceCartLine
                      key={product.id}
                      sr={(kitCount > 0 ? 1 : 0) + idx + 1}
                      name={product.name}
                      size={product.quantity}
                      rate={rate}
                      amount={rate * qty}
                      quantity={qty}
                      onQuantityChange={(n) =>
                        n <= 0
                          ? removeProduct(product.id)
                          : setQuantity(product.id, n)
                      }
                      onRemove={() => removeProduct(product.id)}
                    />
                  );
                })}
              </Stack>

              {breakdown.kitSavings > 0 && (
                <Alert
                  severity="success"
                  icon={<LocalOfferIcon />}
                  sx={{ mb: 2, borderRadius: 2 }}
                >
                  Kit savings applied:{" "}
                  <strong>{formatINR(breakdown.kitSavings)}</strong>
                </Alert>
              )}

              <Paper
                variant="outlined"
                sx={{ p: 2, mb: 2, borderRadius: 2, backgroundColor: "#fff" }}
              >
                <Stack spacing={1}>
                  <SummaryRow
                    label="Subtotal (before kit discount)"
                    value={formatINR(breakdown.subtotal)}
                  />
                  {breakdown.kitSavings > 0 && (
                    <SummaryRow
                      label="Kit Discount"
                      value={`− ${formatINR(breakdown.kitSavings)}`}
                      highlight
                    />
                  )}
                </Stack>
              </Paper>
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
              <Typography
                variant="caption"
                sx={{ color: "rgba(255,255,255,0.6)", display: "block" }}
              >
                {BRAND.name} {BRAND.country}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                color: "primary.light",
                fontWeight: 800,
                fontSize: { xs: "1.5rem", sm: "2.125rem" },
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
              Add Complete Kit
            </Button>
            <Typography variant="caption" color="text.secondary" align="center">
              Kit {formatINR(kitPrice)} · Only via this button · Save{" "}
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
      </Collapse>
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
        p: 1.5,
        borderRadius: 2,
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block" }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          mt: 0.25,
        }}
      >
        {icon}
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, color: "secondary.main", fontSize: "1.1rem" }}
        >
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: highlight ? "success.main" : "text.primary",
          textAlign: "right",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}
