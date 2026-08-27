import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-sand">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl uppercase tracking-[0.18em]">Atelier</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Considered wardrobe essentials, made in small runs with responsible materials.
          </p>
        </div>
        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/shop" className="hover:text-accent">
                All products
              </Link>
            </li>
            <li>
              <Link to="/shop" search={{ category: "New" }} className="hover:text-accent">
                New arrivals
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-accent">
                Shopping bag
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Help</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/orders" className="hover:text-accent">
                Track my order
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-accent">
                About us
              </Link>
            </li>
            <li>Delivery &amp; returns</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Newsletter</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Early access to drops and the seasonal edit.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <input type="email" required placeholder="Email address" className="field" />
            <button type="submit" className="btn-solid px-4">
              Join
            </button>
          </form>
        </div>
      </div>
      <p className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Atelier. Demo store for showcase purposes.
      </p>
    </footer>
  );
}
