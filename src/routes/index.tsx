import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import banner from "@/assets/banner-arrivals.jpg";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier — Modern Wardrobe Essentials" },
      {
        name: "description",
        content:
          "Shop the new arrivals edit at Atelier: coats, knitwear, denim and accessories with free delivery over $75.",
      },
      { property: "og:title", content: "Atelier — Modern Wardrobe Essentials" },
      {
        property: "og:description",
        content: "Coats, knitwear, denim and accessories. New season edit now online.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div>
      <section className="relative">
        <img
          src={hero}
          alt="Model wearing an oversized cream trench coat"
          width={1600}
          height={1200}
          className="h-[70vh] min-h-[420px] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-5">
            <div className="max-w-md">
              <p className="eyebrow">Autumn / Winter</p>
              <h1 className="mt-3 text-5xl leading-[1.05] sm:text-6xl">
                The quiet
                <br />
                edit
              </h1>
              <p className="mt-4 max-w-sm text-sm text-foreground/80">
                Soft tailoring, dense knits and clean denim — built to be worn for years, not
                seasons.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/shop" className="btn-solid">
                  Shop the edit
                </Link>
                <Link to="/shop" search={{ category: "New" }} className="btn-outline">
                  New arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Just landed</p>
            <h2 className="mt-2 text-3xl">New Arrivals</h2>
          </div>
          <Link to="/shop" className="text-xs uppercase tracking-[0.16em] hover:text-accent">
            View all
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5">
        <Link to="/shop" search={{ category: "New" }} className="block overflow-hidden">
          <img
            src={banner}
            alt="New arrivals campaign banner"
            loading="lazy"
            width={1600}
            height={704}
            className="w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </Link>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 sm:grid-cols-3">
        {[
          { title: "Free delivery over $75", copy: "2–4 working days, tracked door to door." },
          { title: "Track every order", copy: "Live delivery status from packed to delivered." },
          { title: "30-day returns", copy: "Free returns in store or by prepaid label." },
        ].map((f) => (
          <div key={f.title} className="border border-border bg-card p-6">
            <h3 className="text-lg">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.copy}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
