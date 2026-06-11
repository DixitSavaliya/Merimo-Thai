"use client";

import Box from "@mui/material/Box";
import InvoiceSummary from "./InvoiceSummary";

const HEADER_OFFSET = 88;

export default function FixedInvoicePanel() {
  return (
    <Box
      id="order-invoice"
      sx={{
        width: { xs: "100%", lg: 380 },
        flexShrink: 0,
        position: { lg: "sticky" },
        top: { lg: HEADER_OFFSET },
        alignSelf: { lg: "flex-start" },
        maxHeight: { lg: `calc(100vh - ${HEADER_OFFSET + 24}px)` },
        overflowY: { lg: "auto" },
        overflowX: "hidden",
        zIndex: 10,
        scrollbarWidth: "thin",
        scrollbarColor: "#C9A227 transparent",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#C9A227",
          borderRadius: 3,
        },
      }}
    >
      <InvoiceSummary />
    </Box>
  );
}
