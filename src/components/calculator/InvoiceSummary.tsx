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
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
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
} from "@/lib/pricing";
import InvoiceCartList from "./InvoiceCartList";

export default function InvoiceSummary() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
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

  const bodyProps = {
    invoiceId: invoiceIdRef.current,
    modeLabel,
    hasItems,
    kitCount,
    kitPrice,
    kitTotal: breakdown.kitTotal,
    kitSavings: breakdown.kitSavings,
    cartProducts,
    quantities,
    pricingMode,
    breakdown,
    cartItemCount,
    individualSum,
    isDesktop,
    setKitCount,
    removeKit,
    setQuantity,
    removeProduct,
    addCompleteKit,
    clearCart,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: 3,
        boxShadow: "0 16px 48px rgba(10, 22, 40, 0.1)",
        width: "100%",
        height: { lg: "100%" },
        flex: { lg: 1 },
        minHeight: { lg: 0 },
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Header (fixed) ── */}
      <Box
        sx={{
          flexShrink: 0,
          px: { xs: 2, sm: 2.5 },
          py: { xs: 1.75, sm: 2 },
          background: "linear-gradient(135deg, #0D3B2E 0%, #0A1628 100%)",
          borderBottom: "3px solid",
          borderColor: "primary.main",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75 }}>
              <ReceiptLongIcon sx={{ color: "primary.main", fontSize: 26 }} />
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: "1.1rem", sm: "1.25rem" },
                }}
              >
                Order Invoice
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{ color: "rgba(255,255,255,0.7)", display: "block", mb: 0.75 }}
            >
              #{invoiceIdRef.current} · {formatInvoiceDate()}
            </Typography>
            <Chip
              label={modeLabel}
              size="small"
              sx={{
                background: "linear-gradient(135deg, #E8D48B, #C9A227)",
                color: "#0A1628",
                fontWeight: 700,
                fontSize: "0.68rem",
              }}
            />
          </Box>

          {isMobile && (
            <IconButton
              onClick={() => setExpanded((v) => !v)}
              aria-label={expanded ? "Collapse invoice" : "Expand invoice"}
              sx={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.35)",
                flexShrink: 0,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          )}
        </Box>

        {isMobile && !expanded && hasItems && (
          <Box
            sx={{
              mt: 1.25,
              pt: 1.25,
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
              Grand Total
            </Typography>
            <Typography variant="h6" sx={{ color: "primary.light", fontWeight: 800 }}>
              {formatINR(breakdown.grandTotal)}
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Body ── */}
      {isDesktop ? (
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InvoiceBody {...bodyProps} stickyFooter />
        </Box>
      ) : (
        <Collapse in={expanded}>
          <InvoiceBody {...bodyProps} stickyFooter={false} />
        </Collapse>
      )}
    </Paper>
  );
}

interface InvoiceBodyProps {
  invoiceId: string;
  modeLabel: string;
  hasItems: boolean;
  kitCount: number;
  kitPrice: number;
  kitTotal: number;
  kitSavings: number;
  cartProducts: ReturnType<typeof useProducts>["products"];
  quantities: Record<string, number>;
  pricingMode: ReturnType<typeof useProducts>["pricingMode"];
  breakdown: ReturnType<typeof calculateOrder>;
  cartItemCount: number;
  individualSum: number;
  isDesktop: boolean;
  stickyFooter: boolean;
  setKitCount: (n: number) => void;
  removeKit: () => void;
  setQuantity: (id: string, n: number) => void;
  removeProduct: (id: string) => void;
  addCompleteKit: () => void;
  clearCart: () => void;
}

function InvoiceBody({
  invoiceId,
  modeLabel,
  hasItems,
  kitCount,
  kitPrice,
  kitTotal,
  kitSavings,
  cartProducts,
  quantities,
  pricingMode,
  breakdown,
  cartItemCount,
  individualSum,
  isDesktop,
  stickyFooter,
  setKitCount,
  removeKit,
  setQuantity,
  removeProduct,
  addCompleteKit,
  clearCart,
}: InvoiceBodyProps) {
  const statsRow = (
    <Box
      sx={{
        flexShrink: 0,
        px: { xs: 2, lg: 1.5 },
        pt: { xs: 2, lg: 1.25 },
        pb: { xs: 1, lg: 0.75 },
        backgroundColor: "#FFFCF8",
      }}
    >
      {!isDesktop && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.25,
            mb: 1.5,
            p: 1.5,
            borderRadius: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "#fff",
          }}
        >
          <Box>
            <MetaLabel>Bill From</MetaLabel>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.25 }}>
              {BRAND.name} {BRAND.country}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {BRAND.subtitle}
            </Typography>
          </Box>
          <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
            <MetaLabel>Invoice Details</MetaLabel>
            <MetaRow label="Invoice #" value={invoiceId} />
            <MetaRow label="Date" value={formatInvoiceDate()} />
            <MetaRow label="Type" value={modeLabel} />
          </Box>
        </Box>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1 }}>
        <StatBox
          label="Lines"
          value={String((kitCount > 0 ? 1 : 0) + cartProducts.length)}
        />
        <StatBox label="Units" value={String(breakdown.totalUnits)} />
        <StatBox
          label="In Cart"
          value={String(cartItemCount)}
          icon={<ShoppingCartIcon sx={{ fontSize: 14 }} />}
        />
      </Box>
    </Box>
  );

  const cartScroll = (
    <Box
      sx={{
        flex: stickyFooter ? 1 : "none",
        minHeight: stickyFooter ? 0 : undefined,
        overflowY: stickyFooter ? "auto" : "visible",
        overflowX: "hidden",
        px: { xs: 2, lg: 1.5 },
        pb: { xs: 1, lg: 0.5 },
        backgroundColor: "#FFFCF8",
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
        scrollbarColor: "#C9A227 #f0f0f0",
        "&::-webkit-scrollbar": { width: 8 },
        "&::-webkit-scrollbar-track": { backgroundColor: "#f0f0f0", borderRadius: 4 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#C9A227",
          borderRadius: 4,
          "&:hover": { backgroundColor: "#B8922A" },
        },
      }}
    >
      {!hasItems ? (
        <Box
          sx={{
            py: 4,
            textAlign: "center",
            borderRadius: 2,
            border: "1px dashed",
            borderColor: "divider",
            backgroundColor: "#fff",
            mb: 2,
          }}
        >
          <ReceiptLongIcon sx={{ fontSize: 44, opacity: 0.2, mb: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
            Your invoice is empty
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Add products from the list or use Add Complete Kit below
          </Typography>
        </Box>
      ) : (
        <InvoiceCartList
          kitCount={kitCount}
          kitPrice={kitPrice}
          kitTotal={kitTotal}
          cartProducts={cartProducts}
          quantities={quantities}
          pricingMode={pricingMode}
          setKitCount={setKitCount}
          removeKit={removeKit}
          setQuantity={setQuantity}
          removeProduct={removeProduct}
        />
      )}
    </Box>
  );

  const footer = (
    <Box
      sx={{
        flexShrink: 0,
        px: { xs: 2, lg: 1.5 },
        py: { xs: 2, lg: 1.25 },
        borderTop: "2px solid",
        borderColor: "divider",
        backgroundColor: "#FFFCF8",
        boxShadow: stickyFooter ? "0 -6px 20px rgba(10,22,40,0.08)" : "none",
      }}
    >
      {/* Kit button first — always visible */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={addCompleteKit}
        startIcon={<LocalOfferIcon />}
        sx={{ py: 1.15, fontWeight: 700, fontSize: "0.92rem", mb: 1 }}
      >
        Add Complete Kit — {formatINR(kitPrice)}
      </Button>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", textAlign: "center", mb: 1.25, lineHeight: 1.5 }}
      >
        Save {formatINR(individualSum - kitPrice)} vs all 11 products individually
      </Typography>

      {hasItems && kitSavings > 0 && (
        <Alert
          severity="success"
          icon={<LocalOfferIcon fontSize="small" />}
          sx={{ mb: 1, borderRadius: 2, py: 0.25 }}
        >
          Kit savings: <strong>{formatINR(kitSavings)}</strong>
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          p: { xs: 1.5, lg: 1.25 },
          mb: 1,
          borderRadius: 2,
          background:
            "linear-gradient(135deg, #0A1628 0%, #0D3B2E 60%, #1A2D4A 100%)",
          border: "1.5px solid",
          borderColor: "primary.main",
        }}
      >
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "primary.light", letterSpacing: "0.12em", lineHeight: 1.2 }}
          >
            Grand Total
          </Typography>
          {hasItems && (
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }}>
              Subtotal {formatINR(breakdown.subtotal)}
              {kitSavings > 0 && ` · −${formatINR(kitSavings)} kit`}
            </Typography>
          )}
        </Box>
        <Typography
          sx={{
            color: "primary.light",
            fontWeight: 800,
            fontSize: { xs: "1.4rem", sm: "1.65rem" },
            lineHeight: 1,
          }}
        >
          {formatINR(breakdown.grandTotal)}
        </Typography>
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => {
          if (hasItems && window.confirm("Clear entire order? This cannot be undone.")) {
            clearCart();
          }
        }}
        disabled={!hasItems}
      >
        Reset Order
      </Button>
    </Box>
  );

  if (stickyFooter) {
    return (
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#FFFCF8",
        }}
      >
        {statsRow}
        {cartScroll}
        {footer}
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#FFFCF8" }}>
      {statsRow}
      {cartScroll}
      {footer}
    </Box>
  );
}

function MetaLabel({ children }: { children: React.ReactNode }) {
  return (
    <Typography
      variant="overline"
      color="text.secondary"
      sx={{ letterSpacing: "0.1em", fontSize: "0.62rem" }}
    >
      {children}
    </Typography>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <Typography variant="caption" sx={{ mt: 0.25, display: "block" }}>
      <Box component="span" sx={{ color: "text.secondary" }}>
        {label}:{" "}
      </Box>
      <Box component="span" sx={{ fontWeight: 600 }}>
        {value}
      </Box>
    </Typography>
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
        p: 1,
        borderRadius: 1.5,
        backgroundColor: "#fff",
        border: "1px solid",
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontSize: "0.62rem", letterSpacing: "0.05em" }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.4,
          mt: 0.2,
        }}
      >
        {icon}
        <Typography
          sx={{ fontWeight: 800, color: "secondary.main", fontSize: "1rem" }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
