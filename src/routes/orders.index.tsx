import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/orders/")({
  head: () => ({
    meta: [
      { title: "My Orders & Delivery Status — Atelier" },
      {
        name: "description",
        content: "See your Atelier order history and track delivery status from packed to arrival.",
      },
      { property: "og:title", content: "My Orders & Delivery Status — Atelier" },
      { property: "og:description", content: "Track your Atelier deliveries in one place." },
    ],
  }),
  component: Orders,
});

function Orders() {
  const { orders } = useStore();

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <p className="eyebrow">Your account</p>
      <h1 className="mt-2 text-4xl">Orders</h1>

      {orders.length === 0 ? (
        <div className="mt-10 border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          <Link to="/shop" className="btn-solid mt-6">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lg">Order {o.id}</p>
                  <p className="eyebrow mt-1">
                    {new Date(o.createdAt).toLocaleDateString()} ·{" "}
                    {o.items.reduce((n, i) => n + i.qty, 0)} items · {formatPrice(o.total)}
                  </p>
                </div>
                <span className="border border-accent px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-accent">
                  {o.status}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex -space-x-3">
                  {o.items.slice(0, 4).map((i) => (
                    <img
                      key={i.id}
                      src={i.image}
                      alt={i.name}
                      loading="lazy"
                      width={900}
                      height={1200}
                      className="h-16 w-12 border border-background bg-sand object-cover"
                    />
                  ))}
                </div>
                <Link
                  to="/orders/$id"
                  params={{ id: o.id }}
                  className="text-xs uppercase tracking-[0.14em] hover:text-accent"
                >
                  View details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
