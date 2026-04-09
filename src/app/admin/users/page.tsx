import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { demoUsers } from "@/data/users";

const roleColors: Record<string, string> = {
  ADMIN: "bg-violet-100 text-violet-700",
  FACTORY: "bg-blue-100 text-blue-700",
  CUSTOMER: "bg-indigo-100 text-indigo-700",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Users</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage platform users</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100">
                <th className="text-left px-6 py-3 text-xs font-medium text-zinc-500">Name</th>
                <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Email</th>
                <th className="text-left px-3 py-3 text-xs font-medium text-zinc-500">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {demoUsers.map((user) => (
                <tr key={user.id} className="hover:bg-zinc-50">
                  <td className="px-6 py-4 font-medium text-zinc-900">{user.name}</td>
                  <td className="px-3 py-4 text-zinc-500">{user.email}</td>
                  <td className="px-3 py-4">
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${roleColors[user.role]}`}>
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
