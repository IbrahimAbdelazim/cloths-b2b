import type { DemoUser } from "@/types";

export const demoUsers: DemoUser[] = [
  {
    id: "user-admin",
    name: "Alex Admin",
    email: "admin@clothsb2b.com",
    password: "admin123",
    role: "ADMIN",
  },
  {
    id: "user-factory-1",
    name: "Rahman Chowdhury",
    email: "factory@clothsb2b.com",
    password: "factory123",
    role: "FACTORY",
    factoryId: "factory-1",
  },
  {
    id: "user-customer-1",
    name: "James Wilson",
    email: "store@clothsb2b.com",
    password: "store123",
    role: "CUSTOMER",
    customerId: "customer-1",
  },
];

export function findUser(
  email: string,
  password: string
): DemoUser | undefined {
  return demoUsers.find((u) => u.email === email && u.password === password);
}
