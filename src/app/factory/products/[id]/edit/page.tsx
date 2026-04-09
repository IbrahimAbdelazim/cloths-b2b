import { products } from "@/data/products";
import EditProductClient from "./client";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditProductClient id={id} />;
}
