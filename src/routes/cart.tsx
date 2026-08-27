import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Bag — Atelier" },
      { name: "description", content: "Review the items in your Atelier shopping bag." },
      { property: "og:title", content: "Shopping Bag — Atelier" },
      { property: "og:description", content: "Review your bag and continue to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeItem, subtotal } = useStore();
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-4xl">Shopping bag</h1>

      {cart.length === 0 ? (
        <div className="mt-10 border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">Your bag is empty.</p>
          <Link to="/shop" className="btn-solid mt-6">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border border-y border-border">
            {cart.map((item) => (
              <li key={item.id} className="flex gap-5 py-6">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="h-36 w-28 bg-sand object-cover"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-4">
                    <div>
                      <Link
                        to="/product/$id"
                        params={{ id: item.productId }}
                        className="text-lg hover:text-accent"
                      >
                        {item.name}
                      </Link>
                      <p className="eyebrow mt-1">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <span className="text-sm">{formatPrice(item.price * item.qty)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-border">
                      <button
                        aria-label="Decrease quantity"
                        className="px-3 py-1.5"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                      >
                        −
                      </button>
                      <span className="min-w-8 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        className="px-3 py-1.5"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-border bg-card p-6">
            <h2 className="text-xl">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-base">
                <dt>Total</dt>
                <dd>{formatPrice(subtotal + shipping)}</dd>
              </div>
            </dl>
            <Link to="/checkout" className="btn-solid mt-6 w-full">
              Continue to checkout
            </Link>
            <p className="mt-4 text-xs text-muted-foreground">
              Free delivery on orders over $75. 30-day returns.
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
