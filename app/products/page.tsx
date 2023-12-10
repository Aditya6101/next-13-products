import ProductList from "@/components/Product/ProductList";
import Search from "@/components/Search";
import { productsUrl, searchProductUrl } from "@/lib/constants";
import { fetchProducts } from "@/server/actions/products";
import type { Product } from "@/types/Product";

async function getProducts(search = "") {
  const { products } = await fetchProducts({ limit: 10, offset: 0 });

  if (search) {
    const url = search ? `${searchProductUrl}${search}` : productsUrl;
    const res = await fetch(url);
    const data = await res.json();

    return data.products;
  }

  return products;
}

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

      <ProductList productsList={products} />
    </>
  );
}
