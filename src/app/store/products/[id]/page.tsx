import { products } from "@/data/products";
import StoreProductDetailClient from "./client";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function StoreProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StoreProductDetailClient id={id} />;
}
