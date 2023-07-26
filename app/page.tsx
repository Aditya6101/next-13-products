import Link from "next/link";

export default async function Home() {
  return (
    <main className="grid h-screen place-content-center">
      Hello World!
      <Link href="/products">See products</Link>
    </main>
  );
}
