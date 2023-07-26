/* eslint-disable @next/next/no-img-element */
import Search from "@/components/Search";
import { Badge } from "@/components/ui/badge";
import { productsUrl, searchProductUrl } from "@/lib/constants";
import { Suspense } from "react";

async function getProducts(search = "") {
  const url = search ? `${searchProductUrl}${search}` : productsUrl;
  const res = await fetch(url);
  const data = await res.json();

  return data.products;
}

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const products: Product[] = await getProducts(search);

  return (
    <>
      <div className="flex justify-start max-w-sm p-5">
        <Search />
      </div>

      <div className="grid grid-cols-1 gap-12 p-5 pt-0 lg:grid-cols-4 md:grid-cols-3">
        {products.map((product) => (
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
        ))}
      </div>
    </>
  );
}
