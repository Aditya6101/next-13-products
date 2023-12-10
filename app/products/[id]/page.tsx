import { getProductUrl } from "@/lib/constants";
import { Product } from "@/types/Product";
import Image from "next/image";

async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${getProductUrl(id)}`);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return data;
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(params.id);

  return (
    <div className="p-6 ">
      <div className="relative flex w-full h-[50vh] rounded bg-slate-300">
        <Image
          className="rounded"
          src={product.thumbnail}
          alt={product.title}
          fill
        />
      </div>

      <div className="flex items-start justify-between py-4">
        <div>
          <h3 className="text-2xl font-semibold text-slate-600">
            {product.title}
          </h3>
          <h4 className="pt-1 text-base text-slate-400">
            {product.description}
          </h4>
          <p className="pt-3 text-sm font-medium text-slate-400">
            From{" "}
            <span className="underline text-slate-600">{product.brand}</span>
          </p>
        </div>

        <h2 className="px-3 py-1 text-base font-medium rounded-3xl text-slate-100 bg-slate-700">
          ${product.price}
        </h2>
      </div>
    </div>
  );
}

// {
//     "id": 1,
//     "title": "iPhone 9",
//     "description": "An apple mobile which is nothing like apple",
//     "price": 549,
//     "discountPercentage": 12.96,
//     "rating": 4.69,
//     "stock": 94,
//     "brand": "Apple",
//     "category": "smartphones",
//     "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
//     "images": [
//         "https://i.dummyjson.com/data/products/1/1.jpg",
//         "https://i.dummyjson.com/data/products/1/2.jpg",
//         "https://i.dummyjson.com/data/products/1/3.jpg",
//         "https://i.dummyjson.com/data/products/1/4.jpg",
//         "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
//     ]
// }
