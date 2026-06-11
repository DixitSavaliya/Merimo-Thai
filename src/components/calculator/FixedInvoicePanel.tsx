"use client";

import Box from "@mui/material/Box";
import InvoiceSummary from "./InvoiceSummary";

const HEADER_OFFSET = 80;

export default function FixedInvoicePanel() {
  return (
    <Box
      id="order-invoice"
      sx={{
        width: { xs: "100%", lg: "44%" },
        minWidth: { lg: 400 },
        maxWidth: { lg: 540 },
        flexShrink: 0,
        position: { lg: "sticky" },
        top: { lg: HEADER_OFFSET },
        alignSelf: { lg: "flex-start" },
        // Desktop: cap height so inner grid can scroll cart + pin footer
        height: { lg: `calc(100vh - ${HEADER_OFFSET + 24}px)` },
        maxHeight: { lg: `calc(100vh - ${HEADER_OFFSET + 24}px)` },
        minHeight: { lg: 480 },
        display: { lg: "flex" },
        flexDirection: { lg: "column" },
        overflow: { lg: "hidden" },
      }}
    >
      <InvoiceSummary />
    </Box>
  );
}
