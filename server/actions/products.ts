"use server";

export async function fetchProducts({
  limit,
  offset: offsite,
}: {
  limit: number;
  offset: number;
}) {
  const res = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${offsite * limit}`
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  let { products, total } = await res.json();

  return { products, total };
}
