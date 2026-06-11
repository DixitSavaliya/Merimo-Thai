"use client";

import { ProductProvider } from "@/context/ProductContext";
import ThemeRegistry from "@/components/ThemeRegistry";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeRegistry>
      <ProductProvider>{children}</ProductProvider>
    </ThemeRegistry>
  );
}
