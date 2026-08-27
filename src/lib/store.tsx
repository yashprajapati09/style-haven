import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "./products";

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
};

export type OrderStatus = "Placed" | "Packed" | "Shipped" | "Out for delivery" | "Delivered";

export const ORDER_STATUSES: OrderStatus[] = [
  "Placed",
  "Packed",
  "Shipped",
  "Out for delivery",
  "Delivered",
];

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  customer: { name: string; email: string; address: string; city: string; zip: string };
  tracking: string;
  eta: string;
};

type StoreValue = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  count: number;
  placeOrder: (customer: Order["customer"]) => Order;
  advanceOrder: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

const CART_KEY = "atelier.cart";
const ORDERS_KEY = "atelier.orders";

function seedOrder(): Order {
  const p = products[1]!;
  const created = new Date(Date.now() - 1000 * 60 * 60 * 48);
  return {
    id: "ATL-100482",
    createdAt: created.toISOString(),
    items: [
      {
        id: "seed-1",
        productId: p.id,
        name: p.name,
        price: p.price,
        image: p.image,
        size: "M",
        color: p.colors[0]!,
        qty: 1,
      },
    ],
    subtotal: p.price,
    shipping: 0,
    total: p.price,
    status: "Shipped",
    customer: {
      name: "Sample Customer",
      email: "sample@atelier.com",
      address: "18 Kingsland Road",
      city: "London",
      zip: "E2 8AA",
    },
    tracking: "AT9938201746SE",
    eta: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
  };
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      if (c) setCart(JSON.parse(c));
      const o = localStorage.getItem(ORDERS_KEY);
      setOrders(o ? JSON.parse(o) : [seedOrder()]);
    } catch {
      setOrders([seedOrder()]);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  const value = useMemo<StoreValue>(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    return {
      cart,
      orders,
      subtotal,
      count: cart.reduce((sum, i) => sum + i.qty, 0),
      addToCart: (product, size, color, qty = 1) =>
        setCart((prev) => {
          const key = `${product.id}-${size}-${color}`;
          const existing = prev.find((i) => i.id === key);
          if (existing)
            return prev.map((i) => (i.id === key ? { ...i, qty: i.qty + qty } : i));
          return [
            ...prev,
            {
              id: key,
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              size,
              color,
              qty,
            },
          ];
        }),
      updateQty: (id, qty) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((i) => i.id !== id)
            : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
        ),
      removeItem: (id) => setCart((prev) => prev.filter((i) => i.id !== id)),
      clearCart: () => setCart([]),
      placeOrder: (customer) => {
        const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6;
        const order: Order = {
          id: `ATL-${Math.floor(100000 + Math.random() * 899999)}`,
          createdAt: new Date().toISOString(),
          items: cart,
          subtotal,
          shipping,
          total: subtotal + shipping,
          status: "Placed",
          customer,
          tracking: `AT${Math.floor(1000000000 + Math.random() * 8999999999)}SE`,
          eta: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
        };
        setOrders((prev) => [order, ...prev]);
        setCart([]);
        return order;
      },
      advanceOrder: (id) =>
        setOrders((prev) =>
          prev.map((o) => {
            if (o.id !== id) return o;
            const next = ORDER_STATUSES[Math.min(ORDER_STATUSES.indexOf(o.status) + 1, 4)]!;
            return { ...o, status: next };
          }),
        ),
    };
  }, [cart, orders]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
