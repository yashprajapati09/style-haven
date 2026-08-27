import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Atelier" },
      { name: "description", content: "Enter your delivery details and place your Atelier order." },
      { property: "og:title", content: "Checkout — Atelier" },
      { property: "og:description", content: "Complete your Atelier order securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { cart, subtotal, placeOrder } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "" });
  const shipping = subtotal >= 75 || subtotal === 0 ? 0 : 6;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl">Your bag is empty</h1>
        <Link to="/shop" className="btn-solid mt-6">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <h1 className="text-4xl">Checkout</h1>
      <form
        className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]"
        onSubmit={(e) => {
          e.preventDefault();
          const order = placeOrder(form);
          toast.success("Order placed", { description: `Order ${order.id} confirmed` });
          navigate({ to: "/orders/$id", params: { id: order.id } });
        }}
      >
        <div className="space-y-8">
          <fieldset>
            <legend className="eyebrow">Contact</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Full name"
                className="field"
                value={form.name}
                onChange={set("name")}
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="field"
                value={form.email}
                onChange={set("email")}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Delivery address</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Street address"
                className="field sm:col-span-2"
                value={form.address}
                onChange={set("address")}
              />
              <input
                required
                placeholder="City"
                className="field"
                value={form.city}
                onChange={set("city")}
              />
              <input
                required
                placeholder="Postcode"
                className="field"
                value={form.zip}
                onChange={set("zip")}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow">Payment</legend>
            <p className="mt-4 border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
              This is a demo store — no payment is taken and no card details are collected.
            </p>
          </fieldset>
        </div>

        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-xl">Your order</h2>
          <ul className="mt-5 space-y-4">
            {cart.map((i) => (
              <li key={i.id} className="flex justify-between gap-3 text-sm">
                <span className="text-muted-foreground">
                  {i.name} × {i.qty}
                  <br />
                  <span className="eyebrow">
                    {i.color} · {i.size}
                  </span>
                </span>
                <span>{formatPrice(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-border pt-4 text-sm">
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
          <button type="submit" className="btn-solid mt-6 w-full">
            Place order
          </button>
        </aside>
      </form>
    </div>
  );
}
