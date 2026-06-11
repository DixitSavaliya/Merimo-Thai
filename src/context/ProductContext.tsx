"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/layout/LoadingScreen";
import {
  DEFAULT_KIT_PRICING,
  DEFAULT_PRODUCTS,
} from "@/data/defaultProducts";
import type {
  KitPricing,
  PriceOverrides,
  PricingMode,
  Product,
} from "@/types";

const PRICE_STORAGE_KEY = "merimo-product-data";
const CART_STORAGE_KEY = "merimo-cart-session";

interface SessionCart {
  quantities: Record<string, number>;
  pricingMode: PricingMode;
}

interface ProductContextValue {
  products: Product[];
  kitPricing: KitPricing;
  pricingMode: PricingMode;
  quantities: Record<string, number>;
  cartItemCount: number;
  setPricingMode: (mode: PricingMode) => void;
  setQuantity: (productId: string, quantity: number) => void;
  addCompleteKit: () => void;
  clearCart: () => void;
  updateProductPrice: (
    productId: string,
    field: "wholesalePrice" | "retailPrice",
    value: number,
  ) => void;
  updateKitPrice: (
    field: "wholesaleKitPrice" | "retailKitPrice",
    value: number,
  ) => void;
  resetToDefaults: () => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

function applyOverrides(
  products: Product[],
  kit: KitPricing,
  overrides: PriceOverrides | null,
): { products: Product[]; kit: KitPricing } {
  if (!overrides) return { products, kit };

  const mergedProducts = products.map((p) => {
    const o = overrides.products[p.id];
    if (!o) return p;
    return {
      ...p,
      wholesalePrice: o.wholesalePrice ?? p.wholesalePrice,
      retailPrice: o.retailPrice ?? p.retailPrice,
    };
  });

  const mergedKit = {
    wholesaleKitPrice:
      overrides.kit?.wholesaleKitPrice ?? kit.wholesaleKitPrice,
    retailKitPrice: overrides.kit?.retailKitPrice ?? kit.retailKitPrice,
  };

  return { products: mergedProducts, kit: mergedKit };
}

function buildOverrides(
  products: Product[],
  kit: KitPricing,
): PriceOverrides {
  const productOverrides: PriceOverrides["products"] = {};
  for (const p of products) {
    const defaultP = DEFAULT_PRODUCTS.find((d) => d.id === p.id);
    if (!defaultP) continue;
    const changes: { wholesalePrice?: number; retailPrice?: number } = {};
    if (p.wholesalePrice !== defaultP.wholesalePrice) {
      changes.wholesalePrice = p.wholesalePrice;
    }
    if (p.retailPrice !== defaultP.retailPrice) {
      changes.retailPrice = p.retailPrice;
    }
    if (Object.keys(changes).length > 0) {
      productOverrides[p.id] = changes;
    }
  }

  const kitOverride: PriceOverrides["kit"] = {};
  if (kit.wholesaleKitPrice !== DEFAULT_KIT_PRICING.wholesaleKitPrice) {
    kitOverride.wholesaleKitPrice = kit.wholesaleKitPrice;
  }
  if (kit.retailKitPrice !== DEFAULT_KIT_PRICING.retailKitPrice) {
    kitOverride.retailKitPrice = kit.retailKitPrice;
  }

  return {
    products: productOverrides,
    kit: Object.keys(kitOverride).length > 0 ? kitOverride : undefined,
  };
}

function isPageReload(): boolean {
  if (typeof window === "undefined") return true;
  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;
  return nav?.type === "reload";
}

function readSessionCart(): SessionCart | null {
  try {
    const raw = sessionStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SessionCart;
  } catch {
    return null;
  }
}

function writeSessionCart(quantities: Record<string, number>, mode: PricingMode) {
  const hasItems = Object.values(quantities).some((q) => q > 0);
  if (!hasItems) {
    sessionStorage.removeItem(CART_STORAGE_KEY);
    return;
  }
  const payload: SessionCart = { quantities, pricingMode: mode };
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(payload));
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [kitPricing, setKitPricing] =
    useState<KitPricing>(DEFAULT_KIT_PRICING);
  const [pricingMode, setPricingModeState] = useState<PricingMode>("retail");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PRICE_STORAGE_KEY);
      if (stored) {
        const overrides: PriceOverrides = JSON.parse(stored);
        const merged = applyOverrides(
          DEFAULT_PRODUCTS,
          DEFAULT_KIT_PRICING,
          overrides,
        );
        setProducts(merged.products);
        setKitPricing(merged.kit);
      }
    } catch {
      // ignore corrupt storage
    }

    if (!isPageReload()) {
      const sessionCart = readSessionCart();
      if (sessionCart) {
        setQuantities(sessionCart.quantities);
        setPricingModeState(sessionCart.pricingMode);
      }
    } else {
      sessionStorage.removeItem(CART_STORAGE_KEY);
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeSessionCart(quantities, pricingMode);
  }, [quantities, pricingMode, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (prevPathRef.current && prevPathRef.current !== pathname) {
      setQuantities({});
      sessionStorage.removeItem(CART_STORAGE_KEY);
    }
    prevPathRef.current = pathname;
  }, [pathname, hydrated]);

  const persist = useCallback(
    (nextProducts: Product[], nextKit: KitPricing) => {
      const overrides = buildOverrides(nextProducts, nextKit);
      const hasChanges =
        Object.keys(overrides.products).length > 0 || overrides.kit;
      if (hasChanges) {
        localStorage.setItem(PRICE_STORAGE_KEY, JSON.stringify(overrides));
      } else {
        localStorage.removeItem(PRICE_STORAGE_KEY);
      }
    },
    [],
  );

  const clearCart = useCallback(() => {
    setQuantities({});
    sessionStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const setPricingMode = useCallback(
    (mode: PricingMode) => {
      if (mode === pricingMode) return;
      const hasItems = Object.values(quantities).some((q) => q > 0);
      if (hasItems) {
        const confirmed = window.confirm(
          "Switching pricing type will clear your current order. Continue?",
        );
        if (!confirmed) return;
      }
      clearCart();
      setPricingModeState(mode);
    },
    [pricingMode, quantities, clearCart],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const safeQty = Math.max(0, Math.min(999, Math.floor(quantity) || 0));
    setQuantities((prev) => ({
      ...prev,
      [productId]: safeQty,
    }));
  }, []);

  const addCompleteKit = useCallback(() => {
    setQuantities((prev) => {
      const next = { ...prev };
      for (const p of products) {
        next[p.id] = (prev[p.id] ?? 0) + 1;
      }
      return next;
    });
  }, [products]);

  const updateProductPrice = useCallback(
    (
      productId: string,
      field: "wholesalePrice" | "retailPrice",
      value: number,
    ) => {
      setProducts((prev) => {
        const next = prev.map((p) =>
          p.id === productId ? { ...p, [field]: Math.max(0, value) } : p,
        );
        setKitPricing((kit) => {
          persist(next, kit);
          return kit;
        });
        return next;
      });
    },
    [persist],
  );

  const updateKitPrice = useCallback(
    (field: "wholesaleKitPrice" | "retailKitPrice", value: number) => {
      setKitPricing((prev) => {
        const next = { ...prev, [field]: Math.max(0, value) };
        setProducts((prods) => {
          persist(prods, next);
          return prods;
        });
        return next;
      });
    },
    [persist],
  );

  const resetToDefaults = useCallback(() => {
    setProducts(DEFAULT_PRODUCTS);
    setKitPricing(DEFAULT_KIT_PRICING);
    clearCart();
    localStorage.removeItem(PRICE_STORAGE_KEY);
  }, [clearCart]);

  const cartItemCount = useMemo(
    () => Object.values(quantities).reduce((sum, q) => sum + q, 0),
    [quantities],
  );

  const value = useMemo(
    () => ({
      products,
      kitPricing,
      pricingMode,
      quantities,
      cartItemCount,
      setPricingMode,
      setQuantity,
      addCompleteKit,
      clearCart,
      updateProductPrice,
      updateKitPrice,
      resetToDefaults,
    }),
    [
      products,
      kitPricing,
      pricingMode,
      quantities,
      cartItemCount,
      setPricingMode,
      setQuantity,
      addCompleteKit,
      clearCart,
      updateProductPrice,
      updateKitPrice,
      resetToDefaults,
    ],
  );

  if (!hydrated) return <LoadingScreen />;

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return ctx;
}
