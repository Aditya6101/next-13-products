import type { Product } from "@/types/Product";
import ProductItem from "./ProductItem";
import LoadModeProducts from "./LoadMoreProducts";

export default function ProductList({
  productsList,
}: {
  productsList: Product[];
}) {
  return (
    <div className="grid grid-cols-1 gap-12 p-5 pt-0 lg:grid-cols-4 md:grid-cols-3">
      {productsList.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}

      <LoadModeProducts />
    </div>
  );
}
