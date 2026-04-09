import { orders } from "@/data/orders";
import FactoryOrderDetailClient from "./client";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export default async function FactoryOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FactoryOrderDetailClient id={id} />;
}
