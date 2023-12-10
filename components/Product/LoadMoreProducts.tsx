"use client";

import useInView from "@/lib/hooks/useInView";
import { fetchProducts } from "@/server/actions/products";
import type { ProductsType } from "@/types/Product";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import ProductList from "./ProductList";
import ProductItem from "./ProductItem";

export default function LoadModeProducts() {
  let [productsData, setProductsData] = useState<ProductsType>({
    products: [],
    total: null,
  });
  let loaderRef = useRef<null | HTMLDivElement>(null);

  let { isInView } = useInView(loaderRef);

  let offset = (productsData.products.length + 20) / 10;
  let remainder = (productsData.total as number) % 2;

  useEffect(() => {
    if (!isInView) return;

    fetchProducts({
      limit: 10,
      offset,
    }).then(({ products, total }) => {
      setProductsData((prev) => ({
        total,
        products: [...prev.products, ...products],
      }));
    });

    return () => {};
  }, [isInView]);

  return (
    <>
      {productsData.products &&
        productsData.products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}

      {productsData.products.length - remainder !==
      (productsData.total as number) - 20 ? (
        <div
          className="flex items-center justify-center w-full gap-2 py-4"
          ref={loaderRef}
        >
          Loading products... <Loader />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
