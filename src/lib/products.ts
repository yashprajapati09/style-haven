import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Women" | "Men" | "Accessories";
  isNew: boolean;
  colors: string[];
  sizes: string[];
  description: string;
  details: string[];
};

export const products: Product[] = [
  {
    id: "cocoon-wool-coat",
    name: "Cocoon Wool Coat",
    price: 189,
    image: p1,
    category: "Women",
    isNew: true,
    colors: ["Cream", "Camel"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "An oversized single-breasted coat cut from a soft wool blend with a relaxed cocoon silhouette and dropped shoulders.",
    details: ["62% wool, 38% recycled polyester", "Notch lapel, front buttons", "Dry clean only"],
  },
  {
    id: "ribbed-knit-sweater",
    name: "Ribbed Knit Sweater",
    price: 49,
    image: p2,
    category: "Men",
    isNew: true,
    colors: ["Black", "Ecru"],
    sizes: ["S", "M", "L", "XL"],
    description:
      "A heavy-gauge ribbed sweater with a mock neck and straight hem. Warm, dense and made to layer.",
    details: ["100% organic cotton", "Regular fit", "Machine wash cold"],
  },
  {
    id: "straight-leg-denim",
    name: "Straight Leg Denim",
    price: 59,
    image: p3,
    category: "Women",
    isNew: false,
    colors: ["Light Blue", "Indigo"],
    sizes: ["24", "26", "28", "30", "32"],
    description:
      "High-waisted jeans in rigid cotton denim with a clean straight leg and a light vintage wash.",
    details: ["100% cotton denim", "High rise, straight leg", "Machine wash cold"],
  },
  {
    id: "olive-slip-dress",
    name: "Olive Slip Dress",
    price: 69,
    image: p4,
    category: "Women",
    isNew: true,
    colors: ["Olive", "Black"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "A fluid bias-cut midi dress with adjustable straps and a scooped neckline. Effortless on its own or layered.",
    details: ["100% LENZING ECOVERO viscose", "Bias cut, midi length", "Hand wash"],
  },
  {
    id: "leather-court-sneaker",
    name: "Leather Court Sneaker",
    price: 89,
    image: p5,
    category: "Men",
    isNew: false,
    colors: ["White"],
    sizes: ["40", "41", "42", "43", "44", "45"],
    description:
      "A pared-back low-top sneaker in smooth leather with a slim rubber cupsole and tonal stitching.",
    details: ["Leather upper", "Rubber outsole", "Wipe clean"],
  },
  {
    id: "tan-shoulder-bag",
    name: "Tan Shoulder Bag",
    price: 79,
    image: p6,
    category: "Accessories",
    isNew: true,
    colors: ["Tan"],
    sizes: ["One size"],
    description:
      "A soft slouchy shoulder bag in grained leather with an adjustable strap and a roomy lined interior.",
    details: ["Grained leather", "Adjustable strap", "Interior slip pocket"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
