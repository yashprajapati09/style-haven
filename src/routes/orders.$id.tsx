import { createFileRoute, Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/products";
import { ORDER_STATUSES, useStore } from "@/lib/store";

export const Route = createFileRoute("/orders/$id")({
  head: () => ({
    meta: [
      { title: "Order Details & Tracking — Atelier" },
      {
        name: "description",
        content: "View your Atelier order details, delivery address and live tracking status.",
      },
      { property: "og:title", content: "Order Details & Tracking — Atelier" },
      { property: "og:description", content: "Follow your Atelier delivery step by step." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderDetail,
});

function OrderDetail() {
  const { id } = Route.useParams();
  const { orders, advanceOrder } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="text-3xl">Order not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          We couldn't find order {id} on this device.
        </p>
        <Link to="/orders" className="btn-solid mt-6">
          Back to orders
        </Link>
      </div>
    );
  }

  const stepIndex = ORDER_STATUSES.indexOf(order.status);

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <nav className="eyebrow mb-6">
        <Link to="/orders" className="hover:text-accent">
          Orders
        </Link>{" "}
        / {order.id}
      </nav>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl">Order {order.id}</h1>
          <p className="eyebrow mt-2">
            Placed {new Date(order.createdAt).toLocaleDateString()} · Tracking {order.tracking}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Estimated delivery{" "}
          <span className="text-foreground">
            {new Date(order.eta).toLocaleDateString(undefined, {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </span>
        </p>
      </div>

      <section className="mt-10 border border-border bg-card p-6">
        <h2 className="text-xl">Delivery status</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-5">
          {ORDER_STATUSES.map((s, idx) => {
            const done = idx <= stepIndex;
            return (
              <li key={s} className="relative">
                <div
                  className={`h-1 w-full ${done ? "bg-accent" : "bg-border"}`}
                  aria-hidden="true"
                />
                <p className={`mt-3 text-sm ${done ? "text-foreground" : "text-muted-foreground"}`}>
                  {s}
                </p>
                {idx === stepIndex && <p className="eyebrow mt-1 text-accent">Current</p>}
              </li>
            );
          })}
        </ol>
        {order.status !== "Delivered" && (
          <button className="btn-outline mt-8" onClick={() => advanceOrder(order.id)}>
            Refresh tracking
          </button>
        )}
      </section>

      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
        <section>
          <h2 className="text-xl">Items</h2>
          <ul className="mt-4 divide-y divide-border border-y border-border">
            {order.items.map((i) => (
              <li key={i.id} className="flex gap-4 py-5">
                <img
                  src={i.image}
                  alt={i.name}
                  loading="lazy"
                  width={900}
                  height={1200}
                  className="h-28 w-20 bg-sand object-cover"
                />
                <div className="flex flex-1 justify-between">
                  <div>
                    <Link
                      to="/product/$id"
                      params={{ id: i.productId }}
                      className="hover:text-accent"
                    >
                      {i.name}
                    </Link>
                    <p className="eyebrow mt-1">
                      {i.color} · Size {i.size} · Qty {i.qty}
                    </p>
                  </div>
                  <span className="text-sm">{formatPrice(i.price * i.qty)}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="h-fit space-y-6 border border-border bg-card p-6">
          <div>
            <h2 className="text-lg">Delivery address</h2>
            <address className="mt-2 text-sm not-italic text-muted-foreground">
              {order.customer.name}
              <br />
              {order.customer.address}
              <br />
              {order.customer.city} {order.customer.zip}
              <br />
              {order.customer.email}
            </address>
          </div>
          <dl className="space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
