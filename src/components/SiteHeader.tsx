import { Link } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/shop", label: "New Arrivals", search: { category: "New" as const } },
  { to: "/orders", label: "Orders" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const { count } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <p className="bg-primary py-2 text-center text-[11px] uppercase tracking-[0.22em] text-primary-foreground">
        Free delivery on orders over $75
      </p>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4">
        <Link to="/" className="font-display text-2xl tracking-[0.18em] uppercase">
          Atelier
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              search={item.search as never}
              className="text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/cart"
          className="text-xs uppercase tracking-[0.16em] transition-colors hover:text-accent"
        >
          Cart ({count})
        </Link>
      </div>
      <nav className="flex items-center justify-center gap-6 border-t border-border py-2.5 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            search={item.search as never}
            className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
