import { createFileRoute, Link } from "@tanstack/react-router";
import banner from "@/assets/banner-arrivals.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Atelier — Our Story & Values" },
      {
        name: "description",
        content:
          "Atelier makes considered wardrobe essentials in small runs with responsible materials and fair partner factories.",
      },
      { property: "og:title", content: "About Atelier — Our Story & Values" },
      {
        property: "og:description",
        content: "How Atelier designs, sources and makes its collections.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="eyebrow">Our story</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Clothes made to stay</h1>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Atelier started in 2016 with a single wool coat and a stubborn idea: that a wardrobe
          should be small, considered and built to last. We design in Copenhagen, produce in small
          runs with long-term partner factories in Portugal and Italy, and keep our range tight on
          purpose.
        </p>
      </div>

      <img
        src={banner}
        alt="Atelier autumn campaign"
        loading="lazy"
        width={1600}
        height={704}
        className="mx-auto w-full max-w-7xl px-5 object-cover"
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-3">
        {[
          {
            t: "Responsible materials",
            c: "84% of our collection uses organic, recycled or certified fibres — and we publish the number every season.",
          },
          {
            t: "Fair partner factories",
            c: "We work with eleven factories, most for over five years, all audited annually for pay and conditions.",
          },
          {
            t: "Made in small runs",
            c: "Smaller drops mean less waste, tighter quality control and pieces that don't end up discounted.",
          },
        ].map((b) => (
          <div key={b.t} className="border border-border bg-card p-7">
            <h2 className="text-xl">{b.t}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{b.c}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-8">
        <div className="grid gap-6 border border-border bg-sand p-10 sm:grid-cols-4">
          {[
            ["2016", "Founded in Copenhagen"],
            ["11", "Partner factories"],
            ["84%", "Preferred materials"],
            ["30 days", "Free returns"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-display text-3xl">{k}</p>
              <p className="eyebrow mt-2">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 pb-8 text-center">
        <h2 className="text-2xl">Questions about an order?</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Track deliveries and view order details in your account, or email hello@atelier.com.
        </p>
        <Link to="/orders" className="btn-outline mt-6">
          Track my order
        </Link>
      </div>
    </div>
  );
}
