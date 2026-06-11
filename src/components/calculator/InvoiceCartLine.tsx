"use client";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { formatINR } from "@/lib/pricing";
import CartQuantityControls from "./CartQuantityControls";

interface InvoiceCartLineProps {
  sr: number;
  name: string;
  size?: string;
  rate: number;
  amount: number;
  quantity: number;
  isKit?: boolean;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}

export default function InvoiceCartLine({
  sr,
  name,
  size,
  rate,
  amount,
  quantity,
  isKit,
  onQuantityChange,
  onRemove,
}: InvoiceCartLineProps) {
  return (
    <Box
      sx={{
        p: { xs: 1.5, lg: 1.25 },
        borderRadius: 2,
        border: "1px solid",
        borderColor: isKit ? "primary.main" : "divider",
        borderWidth: isKit ? 2 : 1,
        backgroundColor: isKit ? "rgba(201,162,39,0.06)" : "#fff",
        boxShadow: "0 1px 6px rgba(10,22,40,0.05)",
      }}
    >
      {/* ── Mobile / tablet: stacked card ── */}
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <ProductHeader sr={sr} name={name} size={size} isKit={isKit} />
        <PricingRow rate={rate} amount={amount} sx={{ mb: 1.5 }} />
        <ControlsRow
          quantity={quantity}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      </Box>

      {/* ── Desktop: compact — product + pricing + controls in one view ── */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", mb: 1.25 }}>
          <SrBadge sr={sr} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, lineHeight: 1.3, wordBreak: "break-word" }}
            >
              {name}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.4 }}>
              {size && (
                <Chip
                  label={size}
                  size="small"
                  variant="outlined"
                  sx={{ height: 20, fontSize: "0.65rem" }}
                />
              )}
              {isKit && (
                <Chip
                  label="Kit"
                  size="small"
                  color="primary"
                  sx={{ height: 20, fontSize: "0.65rem" }}
                />
              )}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gridTemplateRows: "auto auto",
            gap: 1,
            p: 1,
            borderRadius: 1.5,
            backgroundColor: "#FAF8F5",
          }}
        >
          <PriceCell label="Rate" value={formatINR(rate)} />
          <PriceCell label="Amount" value={formatINR(amount)} align="right" highlight />
          <Box
            sx={{
              gridColumn: "1 / -1",
              pt: 0.75,
              borderTop: "1px dashed",
              borderColor: "divider",
            }}
          >
            <CartQuantityControls
              quantity={quantity}
              onChange={onQuantityChange}
              onRemove={onRemove}
              fullWidth
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function ProductHeader({
  sr,
  name,
  size,
  isKit,
}: {
  sr: number;
  name: string;
  size?: string;
  isKit?: boolean;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1.25, mb: 1.25 }}>
      <SrBadge sr={sr} />
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, lineHeight: 1.35, wordBreak: "break-word" }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5 }}>
          {size && (
            <Chip
              label={size}
              size="small"
              variant="outlined"
              sx={{ height: 22, fontSize: "0.68rem" }}
            />
          )}
          {isKit && (
            <Chip
              label="Kit Price"
              size="small"
              color="primary"
              sx={{ height: 22, fontSize: "0.68rem" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

function PricingRow({
  rate,
  amount,
  sx,
}: {
  rate: number;
  amount: number;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 1,
        p: 1.25,
        borderRadius: 1.5,
        backgroundColor: "#FAF8F5",
        ...sx,
      }}
    >
      <PriceCell label="Rate" value={formatINR(rate)} />
      <PriceCell label="Amount" value={formatINR(amount)} align="right" highlight />
    </Box>
  );
}

function PriceCell({
  label,
  value,
  align,
  highlight,
}: {
  label: string;
  value: string;
  align?: "left" | "right";
  highlight?: boolean;
}) {
  return (
    <Box sx={{ textAlign: align ?? "left" }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", fontSize: "0.62rem", letterSpacing: "0.04em" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: highlight ? 800 : 600,
          color: highlight ? "secondary.main" : "text.primary",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

function ControlsRow({
  quantity,
  onQuantityChange,
  onRemove,
}: {
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.75,
        pt: 0.5,
        borderTop: "1px dashed",
        borderColor: "divider",
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.65rem" }}
      >
        QUANTITY
      </Typography>
      <CartQuantityControls
        quantity={quantity}
        onChange={onQuantityChange}
        onRemove={onRemove}
        fullWidth
      />
    </Box>
  );
}

function SrBadge({ sr }: { sr: number }) {
  return (
    <Box
      sx={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        flexShrink: 0,
        background: "linear-gradient(135deg, #E8D48B, #C9A227)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: "0.72rem",
        color: "#0A1628",
      }}
    >
      {sr}
    </Box>
  );
}
