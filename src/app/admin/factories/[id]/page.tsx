import { factories } from "@/data/factories";
import AdminFactoryDetailClient from "./client";

export function generateStaticParams() {
  return factories.map((f) => ({ id: f.id }));
}

export default async function AdminFactoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminFactoryDetailClient id={id} />;
}
