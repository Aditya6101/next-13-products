/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/types/Product";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div key={product.id} className="p-3 rounded shadow">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-48 rounded"
        />
        <div className="mt-4 space-y-3">
          <h3 className="flex justify-between text-lg font-bold text-neutral-800">
            {product.title}
            <span>${product.price}</span>
          </h3>
          <Badge
            variant="outline"
            className="mt-3 text-sm font-normal capitalize bg-slate-100 text-slate-500"
          >
            {product.category}
          </Badge>
          <p className="text-sm font-normal leading-6 text-neutral-600 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
