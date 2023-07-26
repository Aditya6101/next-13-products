"use client";

import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

export default function Search() {
  const router = useRouter();

  return (
    <Input
      type="search"
      placeholder="Search for product"
      onChange={(e) => router.push(`/products/?search=${e.target.value}`)}
    />
  );
}
