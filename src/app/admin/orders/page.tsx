import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { formatCurrency } from "@/lib/utils";
import { orders } from "@/data/orders";

export default function AdminOrdersPage() {
  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Orders</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {orders.length} orders · {formatCurrency(totalGMV)} total GMV
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Order #</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Store</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Factory</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Items</th>
                  <th className="text-right px-3 py-3 text-xs font-medium text-zinc-500">Total</th>
                  <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-zinc-50">
                    <td className="px-6 py-3 font-mono text-xs text-zinc-700">
                      {order.orderNumber}
                    </td>
                    <td className="px-3 py-3">
                      <div>
                        <p className="text-zinc-900 font-medium">{order.customerStore}</p>
                        <p className="text-xs text-zinc-400">{order.customerName}</p>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-zinc-600">{order.factoryName}</td>
                    <td className="px-3 py-3 text-zinc-500">{order.items.length} items</td>
                    <td className="px-3 py-3 text-right font-semibold text-zinc-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-3 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3 text-zinc-500 text-xs">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
