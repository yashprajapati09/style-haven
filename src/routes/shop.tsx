import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Category = "All" | "New" | "Women" | "Men" | "Accessories";
const categories: Category[] = ["All", "New", "Women", "Men", "Accessories"];

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): { category: Category } => ({
    category: (categories.includes(search["category"] as Category)
      ? search["category"]
      : "All") as Category,
  }),
  head: () => ({
    meta: [
      { title: "Shop All — Atelier" },
      {
        name: "description",
        content:
          "Browse coats, knitwear, denim, dresses and accessories from the Atelier collection.",
      },
      { property: "og:title", content: "Shop All — Atelier" },
      {
        property: "og:description",
        content: "Browse the full Atelier collection for women and men.",
      },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category } = Route.useSearch();
  const list = products.filter((p) =>
    category === "All" ? true : category === "New" ? p.isNew : p.category === category,
  );

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <p className="eyebrow">Collection</p>
      <h1 className="mt-2 text-4xl">{category === "All" ? "Shop all" : category}</h1>

      <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-6">
        {categories.map((c) => (
          <Link
            key={c}
            to="/shop"
            search={{ category: c }}
            className={`border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
              c === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">{list.length} items</p>
      <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
