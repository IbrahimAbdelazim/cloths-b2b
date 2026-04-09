import { orders } from "@/data/orders";
import StoreOrderDetailClient from "./client";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function StoreOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <StoreOrderDetailClient id={id} />;
}
