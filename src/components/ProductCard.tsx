import { Link } from "@tanstack/react-router";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
      aria-label={product.name}
    >
      <div className="relative overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={900}
          height={1200}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isNew && (
          <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground">
            New
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="text-base">{product.name}</h3>
          <p className="eyebrow mt-1">{product.category}</p>
        </div>
        <span className="text-sm">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}
