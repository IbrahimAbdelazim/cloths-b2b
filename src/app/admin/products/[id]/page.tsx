import { products } from "@/data/products";
import AdminProductDetailClient from "./client";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminProductDetailClient id={id} />;
}
