import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product not found — Atelier" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Atelier` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Atelier` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart } = useStore();
  const [size, setSize] = useState(product.sizes[0]!);
  const [color, setColor] = useState(product.colors[0]!);

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10">
      <nav className="eyebrow mb-6">
        <Link to="/shop" className="hover:text-accent">
          Shop
        </Link>{" "}
        / {product.name}
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <img
          src={product.image}
          alt={product.name}
          width={900}
          height={1200}
          className="w-full bg-sand object-cover"
        />

        <div className="md:pt-6">
          {product.isNew && <p className="eyebrow text-accent">New arrival</p>}
          <h1 className="mt-2 text-4xl">{product.name}</h1>
          <p className="mt-3 text-xl">{formatPrice(product.price)}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-8">
            <p className="eyebrow">Colour — {color}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                    c === color ? "border-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="eyebrow">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-14 border px-4 py-2 text-xs uppercase tracking-[0.12em] ${
                    s === size ? "border-primary" : "border-border text-muted-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-solid mt-8 w-full sm:w-auto"
            onClick={() => {
              addToCart(product, size, color);
              toast.success(`${product.name} added to bag`, { description: `${color} · ${size}` });
            }}
          >
            Add to bag
          </button>

          <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
            {product.details.map((d) => (
              <li key={d}>— {d}</li>
            ))}
            <li>— Free delivery on orders over $75, 2–4 working days</li>
          </ul>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-2xl">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
